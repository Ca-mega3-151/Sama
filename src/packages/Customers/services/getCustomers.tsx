import { Customers } from '../models/Customers';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseListSuccess } from '~/services/types/Response';
import { Searcher, Sorter } from '~/services/types/SearchParams';

type ResponseData = Customers;

interface GetCustomers {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  page: number;
  pageSize: number;
  sorter: Sorter<ResponseData>;
  searcher: Searcher<ResponseData>;
}
export const getCustomers = async (_: GetCustomers): Promise<ResponseListSuccess<ResponseData>> => {
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
        {
          _id: 'GqsbNgZT',
          firstName: 'Zvcds',
          lastName: 'Oqtsbnl',
          phone: '+99-493-9268',
          email: 'zvcds.oqtsbnl@example.com',
          address: '198 qiafN Street, wveVCdG, bBaOPM',
          totals: 2382,
          __v: 0,
        },
        {
          _id: 'dKkZZkRP',
          firstName: 'Bnrsq',
          lastName: 'Qtnqayr',
          phone: '+10-590-4903',
          email: 'bnrsq.qtnqayr@example.com',
          address: '915 jsABL Street, xOTNQCq, gTzkPR',
          totals: 4859,
          __v: 0,
        },
        {
          _id: 'awnpcDsV',
          firstName: 'Rbduw',
          lastName: 'Tmjorza',
          phone: '+15-929-3794',
          email: 'rbduw.tmjorza@example.com',
          address: '92 vkOmL Street, etNRttX, GDGOuk',
          totals: 2576,
          __v: 0,
        },
        {
          _id: 'KsFTmBBe',
          firstName: 'Aoffq',
          lastName: 'Qpxpuaa',
          phone: '+56-986-9356',
          email: 'aoffq.qpxpuaa@example.com',
          address: '346 dROQd Street, lMYdLZV, DaXdQp',
          totals: 4012,
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
