import { Services } from '../models/Services';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface GetService {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    _id: Services['_id'];
  };
}

type ResponseData = Services;

export const getService = async (_: GetService) => {
  // const fetchApi = await getFetchApiInstance(remixRequest);

  // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
  //   // url: `/merchants/category/ServiceGetService/${data._id}`,
  // }).axiosPromise;

  // if (isResponseError(response)) {
  //   throw new ServiceException(response.data.message, response.data);
  // }
  // return response.data as ResponseDetailSuccess<ResponseData>;

  const response: ResponseDetailSuccess<ResponseData> = {
    code: 0,
    data: {
      _id: 'd3f7e7e4-6b8f-4c3a-bb7d-f102c30e8f70',
      name: 'Class 1',
      description: 'C001',
      __v: 0,
    },
  };

  return response;
};
