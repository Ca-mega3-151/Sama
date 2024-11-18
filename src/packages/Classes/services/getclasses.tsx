import { Classes } from '../models/Classes';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { getFetchApiInstance } from '~/services/utils/getFetchApiInstance';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';

export interface GetClasses {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    _id: Classes['_id'];
  };
}

interface ResponseData {
  _id: string;
  name: string;
  code: string;
  __v: 0;
}

export const GetClasses = async ({ remixRequest, data }: GetClasses) => {
  const fetchApi = await getFetchApiInstance(remixRequest);

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: `/merchants/category/classes/${data._id}`,
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};
