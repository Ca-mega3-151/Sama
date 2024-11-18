import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteClassesActionResponse, action as actionDeleteClasses } from './_dashboard.classes.$id.delete';

import { EditClassesActionResponse, action as actionEditClasses } from './_dashboard.classes.api.$id.edit';

import { CreateClassesActionResponse, action as actionCreateClasses } from './_dashboard.classes.api.create';

import { ClassesWithModalBaseUrl } from './constants/BaseUrl';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { ModalWithI18n } from '~/components/ModalWithI18n';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { TypedResponse } from '~/overrides/remix';
import { json, useFetcher, useLoaderData, LoaderFunctionArgs } from '~/overrides/remix';
import { useListingData } from '~/overrides/RemixJS/client';
import { SimpleListingResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { ClassesFormMutation } from '~/packages/Classes/components/FormMutation/FormMutation';
import { ClassesFormSearchNFilter } from '~/packages/Classes/components/Listing/FormSearchNFilter';
import { ClassesListingHeader } from '~/packages/Classes/components/Listing/ListingHeader';
import { ClassesListingTable } from '~/packages/Classes/components/Listing/ListingTable';
import { Classes } from '~/packages/Classes/models/Classes';
import { getClassess } from '~/packages/Classes/services/getClassess';
import { ClassesListingSearchParams } from '~/packages/Classes/types/ListingSearchParams';
import { ClassesModelToDefaultValuesOfFormMutation } from '~/packages/Classes/utils/ClassesModelToDefaultValuesOfFormMutation';
import { classesLisitngUrlSearchParamsUtils } from '~/packages/Classes/utils/listingUrlSearchParams';
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
): Promise<TypedResponse<SimpleListingResponse<Classes>>> => {
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['common', 'classes']);
  const { page = 1, pageSize = RecordsPerPage, search, name } = classesLisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getClassess({
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

const FormCreate = 'FormCreateClasses';
const FormUpdate = 'FormUpdateClasses';
export const Page = () => {
  const { t } = useTranslation(['classes']);

  //#region Listing
  const paramsInUrl = classesLisitngUrlSearchParamsUtils.decrypt(
    classesLisitngUrlSearchParamsUtils.getUrlSearchParams().toString(),
  );
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: ClassesListingSearchParams) => {
    const searchParamsToLoader = classesLisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load('/classes' + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Classes>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
  });
  //#endregion

  //#region Delete
  const deleteClassesFetcher = useFetcher<typeof actionDeleteClasses>();

  const isDeleting = useMemo(() => {
    return deleteClassesFetcher.state === 'loading' || deleteClassesFetcher.state === 'submitting';
  }, [deleteClassesFetcher]);
  const [isOpenModalDeleteClasses, setIsOpenModalDeleteClasses] = useState<Classes | false>(false);

  const handleDelete = () => {
    if (!isOpenModalDeleteClasses) {
      return;
    }
    deleteClassesFetcher.submit({}, { method: 'DELETE', action: `/classes/${isOpenModalDeleteClasses._id}/delete` });
  };

  useEffect(() => {
    if (deleteClassesFetcher.data && deleteClassesFetcher.state === 'idle') {
      const response = deleteClassesFetcher.data as DeleteClassesActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('classes:delete_error'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('classes:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteClasses(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteClassesFetcher.state]);
  //#endregion

  //#region Create
  const createServiceFetcher = useFetcher<typeof actionCreateClasses>();

  const [isOpenModalCreateCLasses, setIsOpenModalCreateClasses] = useState(false);

  const isCreating = useMemo(() => {
    return createServiceFetcher.state === 'loading' || createServiceFetcher.state === 'submitting';
  }, [createServiceFetcher]);

  useEffect(() => {
    if (createServiceFetcher.data && createServiceFetcher.state === 'idle') {
      const response = createServiceFetcher.data as CreateClassesActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('classes:create_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('classes:create_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalCreateClasses(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createServiceFetcher.state]);

  //#endregion

  //#region Edit
  const editClassesFetcher = useFetcher<typeof actionEditClasses>();

  const [isOpenModalEditClasses, setIsOpenModalEditClasses] = useState<Classes | null>(null);

  const isEdting = useMemo(() => {
    return editClassesFetcher.state === 'loading' || editClassesFetcher.state === 'submitting';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteClassesFetcher]);

  useEffect(() => {
    if (editClassesFetcher.data && editClassesFetcher.state === 'idle') {
      const response = editClassesFetcher.data as EditClassesActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('classes:edit_error').toString(),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({
          message: t('classes:edit_success').toString(),
          description: '',
        });
        handleRequest({});
        setIsOpenModalEditClasses(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editClassesFetcher.state]);
  //#endregion

  // #region
  const [selectedRecordsState, setSelectedRecordsState] = useState<Classes[]>([]);
  // #endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <ClassesListingHeader creatable onCreate={() => setIsOpenModalCreateClasses(true)} />
        <ClassesFormSearchNFilter
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
        <ClassesListingTable
          offsetHeader={84}
          selectedRecordsState={selectedRecordsState}
          setSelectedRecordsState={setSelectedRecordsState}
          loading={isFetchingList}
          currentPage={data?.page}
          pageSize={RecordsPerPage}
          totalRecords={data?.info.pagination.totalRecords}
          dataSource={data?.info.hits}
          onPaginationChange={({ page }) => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteClasses(data)}
          onEdit={record => setIsOpenModalEditClasses(record)}
        />
      </div>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalCreateCLasses}
        onCancel={() => setIsOpenModalCreateClasses(false)}
        onOk={() => undefined}
        title={t('classes:create_title')}
        okText={t('classes:create')}
        okButtonProps={{ htmlType: 'submit', form: FormCreate }}
        confirmLoading={isCreating}
      >
        <ClassesFormMutation
          fieldsError={createServiceFetcher.data?.fieldsError}
          uid={FormCreate}
          defaultValues={ClassesModelToDefaultValuesOfFormMutation({ classes: undefined })}
          onSubmit={values => {
            createServiceFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'post',
              action: `${ClassesWithModalBaseUrl}/api/create`,
            });
          }}
          isSubmiting={isCreating}
        />
      </ModalWithI18n>
      <ModalWithI18n
        openVariant="controlled-state"
        open={!!isOpenModalEditClasses}
        onCancel={() => setIsOpenModalEditClasses(null)}
        onOk={() => undefined}
        title={t('classes:edit_title').toString()}
        okText={t('classes:save')}
        okButtonProps={{ htmlType: 'submit', form: FormUpdate }}
        confirmLoading={isEdting}
      >
        <ClassesFormMutation
          fieldsError={editClassesFetcher.data?.fieldsError}
          uid={FormUpdate}
          defaultValues={ClassesModelToDefaultValuesOfFormMutation({
            classes: isOpenModalEditClasses ?? undefined,
          })}
          onSubmit={values => {
            editClassesFetcher.submit(fetcherFormData.encrypt(values), {
              method: 'put',
              action: `${ClassesWithModalBaseUrl}/api/${isOpenModalEditClasses?._id}/edit`,
            });
          }}
          isSubmiting={isEdting}
        />
      </ModalWithI18n>
      <ModalConfirmDelete
        openVariant="controlled-state"
        open={!!isOpenModalDeleteClasses}
        onCancel={() => setIsOpenModalDeleteClasses(false)}
        onOk={handleDelete}
        title={t('classes:delete_title')}
        description={t('classes:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
