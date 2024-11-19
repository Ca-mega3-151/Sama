import { Classes } from '../models/Classes';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseListSuccess } from '~/services/types/Response';
import { Searcher, Sorter } from '~/services/types/SearchParams';

type ResponseData = Classes;

interface GetClassess {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  page: number;
  pageSize: number;
  sorter: Sorter<ResponseData>;
  searcher: Searcher<ResponseData>;
}
export const getClasses = async (_: GetClassess): Promise<ResponseListSuccess<ResponseData>> => {
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
      hits: [
        { _id: 'd3f7e7e4-6b8f-4c3a-bb7d-f102c30e8f70', name: 'Class 1', code: 'C001', __v: 0 },
        { _id: '9b9f2342-5503-4a5c-8712-0ecf44568950', name: 'Class 2', code: 'C002', __v: 0 },
        { _id: 'b7dbbb76-99cc-43f5-93b3-49c970e3d4a3', name: 'Class 3', code: 'C003', __v: 0 },
        { _id: 'fa9bdb8d-d34e-452d-8e7d-bfdc0b7e96d6', name: 'Class 4', code: 'C004', __v: 0 },
        { _id: 'c7c70a94-bfdf-4301-9bd4-8813e229df0a', name: 'Class 5', code: 'C005', __v: 0 },
        { _id: 'd01c8c5f-37af-40f5-8b49-6d7f8b0a6c48', name: 'Class 6', code: 'C006', __v: 0 },
        { _id: '2dbf6e88-2433-42d8-8074-8f9af5d84724', name: 'Class 7', code: 'C007', __v: 0 },
        { _id: '4f5e5676-d690-497f-908d-f5113e3fd9e2', name: 'Class 8', code: 'C008', __v: 0 },
        { _id: '9e9f9205-4c90-4e2d-9ef3-5c9a354c59c8', name: 'Class 9', code: 'C009', __v: 0 },
        { _id: 'c7427896-bb1f-4650-bd2b-59fb65e51074', name: 'Class 10', code: 'C010', __v: 0 },
      ],
      pagination: {
        totalPages: 1,
        totalRows: 10,
      },
    },
  };

  return response;
};
