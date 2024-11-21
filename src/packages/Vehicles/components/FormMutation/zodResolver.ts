import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { object, string } from 'zod';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getFormMutationSchema = (t: TFunction<['common', 'vehicles']>) => {
  const vehicleModel = { required: getRequiredMessage(t, 'vehicles:vehicleModel') };
  const registrationNumber = { required: getRequiredMessage(t, 'vehicles:registrationNumber') };
  const vehicleBrand = { required: getRequiredMessage(t, 'vehicles:name') };
  const service = { required: getRequiredMessage(t, 'vehicles:service') };
  const manufactureDate = { required: getRequiredMessage(t, 'vehicles:ManufactureDate') };
  const expiryTechnicalVisitDate = { required: getRequiredMessage(t, 'vehicles:ExpiryTechnicalVisitDate') };
  const insuranceExpiryDate = { required: getRequiredMessage(t, 'vehicles:InsuranceExpiryDate') };
  const registrationDate = { required: getRequiredMessage(t, 'vehicles:RegistrationDate') };
  const firstcirculationDate = { required: getRequiredMessage(t, 'vehicles:FirstCirculationDate') };
  return object({
    vehicleModel: string({ required_error: vehicleModel.required }).min(1, vehicleModel.required),
    registrationNumber: string({ required_error: registrationNumber.required }).min(1, registrationNumber.required),
    vehicleBrand: string({ required_error: vehicleBrand.required }).min(1, vehicleBrand.required),
    service: string({ required_error: service.required }).min(1, service.required),
    manufacturerDate: string({ required_error: manufactureDate.required }).min(1, manufactureDate.required),
    expiryTechnicalVisitDate: string({ required_error: expiryTechnicalVisitDate.required }).min(
      1,
      expiryTechnicalVisitDate.required,
    ),
    insuranceExpiryDate: string({ required_error: insuranceExpiryDate.required }).min(1, insuranceExpiryDate.required),
    registrationDate: string({ required_error: registrationDate.required }).min(1, registrationDate.required),
    firstcirculationDate: string({ required_error: firstcirculationDate.required }).min(
      1,
      firstcirculationDate.required,
    ),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'vehicles']>) => {
  return zodResolver(getFormMutationSchema(t));
};