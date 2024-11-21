import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface CreateClasses {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    name: string;
    code: string;
  };
}

interface ResponseData {
  _id: string;
  name: string;
  code: string;
}

export const createClass = async (_: CreateClasses) => {
  // const fetchApi = await getFetchApiInstance(remixRequest);

  // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
  //   // url: `/merchants/category/classes`,
  //   // method: 'POST',
  //   data,
  // }).axiosPromise;

  // if (isResponseError(response)) {
  //   throw new ServiceException(response.data.message, response.data);
  // }
  // return response.data as ResponseDetailSuccess<ResponseData>;

  // Mocked response for demonstration purposes
  return {
    data: {
      _id: '12345',
      name: 'Class 1',
      code: 'C1',
    },
  } as ResponseDetailSuccess<ResponseData>;
};
