import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface CreateVehicle {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    vehicleBrand: string;
    // img: string;
    vehicleModel: string;
    registrationNumber: string;
    manufacturerDate: string;
    service: string;
    registrationDate: string;
    firstcirculationDate: string;
    expiryTechnicalVisitDate: string;
    insuranceExpiryDate: string;
  };
}

interface ResponseData {
  _id: string;
  vehicleBrand: string;
  vehicleModel: string;
  registrationNumber: string;
  manufacturerDate: string;
  service: string;
  registrationDate: string;
  firstcirculationDate: string;
  expiryTechnicalVisitDate: string;
  insuranceExpiryDate: string;
}

export const createVehicle = async (_: CreateVehicle) => {
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
      _id: '8a3c7337-5e07-4bfc-a32e-27967a0d1490',
      vehicleBrand: 'Rice-Smith',
      vehicleModel: 'Series-346',
      registrationNumber: 'ádas',
      manufacturerDate: '1999-03-25',
      service: 'Brake Check',
      registrationDate: '2022-10-05',
      firstcirculationDate: '2021-10-24',
      expiryTechnicalVisitDate: '2025-06-08',
      insuranceExpiryDate: '2025-08-05',
    },
  } as ResponseDetailSuccess<ResponseData>;
};
