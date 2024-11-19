import { Services } from '../models/Services';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

interface ResponseData {}

interface DeleteService {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  _id: Services['_id'];
}
export const deleteService = async (_: DeleteService) => {
  // const fetchApi = await getFetchApiInstance(remixRequest);

  // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
  //   // url: `/merchants/category/Service/${_id}`,
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
