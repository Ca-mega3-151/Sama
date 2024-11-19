import { Classes } from '../models/Classes';
import { CreateClasses } from './createClass';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface UpdateClasses {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: CreateClasses['data'] & {
    _id: Classes['_id'];
  };
}

interface ResponseData {}

export const updateClass = async (_: UpdateClasses) => {
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
