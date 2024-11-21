import { VehiclesFormMutationValues } from '../components/FormMutation/FormMutation';
import { CreateVehicle } from '../services/createVehicle';

export const vehiclesFormMutationValuesToCreateVehiclesService = (
  values: VehiclesFormMutationValues,
): CreateVehicle['data'] => {
  return {
    vehicleBrand: values.vehicleBrand,
    vehicleModel: values.vehicleModel,
    registrationNumber: values.registrationNumber,
    service: values.service,
    manufacturerDate: values.manufacturerDate,
    registrationDate: values.registrationDate,
    firstcirculationDate: values.firstcirculationDate,
    expiryTechnicalVisitDate: values.expiryTechnicalVisitDate,
    insuranceExpiryDate: values.insuranceExpiryDate,
  };
};
