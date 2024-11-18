import { Branding } from '../models/Branding';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { getFetchApiInstance } from '~/services/utils/getFetchApiInstance';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';

export interface GetBranding {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    _id: Branding['_id'];
  };
}

interface ResponseData {
  _id: string;
  merchantCode: string;
  brandingCode: string;
  brandingName: string;
  createdBy: string;
  updatedBy: string;
  status: 'ACTIVE' | 'DEACTIVE';
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export const getBranding = async ({ remixRequest, data }: GetBranding) => {
  const fetchApi = await getFetchApiInstance(remixRequest);

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: `/merchants/category/branding/${data._id}`,
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};
