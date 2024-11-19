import { Customers } from '../models/Customers';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface GetCustomer {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    _id: Customers['_id'];
  };
}

type ResponseData = Customers;

export const getCustomer = async (_: GetCustomer) => {
  // const fetchApi = await getFetchApiInstance(remixRequest);

  // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
  //   // url: `/merchants/category/classes/${data._id}`,
  // }).axiosPromise;

  // if (isResponseError(response)) {
  //   throw new ServiceException(response.data.message, response.data);
  // }
  // return response.data as ResponseDetailSuccess<ResponseData>;

  const response: ResponseDetailSuccess<ResponseData> = {
    code: 0,
    data: {
      _id: 'GqsbNgZT',
      firstName: 'Zvcds',
      lastName: 'Oqtsbnl',
      phone: '+99-493-9268',
      email: 'zvcds.oqtsbnl@example.com',
      address: '198 qiafN Street, wveVCdG, bBaOPM',
      totals: 2382,
      __v: 0,
    },
  };

  return response;
};
