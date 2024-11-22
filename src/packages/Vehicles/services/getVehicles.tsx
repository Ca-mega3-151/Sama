import { Vehicles } from '../models/Vehicles';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseListSuccess } from '~/services/types/Response';
import { Searcher, Sorter } from '~/services/types/SearchParams';
type ResponseData = Vehicles;

interface GetVehicles {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  page: number;
  pageSize: number;
  sorter: Sorter<ResponseData>;
  searcher: Searcher<ResponseData>;
}
export const getVehicles = async (_: GetVehicles): Promise<ResponseListSuccess<ResponseData>> => {
  // const fetchApi = await getFetchApiInstance(remixRequest);
  // const response = await fetchApi.request<ResponseListSuccess<ResponseData> | ResponseFailure>({
  //   url: '/merchants/category/classess',
  //   params: {
  //     limit: pageSize,
  //     offset: (page - 1) * pageSize,
  //     ...getSortParams(sorter),
  //     ...getSearchParams(searcher),
  //   },
  // }).axiosPromise;
  // if (isResponseError(response)) {
  //   throw new ServiceException(response.data.message, response.data);
  const response: ResponseListSuccess<ResponseData> = {
    code: 0,
    data: {
      hits: [],
      pagination: {
        totalPages: 1,
        totalRows: 10,
      },
    },
  };

  return response;
};
