import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface CreateService {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    name: string;
    description: string;
  };
}

interface ResponseData {
  _id: string;
  name: string;
  description: string;
}

export const createService = async (_: CreateService) => {
  // const fetchApi = await getFetchApiInstance(remixRequest);

  // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
  //   // url: `/merchants/category/Service`,
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
      description: 'C1',
    },
  } as ResponseDetailSuccess<ResponseData>;
};
