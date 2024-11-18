import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  action as actionDeleteBranding,
  DeleteBrandingStandardActionResponse,
} from './_dashboard.branding-standard-with-page.api.$id.delete';
import { BrandingStandardWithPageBaseUrl } from './constants/BaseUrl';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json, LoaderFunctionArgs, TypedResponse, useFetcher, useLoaderData, useNavigate } from '~/overrides/remix';
import { useListingData } from '~/overrides/RemixJS/client';
import { SimpleListingResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { BrandingStandardFormSearchNFilter } from '~/packages/BrandingStandard/components/Listing/FormSearchNFilter';
import { BrandingStandardListingHeader } from '~/packages/BrandingStandard/components/Listing/ListingHeader';
import { BrandingStandardListingTable } from '~/packages/BrandingStandard/components/Listing/ListingTable';
import { BrandingStandard } from '~/packages/BrandingStandard/models/BrandingStandard';
import { getBrandingsStandard } from '~/packages/BrandingStandard/services/getBrandingsStandard';
import { BrandingStandardListingSearchParams } from '~/packages/BrandingStandard/types/ListingSearchParams';
import { brandingStandardLisitngUrlSearchParamsUtils } from '~/packages/BrandingStandard/utils/listingUrlSearchParams';
import { RecordsPerPage } from '~/services/constants/RecordsPerPage';
import { notification } from '~/shared/ReactJS';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async (
  remixRequest: LoaderFunctionArgs,
): Promise<TypedResponse<SimpleListingResponse<BrandingStandard>>> => {
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['common', 'branding_standard']);
  const {
    page = 1,
    pageSize = RecordsPerPage,
    search,
    status,
  } = brandingStandardLisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getBrandingsStandard({
      remixRequest,
      page,
      pageSize,
      searcher: {
        status: { operator: 'eq', value: status },
        brandingCode: { operator: 'contains', value: search },
        brandingName: { operator: 'contains', value: search },
        updatedBy: { operator: 'contains', value: search },
      },
      sorter: {},
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
  const { t } = useTranslation(['branding_standard']);

  //#region Listing
  const paramsInUrl = brandingStandardLisitngUrlSearchParamsUtils.decrypt(
    brandingStandardLisitngUrlSearchParamsUtils.getUrlSearchParams().toString(),
  );
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: BrandingStandardListingSearchParams) => {
    const searchParamsToLoader = brandingStandardLisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load(BrandingStandardWithPageBaseUrl + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<BrandingStandard>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
  });
  //#endregion

  //#region Delete
  const deleteBrandingStandardFetcher = useFetcher<typeof actionDeleteBranding>();

  const isDeleting = useMemo(() => {
    return deleteBrandingStandardFetcher.state === 'loading' || deleteBrandingStandardFetcher.state === 'submitting';
  }, [deleteBrandingStandardFetcher]);
  const [isOpenModalDeleteBrandingStandard, setIsOpenModalDeleteBrandingStandard] = useState<BrandingStandard | false>(
    false,
  );

  const handleDelete = () => {
    if (!isOpenModalDeleteBrandingStandard) {
      return;
    }
    deleteBrandingStandardFetcher.submit(
      {},
      {
        method: 'DELETE',
        action: `${BrandingStandardWithPageBaseUrl}/api/${isOpenModalDeleteBrandingStandard._id}/delete`,
      },
    );
  };

  useEffect(() => {
    if (deleteBrandingStandardFetcher.data && deleteBrandingStandardFetcher.state === 'idle') {
      const response = deleteBrandingStandardFetcher.data as DeleteBrandingStandardActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('branding_standard:delete_error'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('branding_standard:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteBrandingStandard(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteBrandingStandardFetcher.state]);
  //#endregion

  // #region
  const [selectedRecordsState, setSelectedRecordsState] = useState<BrandingStandard[]>([]);
  // #endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <BrandingStandardListingHeader
          creatable
          onCreate={() => navigate(`${BrandingStandardWithPageBaseUrl}/create`)}
        />
        <BrandingStandardFormSearchNFilter
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
        <BrandingStandardListingTable
          offsetHeader={84}
          selectedRecordsState={selectedRecordsState}
          setSelectedRecordsState={setSelectedRecordsState}
          loading={isFetchingList}
          currentPage={data?.page}
          pageSize={RecordsPerPage}
          totalRecords={data?.info.pagination.totalRecords}
          dataSource={data?.info.hits}
          onPaginationChange={({ page }) => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteBrandingStandard(data)}
          onEdit={record => navigate(`${BrandingStandardWithPageBaseUrl}/${record._id}/edit`)}
        />
      </div>
      <ModalConfirmDelete
        openVariant="controlled-state"
        open={!!isOpenModalDeleteBrandingStandard}
        onCancel={() => setIsOpenModalDeleteBrandingStandard(false)}
        onOk={handleDelete}
        title={t('branding_standard:delete_title')}
        description={t('branding_standard:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
