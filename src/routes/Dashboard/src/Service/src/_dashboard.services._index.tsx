import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteServiceActionResponse, action as actionDeleteService } from './_dashboard.service.$id.delete';
import { EditServiceActionResponse, action as actionEditService } from './_dashboard.service.api.$id.edit';
import { CreateServiceActionResponse, action as actionCreateService } from './_dashboard.service.api.create';

import { ServiceWithModalBaseUrl } from './constants/BaseUrl';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { ModalWithI18n } from '~/components/ModalWithI18n';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData } from '~/overrides/remix';
import { useListingData } from '~/overrides/RemixJS/client';
import { SimpleListingResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { ServiceFormMutation } from '~/packages/Services/components/FormMutation/FormMutation';
import { ServiceFormSearchNFilter } from '~/packages/Services/components/Listing/FormSearchNFilter';
import { ServiceListingHeader } from '~/packages/Services/components/Listing/ListingHeader';
import { ServiceListingTable } from '~/packages/Services/components/Listing/ListingTable';
import { Services } from '~/packages/Services/models/Services';
import { getService } from '~/packages/Services/services/getServices';
import { ServiceListingSearchParams } from '~/packages/Services/types/ListingSearchParams';
import { serviceLisitngUrlSearchParamsUtils } from '~/packages/Services/utils/listingUrlSearchParams';
import { ServicesModelToDefaultValuesOfFormMutation } from '~/packages/Services/utils/ServiceModelToDefaultValuesOfFormMutation';
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
): Promise<TypedResponse<SimpleListingResponse<Services>>> => {
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['common', 'service']);
  const { page = 1, pageSize = RecordsPerPage, search, name } = serviceLisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getService({
      remixRequest,
      page,
      pageSize,
      searcher: {
        name: { operator: 'contains', value: search },
        code: { operator: 'contains', value: search },
      },
      sorter: {
        name: getTableSortOrderMappingToServiceSort(name),
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

const FormCreate = 'FormCreateService';
const FormUpdate = 'FormUpdateService';
export const Page = () => {
  const { t } = useTranslation(['service']);

  //#region Listing
  const paramsInUrl = serviceLisitngUrlSearchParamsUtils.decrypt(
    serviceLisitngUrlSearchParamsUtils.getUrlSearchParams().toString(),
  );
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ServiceListingSearchParams) => {
    const searchParamsToLoader = serviceLisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/service' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Services>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
  });
  //#endregion

  //#region Delete
  const deleteServiceFetcher = useFetcher<typeof actionDeleteService>();

  const isDeleting = useMemo(() => {
    return deleteServiceFetcher.state === 'loading' || deleteServiceFetcher.state === 'submitting';
  }, [deleteServiceFetcher]);
  const [isOpenModalDeleteService, setIsOpenModalDeleteService] = useState<Services | false>(false);

  const handleDelete = () => {
    if (!isOpenModalDeleteService) {
      return;
    }
    deleteServiceFetcher.submit({}, { method: 'DELETE', action: `/service/${isOpenModalDeleteService._id}/delete` });
  };

  useEffect(() => {
    if (deleteServiceFetcher.data && deleteServiceFetcher.state === 'idle') {
      const response = deleteServiceFetcher.data as DeleteServiceActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('service:delete_error'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('service:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteService(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteServiceFetcher.state]);
  //#endregion

  //#region Create
  const createServiceFetcher = useFetcher<typeof actionCreateService>();

  const [isOpenModalCreateService, setIsOpenModalCreateService] = useState(false);

  const isCreating = useMemo(() => {
    return createServiceFetcher.state === 'loading' || createServiceFetcher.state === 'submitting';
  }, [createServiceFetcher]);

  useEffect(() => {
    if (createServiceFetcher.data && createServiceFetcher.state === 'idle') {
      const response = createServiceFetcher.data as CreateServiceActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('service:create_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('service:create_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalCreateService(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createServiceFetcher.state]);

  //#endregion

  //#region Edit
  const editServiceFetcher = useFetcher<typeof actionEditService>();

  const [isOpenModalEditService, setIsOpenModalEditService] = useState<Services | null>(null);

  const isEdting = useMemo(() => {
    return editServiceFetcher.state === 'loading' || editServiceFetcher.state === 'submitting';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editServiceFetcher]);

  useEffect(() => {
    if (editServiceFetcher.data && editServiceFetcher.state === 'idle') {
      const response = editServiceFetcher.data as EditServiceActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('service:edit_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('service:edit_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalEditService(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editServiceFetcher.state]);
  //#endregion

  // #region
  const [selectedRecordsState, setSelectedRecordsState] = useState<Services[]>([]);
  // #endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <ServiceListingHeader creatable onCreate={() => setIsOpenModalCreateService(true)} />
        <ServiceFormSearchNFilter
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
        <ServiceListingTable
          offsetHeader={84}
          selectedRecordsState={selectedRecordsState}
          setSelectedRecordsState={setSelectedRecordsState}
          loading={isFetchingList}
          currentPage={data?.page}
          pageSize={RecordsPerPage}
          totalRecords={data?.info.pagination.totalRecords}
          dataSource={data?.info.hits}
          onPaginationChange={({ page }) => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteService(data)}
          onEdit={record => setIsOpenModalEditService(record)}
        />
      </div>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalCreateService}
        onCancel={() => setIsOpenModalCreateService(false)}
        onOk={() => undefined}
        title={t('service:create_title')}
        okText={t('service:create')}
        okButtonProps={{ htmlType: 'submit', form: FormCreate }}
        confirmLoading={isCreating}
      >
        <ServiceFormMutation
          fieldsError={createServiceFetcher.data?.fieldsError}
          uid={FormCreate}
          defaultValues={ServicesModelToDefaultValuesOfFormMutation({ service: undefined })}
          onSubmit={values => {
            createServiceFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'post',
              action: `${ServiceWithModalBaseUrl}/api/create`,
            });
          }}
          isSubmiting={isCreating}
        />
      </ModalWithI18n>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalEditService}
        onCancel={() => setIsOpenModalEditService(null)}
        onOk={() => undefined}
        title={t('service:edit_title').toString()}
        okText={t('service:save')}
        okButtonProps={{ htmlType: 'submit', form: FormUpdate }}
        confirmLoading={isEdting}
      >
        <ServiceFormMutation
          fieldsError={editServiceFetcher.data?.fieldsError}
          uid={FormUpdate}
          defaultValues={ServicesModelToDefaultValuesOfFormMutation({
            service: isOpenModalEditService ?? undefined,
          })}
          onSubmit={values => {
            editServiceFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'put',
              action: `${ServiceWithModalBaseUrl}/api/${isOpenModalEditService?._id}/edit`,
            });
          }}
          isSubmiting={isEdting}
        />
      </ModalWithI18n>
      <ModalConfirmDelete
        openVariant="controlled-state"
        open={!!isOpenModalDeleteService}
        onCancel={() => setIsOpenModalDeleteService(false)}
        onOk={handleDelete}
        title={t('service:delete_title')}
        description={t('service:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
