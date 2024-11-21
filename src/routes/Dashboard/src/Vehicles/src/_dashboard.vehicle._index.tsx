import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { action as actionDeleteBranding, DeleteVehiclesActionResponse } from './_dashboard.vehicle.$id.delete';
import { VehiclesWithPageBaseUrl } from './constants/BaseUrl';
import { ModalConfirmDelete } from '~/components/ModalConfirmDelete';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json, LoaderFunctionArgs, TypedResponse, useFetcher, useLoaderData, useNavigate } from '~/overrides/remix';
import { useListingData } from '~/overrides/RemixJS/client';
import { SimpleListingResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { VehiclesFormSearchNFilter } from '~/packages/Vehicles/components/Listing/FormSearchNFilter';
import { VehiclesListingHeader } from '~/packages/Vehicles/components/Listing/ListingHeader';
import { VehiclesListingTable } from '~/packages/Vehicles/components/Listing/ListingTable';
import { Vehicles } from '~/packages/Vehicles/models/Vehicles';
import { getVehicles } from '~/packages/Vehicles/services/getVehicles';
import { VehiclesListingSearchParams } from '~/packages/Vehicles/types/ListingSearchParams';
import { vehiclesLisitngUrlSearchParamsUtils } from '~/packages/Vehicles/utils/listingUrlSearchParams';
import { RecordsPerPage } from '~/services/constants/RecordsPerPage';
import { notification } from '~/shared/ReactJS';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

export const loader = async (
  remixRequest: LoaderFunctionArgs,
): Promise<TypedResponse<SimpleListingResponse<Vehicles>>> => {
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['common', 'vehicles']);
  const { page = 1, pageSize = RecordsPerPage } = vehiclesLisitngUrlSearchParamsUtils.decrypt(request);
  try {
    const response = await getVehicles({
      remixRequest,
      page,
      pageSize,
      searcher: {},
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
  const { t } = useTranslation(['vehicles']);

  //#region Listing
  const paramsInUrl = vehiclesLisitngUrlSearchParamsUtils.decrypt(
    vehiclesLisitngUrlSearchParamsUtils.getUrlSearchParams().toString(),
  );
  const fetcherData = useFetcher<typeof loader>();
  const loaderData = useLoaderData<typeof loader>();

  const handleRequest = (params: VehiclesListingSearchParams) => {
    const searchParamsToLoader = vehiclesLisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    fetcherData.load(VehiclesWithPageBaseUrl + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData<Vehicles>({
    fetcherData: fetcherData,
    loaderData: loaderData,
    getNearestPageAvailable: page => handleRequest({ page }),
  });
  //#endregion

  //#region Delete
  const deleteVehiclesFetcher = useFetcher<typeof actionDeleteBranding>();

  const isDeleting = useMemo(() => {
    return deleteVehiclesFetcher.state === 'loading' || deleteVehiclesFetcher.state === 'submitting';
  }, [deleteVehiclesFetcher]);
  const [isOpenModalDeleteVehicles, setIsOpenModalDeleteVehicles] = useState<Vehicles | false>(false);

  const handleDelete = () => {
    if (!isOpenModalDeleteVehicles) {
      return;
    }
    deleteVehiclesFetcher.submit(
      {},
      {
        method: 'DELETE',
        action: `${VehiclesWithPageBaseUrl}/api/${isOpenModalDeleteVehicles._id}/delete`,
      },
    );
  };

  useEffect(() => {
    if (deleteVehiclesFetcher.data && deleteVehiclesFetcher.state === 'idle') {
      const response = deleteVehiclesFetcher.data as DeleteVehiclesActionResponse;
      if (response.hasError) {
        notification.error({
          message: t('vehicles:delete_error'),
          description: handleGetMessageToToast(t, response),
        });
      } else {
        notification.success({ message: t('vehicles:delete_success') });
        handleRequest({});
        setIsOpenModalDeleteVehicles(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteVehiclesFetcher.state]);
  //#endregion

  // #region
  const [selectedRecordsState, setSelectedRecordsState] = useState<Vehicles[]>([]);
  // #endregion

  return (
    <>
      <div className="flex h-full flex-col">
        <VehiclesListingHeader creatable onCreate={() => navigate(`${VehiclesWithPageBaseUrl}/create`)} />
        <VehiclesFormSearchNFilter
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
        <VehiclesListingTable
          offsetHeader={84}
          selectedRecordsState={selectedRecordsState}
          setSelectedRecordsState={setSelectedRecordsState}
          loading={isFetchingList}
          currentPage={data?.page}
          pageSize={RecordsPerPage}
          totalRecords={data?.info.pagination.totalRecords}
          dataSource={data?.info.hits}
          onPaginationChange={({ page }) => handleRequest({ page })}
          onDelete={data => setIsOpenModalDeleteVehicles(data)}
          onEdit={record => navigate(`${VehiclesWithPageBaseUrl}/${record._id}/edit`)}
          onCopy={record => navigate(`${VehiclesWithPageBaseUrl}/${record._id}/copy`)}
        />
      </div>
      <ModalConfirmDelete
        openVariant="controlled-state"
        open={!!isOpenModalDeleteVehicles}
        onCancel={() => setIsOpenModalDeleteVehicles(false)}
        onOk={handleDelete}
        title={t('vehicles:delete_title')}
        description={t('vehicles:delete_description')}
        loading={isDeleting}
      />
    </>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export const shouldRevalidate = preventRevalidateOnListingPage;

export default Page;
