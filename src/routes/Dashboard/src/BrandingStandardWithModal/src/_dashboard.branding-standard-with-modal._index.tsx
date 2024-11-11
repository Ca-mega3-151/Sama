import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  action as actionDeleteBranding,
  DeleteBrandingActionResponse,
} from './_dashboard.branding-standard-with-modal.$id.delete';
import {
  EditBrandingActionResponse,
  action as actionEditBranding,
} from './_dashboard.branding-standard-with-modal.api.$id.edit';
import {
  CreateBrandingActionResponse,
  action as actionCreateBranding,
} from './_dashboard.branding-standard-with-modal.api.create';
import { BrandingStandardWithModalBaseUrl } from './constants/BaseUrl';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { ModalWithI18n } from '~/components/ModalWithI18n';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { TypedResponse } from '~/overrides/remix';
import { json, useFetcher, useLoaderData, LoaderFunctionArgs } from '~/overrides/remix';
import { useListingData } from '~/overrides/RemixJS/client';
import { SimpleListingResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { BrandingStandardFormMutation } from '~/packages/BrandingStandard/components/FormMutation/FormMutation';
import { BrandingStandardFormSearchNFilter } from '~/packages/BrandingStandard/components/Listing/FormSearchNFilter';
import { BrandingStandardListingHeader } from '~/packages/BrandingStandard/components/Listing/ListingHeader';
import { BrandingStandardListingTable } from '~/packages/BrandingStandard/components/Listing/ListingTable';
import { BrandingStandard } from '~/packages/BrandingStandard/models/BrandingStandard';
import { getBrandingsStandard } from '~/packages/BrandingStandard/services/getBrandingsStandard';
import { BrandingStandardListingSearchParams } from '~/packages/BrandingStandard/types/ListingSearchParams';
import { brandingStandardModelToDefaultValuesOfFormMutation } from '~/packages/BrandingStandard/utils/brandingModelToDefaultValuesOfFormMutation';
import { brandingStandardLisitngUrlSearchParamsUtils } from '~/packages/BrandingStandard/utils/listingUrlSearchParams';
import { RecordsPerPage } from '~/services/constants/RecordsPerPage';
import { getTableSortOrderMappingToServiceSort } from '~/services/utils/TableSortOrderMappingToServiceSort';
import { notification } from '~/shared/ReactJS';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
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
    brandingCode,
  } = brandingStandardLisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getBrandingsStandard({
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

const FormCreate = 'FormCreateBranding';
const FormUpdate = 'FormUpdateBranding';
export const Page = () => {
  const { t } = useTranslation(['branding']);

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
    fetcherData.load('/branding-standard-with-modal' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<BrandingStandard>({
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
  const [isOpenModalDeleteBranding, setIsOpenModalDeleteBranding] = useState<BrandingStandard | false>(false);

  const handleDelete = () => {
    if (!isOpenModalDeleteBranding) {
      return;
    }
    deleteBrandingFetcher.submit(
      {},
      { method: 'DELETE', action: `/branding-standard-with-modal/${isOpenModalDeleteBranding._id}/delete` },
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

  //#region Create
  const createServiceFetcher = useFetcher<typeof actionCreateBranding>();

  const [isOpenModalCreateBranding, setIsOpenModalCreateBranding] = useState(false);

  const isCreating = useMemo(() => {
    return createServiceFetcher.state === 'loading' || createServiceFetcher.state === 'submitting';
  }, [createServiceFetcher]);

  useEffect(() => {
    if (createServiceFetcher.data && createServiceFetcher.state === 'idle') {
      const response = createServiceFetcher.data as CreateBrandingActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('branding:create_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('branding:create_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalCreateBranding(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createServiceFetcher.state]);

  //#endregion

  //#region Edit
  const editBrandingFetcher = useFetcher<typeof actionEditBranding>();

  const [isOpenModalEditBranding, setIsOpenModalEditBranding] = useState<BrandingStandard | null>(null);

  const isEdting = useMemo(() => {
    return editBrandingFetcher.state === 'loading' || editBrandingFetcher.state === 'submitting';
  }, [editBrandingFetcher]);

  useEffect(() => {
    if (editBrandingFetcher.data && editBrandingFetcher.state === 'idle') {
      const response = editBrandingFetcher.data as EditBrandingActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('branding:edit_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('branding:edit_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalEditBranding(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editBrandingFetcher.state]);
  //#endregion

  // #region
  const [selectedRecordsState, setSelectedRecordsState] = useState<BrandingStandard[]>([]);
  // #endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <BrandingStandardListingHeader creatable onCreate={() => setIsOpenModalCreateBranding(true)} />
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
          sortValues={{
            brandingCode: { order: paramsInUrl.brandingCode, priority: undefined },
          }}
          onSortChange={({ brandingCode }) => handleRequest({ brandingCode: brandingCode?.order })}
          onDelete={data => setIsOpenModalDeleteBranding(data)}
          onEdit={record => setIsOpenModalEditBranding(record)}
        />
      </div>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalCreateBranding}
        onCancel={() => setIsOpenModalCreateBranding(false)}
        onOk={() => undefined}
        title={t('branding:create_title')}
        okText={t('branding:create')}
        okButtonProps={{ htmlType: 'submit', form: FormCreate }}
        confirmLoading={isCreating}
      >
        <BrandingStandardFormMutation
          fieldsError={createServiceFetcher.data?.fieldsError}
          uid={FormCreate}
          defaultValues={brandingStandardModelToDefaultValuesOfFormMutation({ brandingStandard: undefined })}
          onSubmit={values => {
            createServiceFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'post',
              action: `${BrandingStandardWithModalBaseUrl}/api/create`,
            });
          }}
          isSubmiting={isCreating}
        />
      </ModalWithI18n>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalEditBranding}
        onCancel={() => setIsOpenModalEditBranding(null)}
        onOk={() => undefined}
        title={t('branding:edit_title').toString()}
        okText={t('branding:save')}
        okButtonProps={{ htmlType: 'submit', form: FormUpdate }}
        confirmLoading={isEdting}
      >
        <BrandingStandardFormMutation
          fieldsError={editBrandingFetcher.data?.fieldsError}
          uid={FormUpdate}
          defaultValues={brandingStandardModelToDefaultValuesOfFormMutation({
            brandingStandard: isOpenModalEditBranding ?? undefined,
          })}
          onSubmit={values => {
            editBrandingFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'put',
              action: `${BrandingStandardWithModalBaseUrl}/api/${isOpenModalEditBranding?._id}/edit`,
            });
          }}
          isSubmiting={isEdting}
        />
      </ModalWithI18n>
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
