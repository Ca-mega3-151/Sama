import { Classes } from '../models/Classes';
import { CreateClasses } from './CreateClasses';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { getFetchApiInstance } from '~/services/utils/getFetchApiInstance';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';

export interface UpdateClasses {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: CreateClasses['data'] & {
    _id: Classes['_id'];
  };
}

interface ResponseData {}

export const UpdateClasses = async ({ remixRequest, data }: UpdateClasses) => {
  const fetchApi = await getFetchApiInstance(remixRequest);

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: `/merchants/category/classes/${data._id}`,
    method: 'PUT',
    data,
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};
