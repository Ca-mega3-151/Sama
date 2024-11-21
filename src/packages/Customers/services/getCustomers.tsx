import { Customers } from '../models/Customers';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseListSuccess } from '~/services/types/Response';
import { Searcher, Sorter } from '~/services/types/SearchParams';

type ResponseData = Customers;

interface GetCustomers {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  page: number;
  pageSize: number;
  sorter: Sorter<ResponseData>;
  searcher: Searcher<ResponseData>;
}
export const getCustomers = async (_: GetCustomers): Promise<ResponseListSuccess<ResponseData>> => {
  // const fetchApi = await getFetchApiInstance(remixRequest);
  // const response = await fetchApi.request<ResponseListSuccess<ResponseData> | ResponseFailure>({
  //   url: '/merchants/category/classess',
  //   params: {
  //     limit: pageSize,
  //     offset: (page - 1) * pageSize,
  //     ...getSortParams(sorter),
  //     ...getSearchParams(searcher),
  //   },
  // }).axiosPromise;
  // if (isResponseError(response)) {
  //   throw new ServiceException(response.data.message, response.data);
  const response: ResponseListSuccess<ResponseData> = {
    code: 0,
    data: {
      hits: [
        {
          _id: '6c01deab',
          firstName: 'Zphxr',
          lastName: 'Fzrmzez',
          phone: '+24-575-8949',
          email: 'zphxr.fzrmzez@random.org',
          address: '904 QjrZqL Street, NCskrph, EWeeXA',
          total: 851,
          __v: 0,
        },
        {
          _id: '29dfd8b1',
          firstName: 'Qlbul',
          lastName: 'Uolsusq',
          phone: '+87-815-2859',
          email: 'qlbul.uolsusq@random.org',
          address: '32 ffZrvQ Street, zyWBEia, Ffvtwx',
          total: 6464,
          __v: 0,
        },
        {
          _id: 'da2ad563',
          firstName: 'Gblyb',
          lastName: 'Pvfxlda',
          phone: '+32-690-6697',
          email: 'gblyb.pvfxlda@test.com',
          address: '409 HrLpvJ Street, vzwqPXd, AYXsze',
          total: 5063,
          __v: 0,
        },
        {
          _id: 'c1a116a4',
          firstName: 'Idqwc',
          lastName: 'Tlramip',
          phone: '+83-168-6628',
          email: 'idqwc.tlramip@random.org',
          address: '363 GonYzz Street, FRqyzEl, PDfGkB',
          total: 5212,
          __v: 0,
        },
        {
          _id: 'ad15be7f',
          firstName: 'Flpyr',
          lastName: 'Nfrgidi',
          phone: '+71-545-1011',
          email: 'flpyr.nfrgidi@mail.com',
          address: '583 boiWwP Street, mFsmFUe, uxkgkv',
          total: 5156,
          __v: 0,
        },
        {
          _id: '12345678',
          firstName: 'Rlqwg',
          lastName: 'Jwzckdv',
          phone: '+44-123-5678',
          email: 'rlqwg.jwzckdv@example.com',
          address: '782 Abcdef Street, Zzzxxx, Yyywww',
          total: 7894,
          __v: 0,
        },
        {
          _id: 'abcdef12',
          firstName: 'Piyer',
          lastName: 'Wofusud',
          phone: '+49-987-6543',
          email: 'piyer.wofusud@test.com',
          address: '124 NewPlace Street, Xyzabc, Tttuuu',
          total: 2021,
          __v: 0,
        },
        {
          _id: '98765432',
          firstName: 'Tycpe',
          lastName: 'Grfzodi',
          phone: '+12-345-6789',
          email: 'tycpe.grfzodi@mail.com',
          address: '390 Xymnop Street, Plokij, Qwertz',
          total: 6123,
          __v: 0,
        },
        {
          _id: 'abcd1234',
          firstName: 'Gyrbz',
          lastName: 'Kjyrtsl',
          phone: '+90-246-1357',
          email: 'gyrbz.kjyrtsl@random.org',
          address: '135 LongStreet, Zipxyz, Wxyztv',
          total: 3421,
          __v: 0,
        },
        {
          _id: 'qwert11123',
          firstName: 'Bxlze',
          lastName: 'Opasdlz',
          phone: '+77-999-8888',
          email: 'bxlze.opasdlz@test.com',
          address: '975 MainRoad Street, Looping, YikesQ',
          total: 4560,
          __v: 0,
        },
        {
          _id: 'qwert22123',
          firstName: 'Bxlze',
          lastName: 'Opasdlz',
          phone: '+77-999-8888',
          email: 'bxlze.opasdlz@test.com',
          address: '975 MainRoad Street, Looping, YikesQ',
          total: 4560,
          __v: 0,
        },
        {
          _id: 'qw43ert123',
          firstName: 'Bxlze',
          lastName: 'Opasdlz',
          phone: '+77-999-8888',
          email: 'bxlze.opasdlz@test.com',
          address: '975 MainRoad Street, Looping, YikesQ',
          total: 4560,
          __v: 0,
        },
        {
          _id: 'qwert14123',
          firstName: 'Bxlze',
          lastName: 'Opasdlz',
          phone: '+77-999-8888',
          email: 'bxlze.opasdlz@test.com',
          address: '975 MainRoad Street, Looping, YikesQ',
          total: 4560,
          __v: 0,
        },
      ],
      pagination: {
        totalPages: 1,
        totalRows: 10,
      },
    },
  };

  return response;
};
