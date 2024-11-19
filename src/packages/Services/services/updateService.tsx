import { Services } from '../models/Services';
import { CreateService } from './createService';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface UpdateService {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: CreateService['data'] & {
    _id: Services['_id'];
  };
}

interface ResponseData {}

export const updateService = async (_: UpdateService) => {
  // const fetchApi = await getFetchApiInstance(remixRequest);

  // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
  //   // url: `/merchants/category/Service/${data._id}`,
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
