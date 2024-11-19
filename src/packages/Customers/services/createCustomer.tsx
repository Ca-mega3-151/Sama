import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface CreateCustomer {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
  };
}

interface ResponseData {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  totals: number;
}

export const createCustomer = async (_: CreateCustomer) => {
  // const fetchApi = await getFetchApiInstance(remixRequest);

  // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
  //   // url: `/merchants/category/classes`,
  //   // method: 'POST',
  //   data,
  // }).axiosPromise;

  // if (isResponseError(response)) {
  //   throw new ServiceException(response.data.message, response.data);
  // }
  // return response.data as ResponseDetailSuccess<ResponseData>;

  // Mocked response for demonstration purposes
  return {
    data: {
      _id: 'GqsbNgZT',
      firstName: 'Zvcds',
      lastName: 'Oqtsbnl',
      phone: '+99-493-9268',
      email: 'zvcds.oqtsbnl@example.com',
      address: '198 qiafN Street, wveVCdG, bBaOPM',
      totals: 2382,
    },
  } as ResponseDetailSuccess<ResponseData>;
};
