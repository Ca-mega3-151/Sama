// import { Vehicles } from '../models/Vehicles';
// import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
// import { ResponseDetailSuccess } from '~/services/types/Response';

// export interface GetVehicle {
//   remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
//   data: {
//     _id: Vehicles['_id'];
//   };
// }

// type ResponseData = Vehicles;

// export const getVehicle = async (_: GetVehicle) => {
//   // const fetchApi = await getFetchApiInstance(remixRequest);

//   // const response = await fetchApi.request<ResponseDetailSuccess<ResponseData> | ResponseFailure>({
//   //   // url: `/merchants/category/classes/${data._id}`,
//   // }).axiosPromise;

//   // if (isResponseError(response)) {
//   //   throw new ServiceException(response.data.message, response.data);
//   // }
//   // return response.data as ResponseDetailSuccess<ResponseData>;

//   const response: ResponseDetailSuccess<ResponseData> = {
//     code: 0,
//     data: {
//       _id: 'de3905bd-35f8-4652-b451-654655dce830',
//       vehicleBrand: 'Thompson Inc',
//       code: 'yyFo-###',
//       img: 'https://dummyimage.com/954x297',
//       vehicleModel: 'director',
//       registerNumber: '407R',
//       registrationNumber: 'MRH-4625',
//       manufacturerDate: '1993-07-21',
//       service: 'Ecologist',
//       registrationDate: '1980-08-19',
//       firstcirculationDate: '2008-05-21',
//       expiryTechnicalVisitDate: '2023-04-03',
//       insuranceExpiryDate: '1980-05-21',
//       totalSeats: 172,
//       __v: 0,
//     },
//   };

//   return response;
// };

import { Vehicles } from '../models/Vehicles';
import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface GetVehicle {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    _id: Vehicles['_id'];
  };
}

type ResponseData = Vehicles;

export const getVehicle = async (_: GetVehicle) => {
  // Giả sử đây là dữ liệu trả về từ API, bạn có thể thay thế với yêu cầu API thực tế.
  const response: ResponseDetailSuccess<ResponseData> = {
    code: 0,
    data: {
      _id: 'de3905bd-35f8-4652-b451-654655dce830',
      vehicleBrand: 'Thompson Inc',
      code: 'yyFo-###',
      img: 'https://dummyimage.com/954x297',
      vehicleModel: 'director',
      registerNumber: '407R',
      registrationNumber: 'MRH-4625',
      manufacturerDate: '1993-07-21',
      service: 'Ecologist',
      registrationDate: '1980-08-19',
      firstcirculationDate: '2008-05-21',
      expiryTechnicalVisitDate: '2023-04-03',
      insuranceExpiryDate: '1980-05-21',
      totalSeats: 172,
      __v: 0,
    },
  };

  return response;
};
