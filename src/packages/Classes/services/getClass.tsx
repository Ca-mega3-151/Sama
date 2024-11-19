import { Classes } from '../models/Classes';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface GetClasses {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    _id: Classes['_id'];
  };
}

type ResponseData = Classes;

export const getClass = async (_: GetClasses) => {
  // const fetchApi = await getFetchApiInstance(remixRequest);

  // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
  //   // url: `/merchants/category/classes/${data._id}`,
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
      code: 'C001',
      __v: 0,
    },
  };

  return response;
};
