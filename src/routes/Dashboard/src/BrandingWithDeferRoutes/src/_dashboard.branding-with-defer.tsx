import { BrandingWithDeferBaseUrl } from './constants/BaseUrl';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { defer, LoaderFunctionArgs, Navigate, TypedDeferredData, useLoaderData } from '~/overrides/remix';
import { useDeferData, useListingData } from '~/overrides/RemixJS/client';
import { SimpleListingResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { Branding } from '~/packages/Branding/models/Branding';
import { BrandingListingSearchParams } from '~/packages/Branding/types/ListingSearchParams';
import { brandingLisitngUrlSearchParamsUtils } from '~/packages/Branding/utils/listingUrlSearchParams';
import { BrandingListingTable } from '~/packages/BrandingWithDefer/components/ListingTable';
import { getBrandingsForDefer } from '~/packages/BrandingWithDefer/services/getBrandingsForDefer';
import { RecordsPerPage } from '~/services/constants/RecordsPerPage';
import { getTableSortOrderMappingToServiceSort } from '~/services/utils/TableSortOrderMappingToServiceSort';
import { useWindowReactive } from '~/shared/ReactJS';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from '~/shared/Utilities';
import { handleCatchClauseAsMessage } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { preventRevalidateOnListingPage } from '~/utils/functions/preventRevalidateOnListingPage';

// @lemanh-tuong: Normal mode
// export const loader = async (
//   remixRequest: LoaderFunctionArgs,
// ): Promise<TypedResponse<{ listingResponse: SimpleListingResponse<Branding> }>> => {
//   const { request } = remixRequest;
//   const t = await i18nServer.getFixedT(request, ['common', 'branding']);
//   const { page = 1, pageSize = RecordsPerPage, search, status } = lisitngUrlSearchParamsUtils.decrypt(request);
//   const response = await getBrandingsForDefer({
//     remixRequest,
//     page,
//     pageSize,
//     searcher: {
//       status: { operator: 'eq', value: status },
//       BrandingCode: { operator: 'contains', value: search },
//       BrandingName: { operator: 'contains', value: search },
//       updatedBy: { operator: 'contains', value: search },
//     },
//     sorter: {},
//   })
//     .then(response => {
//       return {
//         info: {
//           hits: response.data.hits,
//           pagination: {
//             totalPages: response.data.pagination.totalPages,
//             totalRecords: response.data.pagination.totalRows,
//           },
//         },
//         page: Math.min(page, response.data.pagination.totalPages || 1),
//       };
//     })
//     .catch(error => {
//       return {
//         page,
//         info: {
//           hits: [],
//           pagination: { pageSize: 0, totalPages: 1, totalRecords: 0 },
//         },
//         toastMessageError: handleCatchClauseAsMessage({ error, t }),
//       };
//     });

//   return json({
//     listingResponse: response,
//   });
// };

export const loader = async (
  remixRequest: LoaderFunctionArgs,
): Promise<TypedDeferredData<{ listingResponse: Promise<SimpleListingResponse<Branding>> }>> => {
  const { request } = remixRequest;
  const t = await i18nServer.getFixedT(request, ['common', 'branding']);
  const {
    page = 1,
    pageSize = RecordsPerPage,
    search,
    status,
    brandingCode,
  } = brandingLisitngUrlSearchParamsUtils.decrypt(request);
  const response = getBrandingsForDefer({
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
  })
    .then(response => {
      return {
        info: {
          hits: response.data.hits,
          pagination: {
            totalPages: response.data.pagination.totalPages,
            totalRecords: response.data.pagination.totalRows,
          },
        },
        page: Math.min(page, response.data.pagination.totalPages || 1),
      };
    })
    .catch(error => {
      return {
        page,
        info: {
          hits: [],
          pagination: { pageSize: 0, totalPages: 1, totalRecords: 0 },
        },
        toastMessageError: handleCatchClauseAsMessage({ error, t }),
      };
    });

  return defer({
    listingResponse: response,
  });
};

export const Page = () => {
  //#region Listing
  const paramsInUrl = brandingLisitngUrlSearchParamsUtils.decrypt(
    brandingLisitngUrlSearchParamsUtils.getUrlSearchParams().toString(),
  );
  const loaderData = useLoaderData<typeof loader>();
  const deferData = useDeferData({ loaderData });

  const handleRequest = (params: BrandingListingSearchParams) => {
    const searchParamsToLoader = brandingLisitngUrlSearchParamsUtils.encrypt({
      ...paramsInUrl,
      ...params,
    });
    deferData.fetcherData.load(BrandingWithDeferBaseUrl + searchParamsToLoader);
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsToLoader);
  };

  const { data, isFetchingList } = useListingData({
    loaderData: deferData.data?.listingResponse,
    fetcherData: {
      data: deferData.fetcherData.data?.listingResponse,
      state: deferData.fetcherData.state,
    },
    getNearestPageAvailable: console.log,
  });
  useWindowReactive({ enabled: !isFetchingList, callback: () => handleRequest({}) });
  //#endregion

  if (deferData.isError) {
    // @lemanh-tuong: Retry & Do something else
    return <Navigate to="/500" />;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col gap-3">
        <BrandingListingTable
          loading={isFetchingList}
          currentPage={data?.page}
          pageSize={paramsInUrl.pageSize ?? RecordsPerPage}
          totalRecords={data?.info.pagination.totalRecords}
          data={data?.info.hits}
          sortValues={{
            brandingCode: { order: paramsInUrl.brandingCode, priority: undefined },
          }}
          onSortChange={({ brandingCode }) => handleRequest({ brandingCode: brandingCode?.order })}
          onPaginationChange={({ page, pageSize }) => handleRequest({ page, pageSize })}
        />
      </div>
    </div>
  );
};

export const shouldRevalidate = preventRevalidateOnListingPage;

export const ErrorBoundary = PageErrorBoundary;

export default Page;
