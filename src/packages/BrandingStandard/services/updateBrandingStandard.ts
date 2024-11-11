import { BrandingStandard } from '../models/BrandingStandard';
import { CreateBrandingStandard } from './createBrandingStandard';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { getFetchApiInstance } from '~/services/utils/getFetchApiInstance';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';

export interface UpdateBrandingStandard {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: CreateBrandingStandard['data'] & {
    _id: BrandingStandard['_id'];
  };
}

interface ResponseData {}

export const updateBrandingStandard = async ({ remixRequest, data }: UpdateBrandingStandard) => {
  const fetchApi = await getFetchApiInstance(remixRequest);

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: `/merchants/category/branding/${data._id}`,
    method: 'PUT',
    data,
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};
