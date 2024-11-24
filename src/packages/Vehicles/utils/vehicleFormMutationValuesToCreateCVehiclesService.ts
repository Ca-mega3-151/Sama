import { VehicleFormMutationValues } from '../components/FormMutation/FormMutation';
import { CreateVehicle } from '../services/createVehicle';

export const vehiclesFormMutationValuesToCreateVehiclesService = (
  values: VehicleFormMutationValues,
): CreateVehicle['data'] => {
  return {
    vehicleBrand: values.vehicleInformation?.vehicleBrand,
    vehicleModel: values.vehicleInformation?.vehicleModel,
    registrationNumber: values.vehicleInformation?.registrationNumber,
    services: values.vehicleInformation?.services,
    manufacturerDate: values.vehicleInformation?.manufacturerDate,
    registrationDate: values.vehicleInformation?.registrationDate,
    firstcirculationDate: values.vehicleInformation?.firstcirculationDate,
    expiryTechnicalVisitDate: values.vehicleInformation?.expiryTechnicalVisitDate,
    insuranceExpiryDate: values.vehicleInformation?.insuranceExpiryDate,
  };
};
