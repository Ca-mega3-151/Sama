import { Vehicles } from '../models/Vehicles';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

interface ResponseData {}

interface DeleteVehicle {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  _id: Vehicles['_id'];
}
export const deleteVehicle = async (_: DeleteVehicle) => {
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
