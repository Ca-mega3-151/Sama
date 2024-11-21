import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteCustomerActionResponse, action as actionDeleteCustomer } from './_dashboard.customer.api.$id.delete';
import { EditCustomerActionResponse, action as actionEditCustomer } from './_dashboard.customer.$id.edit';
import { CreateCustomerActionResponse, action as actionCreateCustomer } from './_dashboard.customer.create';

import { CustomerWithModalBaseUrl } from './constants/BaseUrl';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { ModalWithI18n } from '~/components/ModalWithI18n';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { LoaderFunctionArgs, TypedResponse, json, useFetcher, useLoaderData } from '~/overrides/remix';
import { useListingData } from '~/overrides/RemixJS/client';
import { SimpleListingResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { CustomerFormMutation } from '~/packages/Customers/components/FormMutation/FormMutation';
import { CustomerFormSearchNFilter } from '~/packages/Customers/components/Listing/FormSearchNFilter';
import { CustomerListingHeader } from '~/packages/Customers/components/Listing/ListingHeader';
import { CustomerListingTable } from '~/packages/Customers/components/Listing/ListingTable';
import { Customers } from '~/packages/Customers/models/Customers';
import { getCustomers } from '~/packages/Customers/services/getCustomers';
import { CustomerListingSearchParams } from '~/packages/Customers/types/ListingSearchParams';
import { CustomerModelToDefaultValuesOfFormMutation } from '~/packages/Customers/utils/CustomerModelToDefaultValuesOfFormMutation';
import { customerLisitngUrlSearchParamsUtils } from '~/packages/Customers/utils/listingUrlSearchParams';
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
): Promise<TypedResponse<SimpleListingResponse<Customers>>> => {
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['common', 'customer']);
  const {
    page = 1,
    pageSize = RecordsPerPage,
    search,
    firstName,
  } = customerLisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getCustomers({
      remixRequest,
      page,
      pageSize,
      searcher: {
        firstName: { operator: 'contains', value: search },
        lastName: { operator: 'contains', value: search },
      },
      sorter: {
        firstName: getTableSortOrderMappingToServiceSort(firstName),
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

const FormCreate = 'FormCreateCustomers';
const FormUpdate = 'FormUpdateCustomers';
export const Page = () => {
  const { t } = useTranslation(['customer']);

  //#region Listing
  const paramsInUrl = customerLisitngUrlSearchParamsUtils.decrypt(
    customerLisitngUrlSearchParamsUtils.getUrlSearchParams().toString(),
  );
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: CustomerListingSearchParams) => {
    const searchParamsToLoader = customerLisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/customer' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Customers>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
  });
  //#endregion

  //#region Delete
  const deleteCustomerFetcher = useFetcher<typeof actionDeleteCustomer>();

  const isDeleting = useMemo(() => {
    return deleteCustomerFetcher.state === 'loading' || deleteCustomerFetcher.state === 'submitting';
  }, [deleteCustomerFetcher]);
  const [isOpenModalDeleteCustomer, setIsOpenModalDeleteCustomer] = useState<Customers | false>(false);

  const handleDelete = () => {
    if (!isOpenModalDeleteCustomer) {
      return;
    }
    deleteCustomerFetcher.submit({}, { method: 'DELETE', action: `/customer/${isOpenModalDeleteCustomer._id}/delete` });
  };

  useEffect(() => {
    if (deleteCustomerFetcher.data && deleteCustomerFetcher.state === 'idle') {
      const response = deleteCustomerFetcher.data as DeleteCustomerActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('customer:delete_error'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('customer:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteCustomer(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCustomerFetcher.state]);
  //#endregion

  //#region Create
  const createServiceFetcher = useFetcher<typeof actionCreateCustomer>();

  const [isOpenModalCreateCustomer, setIsOpenModalCreateCustomer] = useState(false);

  const isCreating = useMemo(() => {
    return createServiceFetcher.state === 'loading' || createServiceFetcher.state === 'submitting';
  }, [createServiceFetcher]);

  useEffect(() => {
    if (createServiceFetcher.data && createServiceFetcher.state === 'idle') {
      const response = createServiceFetcher.data as CreateCustomerActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('customer:create_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('customer:create_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalCreateCustomer(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createServiceFetcher.state]);

  //#endregion

  //#region Edit
  const editCustomerFetcher = useFetcher<typeof actionEditCustomer>();

  const [isOpenModalEditCustomer, setIsOpenModalEditCustomer] = useState<Customers | null>(null);

  const isEdting = useMemo(() => {
    return editCustomerFetcher.state === 'loading' || editCustomerFetcher.state === 'submitting';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCustomerFetcher]);

  useEffect(() => {
    if (editCustomerFetcher.data && editCustomerFetcher.state === 'idle') {
      const response = editCustomerFetcher.data as EditCustomerActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('customer:edit_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('customer:edit_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalEditCustomer(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCustomerFetcher.state]);
  //#endregion

  // #region
  const [selectedRecordsState, setSelectedRecordsState] = useState<Customers[]>([]);
  // #endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <CustomerListingHeader creatable onCreate={() => setIsOpenModalCreateCustomer(true)} />
        <CustomerFormSearchNFilter
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
        <CustomerListingTable
          offsetHeader={84}
          selectedRecordsState={selectedRecordsState}
          setSelectedRecordsState={setSelectedRecordsState}
          loading={isFetchingList}
          currentPage={data?.page}
          pageSize={RecordsPerPage}
          totalRecords={data?.info.pagination.totalRecords}
          dataSource={data?.info.hits}
          onPaginationChange={({ page }) => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteCustomer(data)}
          onEdit={record => setIsOpenModalEditCustomer(record)}
        />
      </div>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalCreateCustomer}
        onCancel={() => setIsOpenModalCreateCustomer(false)}
        onOk={() => undefined}
        title={t('customer:create_title')}
        okText={t('customer:create')}
        okButtonProps={{ htmlType: 'submit', form: FormCreate }}
        confirmLoading={isCreating}
      >
        <CustomerFormMutation
          fieldsError={createServiceFetcher.data?.fieldsError}
          uid={FormCreate}
          defaultValues={CustomerModelToDefaultValuesOfFormMutation({ customer: undefined })}
          onSubmit={values => {
            createServiceFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'post',
              action: `${CustomerWithModalBaseUrl}/api/create`,
            });
          }}
          isSubmiting={isCreating}
        />
      </ModalWithI18n>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalEditCustomer}
        onCancel={() => setIsOpenModalEditCustomer(null)}
        onOk={() => undefined}
        title={t('customer:edit_title').toString()}
        okText={t('customer:save')}
        okButtonProps={{ htmlType: 'submit', form: FormUpdate }}
        confirmLoading={isEdting}
      >
        <CustomerFormMutation
          fieldsError={editCustomerFetcher.data?.fieldsError}
          uid={FormUpdate}
          defaultValues={CustomerModelToDefaultValuesOfFormMutation({
            customer: isOpenModalEditCustomer ?? undefined,
          })}
          onSubmit={values => {
            editCustomerFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'put',
              action: `${CustomerWithModalBaseUrl}/api/${isOpenModalEditCustomer?._id}/edit`,
            });
          }}
          isSubmiting={isEdting}
        />
      </ModalWithI18n>
      <ModalConfirmDelete
        openVariant="controlled-state"
        open={!!isOpenModalDeleteCustomer}
        onCancel={() => setIsOpenModalDeleteCustomer(false)}
        onOk={handleDelete}
        title={t('customer:delete_title')}
        description={t('customer:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
