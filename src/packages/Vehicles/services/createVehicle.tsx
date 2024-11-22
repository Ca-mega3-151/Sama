import { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { ResponseDetailSuccess } from '~/services/types/Response';

export interface CreateVehicle {
  remixRequest?: LoaderFunctionArgs | ActionFunctionArgs;
  data: {
    vehicleBrand: string;
    vehicleModel: string;
    registrationNumber: string;
    manufacturerDate: string;
    services: string[];
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
  namefare: string;
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
      _id: '66dae849-7fe0-4a7c-b49f-803c04c0c88b',
      vehicleBrand: 'Herman, Lee and Donaldson',
      vehicleModel: 'there',
      registrationNumber: '197 AMR',
      manufacturerDate: '2019-06-06',
      service: 'Social researcher',
      registrationDate: '1996-12-12',
      firstcirculationDate: '2018-09-06',
      expiryTechnicalVisitDate: '1978-01-02',
      insuranceExpiryDate: '1973-11-05',
      namefare: 'respond',
    },
  } as ResponseDetailSuccess<ResponseData>;
};
