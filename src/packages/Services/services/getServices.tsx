import { Services } from '../models/Services';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseListSuccess } from '~/services/types/Response';
import { Searcher, Sorter } from '~/services/types/SearchParams';

type ResponseData = Services;

interface GetService {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  page: number;
  pageSize: number;
  sorter: Sorter<ResponseData>;
  searcher: Searcher<ResponseData>;
}
export const getServices = async (_: GetService): Promise<ResponseListSuccess<ResponseData>> => {
  // const fetchApi = await getFetchApiInstance(remixRequest);
  // const response = await fetchApi.request<ResponseListSuccess<ResponseData> | ResponseFailure>({
  //   url: '/merchants/category/SGetService',
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
      hits: [
        {
          _id: '35c836af-4b1f-4c97-8961-9f159999922e',
          name: 'Class 1',
          description: 'C001',
          __v: 0,
        },
        {
          _id: 'e4cd7201-669a-4f86-b54d-1da2120d10ac',
          name: 'Class 2',
          description: 'C002',
          __v: 0,
        },
        {
          _id: '492c0202-e6a3-497c-ae62-a526a1647d04',
          name: 'Class 3',
          description: 'C003',
          __v: 0,
        },
        {
          _id: 'fe0aa5ae-701d-4c93-9bca-f3157dd30e22',
          name: 'Class 4',
          description: 'C004',
          __v: 0,
        },
        {
          _id: 'fd3090d3-72d2-4f35-953e-3b67133c99fc',
          name: 'Class 5',
          description: 'C005',
          __v: 0,
        },
        {
          _id: '12d637f6-0413-4c39-87f4-cdf938dba7ec',
          name: 'Class 6',
          description: 'C006',
          __v: 0,
        },
        {
          _id: '62a75b59-b3ff-4729-a69c-7d3d93f5b5cf',
          name: 'Class 7',
          description: 'C007',
          __v: 0,
        },
        {
          _id: 'd7fba8e6-f637-47f2-bf8c-68e8fc5dbe8d',
          name: 'Class 8',
          description: 'C008',
          __v: 0,
        },
        {
          _id: '9c8c0da9-8c9e-41e8-9d3f-5066b7e293cd',
          name: 'Class 9',
          description: 'C009',
          __v: 0,
        },
        {
          _id: '5f48c6f7-5011-4e59-bd1e-f7f5a65a19f8',
          name: 'Class 10',
          description: 'C010',
          __v: 0,
        },
      ],
      pagination: {
        totalPages: 1,
        totalRows: 10,
      },
    },
  };

  return response;
};
