import { BrandingStandard } from '../models/BrandingStandard';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess, ResponseFailure } from '~/services/types/Response';
import { getFetchApiInstance } from '~/services/utils/getFetchApiInstance';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';

interface ResponseData {}

interface DeleteBrandingStandard {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  _id: BrandingStandard['_id'];
}
export const deleteBrandingStandard = async ({ remixRequest, _id }: DeleteBrandingStandard) => {
  const fetchApi = await getFetchApiInstance(remixRequest);

  const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
    url: `/merchants/category/branding/${_id}`,
    method: 'DELETE',
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};
