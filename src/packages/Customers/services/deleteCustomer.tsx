import { Customers } from '../models/Customers';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

interface ResponseData {}

interface DeleteCustomer {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  _id: Customers['_id'];
}
export const deleteCustomer = async (_: DeleteCustomer) => {
  // const fetchApi = await getFetchApiInstance(remixRequest);

  // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
  //   // url: `/merchants/category/classes/${_id}`,
  //   // method: 'DELETE',
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
