import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  action as actionDeleteBranding,
  DeleteBrandingActionResponse,
} from './_dashboard.branding-standard-with-page.$id.delete';
import { BrandingStandardWithPageBaseUrl } from './constants/BaseUrl';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { TypedResponse, LoaderFunctionArgs } from '~/overrides/remix';
import { json, useFetcher, useLoaderData, useNavigate } from '~/overrides/remix';
import { useListingData } from '~/overrides/RemixJS/client';
import { SimpleListingResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { Branding } from '~/packages/Branding/models/Branding';
import { getBrandings } from '~/packages/Branding/services/getBrandings';
import { BrandingListingSearchParams } from '~/packages/Branding/types/ListingSearchParams';
import { brandingLisitngUrlSearchParamsUtils } from '~/packages/Branding/utils/listingUrlSearchParams';
import { BrandingFormSearchNFilter } from '~/packages/BrandingStandard/components/Listing/FormSearchNFilter';
import { BrandingListingHeader } from '~/packages/BrandingStandard/components/Listing/ListingHeader';
import { BrandingListingTable } from '~/packages/BrandingStandard/components/Listing/ListingTable';
import { RecordsPerPage } from '~/services/constants/RecordsPerPage';
import { getTableSortOrderMappingToServiceSort } from '~/services/utils/TableSortOrderMappingToServiceSort';
import { notification } from '~/shared/ReactJS';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async (
  remixRequest: LoaderFunctionArgs,
): Promise<TypedResponse<SimpleListingResponse<Branding>>> => {
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['common', 'branding']);
  const {
    page = 1,
    pageSize = RecordsPerPage,
    search,
    status,
    brandingCode,
  } = brandingLisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getBrandings({
      remixRequest,
      page,
      pageSize,
      searcher: {
        status: { operator: 'eq', value: status },
        BrandingCode: { operator: 'contains', value: search },
        BrandingName: { operator: 'contains', value: search },
        updatedBy: { operator: 'contains', value: search },
      },
      sorter: {
        brandingCode: getTableSortOrderMappingToServiceSort(brandingCode),
      },
    });

    return json({
      info: {
        hits: response.data.hits,
        pagination: {
          totalPages: response.data.pagination.totalPages,
          totalRecords: response.data.pagination.totalRows,
        },
      },
      page: Math.min(page, response.data.pagination.totalPages || 1),
    });
  } catch (error) {
    return json({
      page,
      info: {
        hits: [],
        pagination: { pageSize: 0, totalPages: 1, totalRecords: 0 },
      },
      toastMessageError: handleCatchClauseAsMessage({ error, t }),
    });
  }
};

export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['branding']);

  //#region Listing
  const paramsInUrl = brandingLisitngUrlSearchParamsUtils.decrypt(
    brandingLisitngUrlSearchParamsUtils.getUrlSearchParams().toString(),
  );
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: BrandingListingSearchParams) => {
    const searchParamsToLoader = brandingLisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/branding-standard-with-page' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Branding>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
  });
  //#endregion

  //#region Delete
  const deleteBrandingFetcher = useFetcher<typeof actionDeleteBranding>();

  const isDeleting = useMemo(() => {
    return deleteBrandingFetcher.state === 'loading' || deleteBrandingFetcher.state === 'submitting';
  }, [deleteBrandingFetcher]);
  const [isOpenModalDeleteBranding, setIsOpenModalDeleteBranding] = useState<Branding | false>(false);

  const handleDelete = () => {
    if (!isOpenModalDeleteBranding) {
      return;
    }
    deleteBrandingFetcher.submit(
      {},
      { method: 'DELETE', action: `/branding-standard-with-page/${isOpenModalDeleteBranding._id}/delete` },
    );
  };

  useEffect(() => {
    if (deleteBrandingFetcher.data && deleteBrandingFetcher.state === 'idle') {
      const response = deleteBrandingFetcher.data as DeleteBrandingActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('branding:delete_error'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('branding:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteBranding(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteBrandingFetcher.state]);
  //#endregion

  // #region
  const [selectedRecordsState, setSelectedRecordsState] = useState<Branding[]>([]);
  // #endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <BrandingListingHeader creatable onCreate={() => navigate(`${BrandingStandardWithPageBaseUrl}/create`)} />
        <BrandingFormSearchNFilter
          containerClassName="justify-end mb-1"
          searchValue={paramsInUrl.search?.toString()}
          formFilterValues={{
            status: paramsInUrl.status,
          }}
          isSubmiting={isFetchingList}
          onFilter={values => handleRequest({ page: 1, ...values })}
          onResetFilter={() => {
            handleRequest({
              page: 1,
              status: undefined,
            });
          }}
          onSearch={value => handleRequest({ page: 1, search: value })}
        />
        <BrandingListingTable
          offsetHeader={84}
          selectedRecordsState={selectedRecordsState}
          setSelectedRecordsState={setSelectedRecordsState}
          loading={isFetchingList}
          currentPage={data?.page}
          pageSize={RecordsPerPage}
          totalRecords={data?.info.pagination.totalRecords}
          dataSource={data?.info.hits}
          onPaginationChange={({ page }) => handleRequest({ page })}
          sortValues={{
            brandingCode: { order: paramsInUrl.brandingCode, priority: undefined },
          }}
          onSortChange={({ brandingCode }) => handleRequest({ brandingCode: brandingCode?.order })}
          onDelete={data => setIsOpenModalDeleteBranding(data)}
          onEdit={record => navigate(`${BrandingStandardWithPageBaseUrl}/${record._id}/edit`)}
        />
      </div>
      <ModalConfirmDelete
        openVariant="controlled-state"
        open={!!isOpenModalDeleteBranding}
        onCancel={() => setIsOpenModalDeleteBranding(false)}
        onOk={handleDelete}
        title={t('branding:delete_title')}
        description={t('branding:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
