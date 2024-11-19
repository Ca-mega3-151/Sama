import { Customers } from '../models/Customers';
import { CreateCustomer } from './createCustomer';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface UpdateClasses {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: CreateCustomer['data'] & {
    _id: Customers['_id'];
  };
}

interface ResponseData {}

export const updateCustomer = async (_: UpdateClasses) => {
  // const fetchApi = await getFetchApiInstance(remixRequest);

  // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
  //   // url: `/merchants/category/classes/${data._id}`,
  //   // method: 'PUT',
  //   data,
  // }).axiosPromise;

  // if (isResponseError(response)) {
  //   throw new ServiceException(response.data.message, response.data);
  // }
  // return response.data as ResponseDetailSuccess<ResponseData>;

  const response: ResponseDetailSuccess<ResponseData> = {
    code: 0,
    data: {},
  };
  return response;
};
