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
      _id: '20f4e414-08e1-4d6c-b35e-a7c60f6fb62f',
      vehicleBrand: 'Matthews-Sellers',
      registrationNumber: 'ádas',
      code: 'DPJ-###',
      img: 'https://www.lorempixel.com/100/100',
      vehicleModel: 'Model-140',
      registerNumber: 'ZAI-0845',
      manufacturerDate: '2003-10-25',
      service: 'Battery Inspection',
      registrationDate: '2021-01-07',
      firstcirculationDate: '2023-01-23',
      expiryTechnicalVisitDate: '2026-11-03',
      insuranceExpiryDate: '2025-11-06',
      totalSeats: 60,
      __v: 0,
    },
  };

  return response;
};
