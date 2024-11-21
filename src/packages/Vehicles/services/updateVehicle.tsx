import { Vehicles } from '../models/Vehicles';
import { CreateVehicle } from './createVehicle';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface UpdateVehicle {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: CreateVehicle['data'] & {
    _id: Vehicles['_id'];
  };
}

interface ResponseData {}

export const updateVehicle = async (_: UpdateVehicle) => {
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
