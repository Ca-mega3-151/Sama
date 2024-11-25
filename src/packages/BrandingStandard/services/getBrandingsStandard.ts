import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseFailure, ResponseListSuccess } from '~/services/types/Response';
import { Searcher, Sorter } from '~/services/types/SearchParams';
import { getFetchApiInstance } from '~/services/utils/getFetchApiInstance';
import { getSearchParams } from '~/services/utils/getSearchParams';
import { getSortParams } from '~/services/utils/getSortParams';
import { isResponseError } from '~/services/utils/isResponseError';
import { ServiceException } from '~/services/utils/ServiceException';

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

interface GetBrandingsStandard {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  page: number;
  pageSize: number;
  sorter: Sorter<ResponseData>;
  searcher: Searcher<ResponseData>;
}
export const getBrandingsStandard = async ({
  remixRequest,
  page,
  pageSize,
  searcher,
  sorter,
}: GetBrandingsStandard): Promise<ResponseListSuccess<ResponseData>> => {
  const fetchApi = await getFetchApiInstance(remixRequest);

  const response = await fetchApi.request<ResponseListSuccess<ResponseData> | ResponseFailure>({
    url: '/merchants/category/branding',
    params: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
    },
  }).axiosPromise;

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseListSuccess<ResponseData>;
};
