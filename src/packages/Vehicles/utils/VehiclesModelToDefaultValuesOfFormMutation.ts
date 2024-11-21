import { VehiclesFormMutationProps } from '../components/FormMutation/FormMutation';
import { Vehicles } from '../models/Vehicles';

interface VehiclesModelToDefaultValuesOfFormMutation {
  vehicles: Vehicles | undefined;
}

export const VehiclesModelToDefaultValuesOfFormMutation = ({
  vehicles,
}: VehiclesModelToDefaultValuesOfFormMutation): VehiclesFormMutationProps['defaultValues'] => {
  if (!vehicles) {
    return {
      vehicleBrand: undefined,
      vehicleModel: undefined,
      registrationNumber: undefined,
      manufacturerDate: undefined,
      service: undefined,
      registrationDate: undefined,
      firstcirculationDate: undefined,
      expiryTechnicalVisitDate: undefined,
      insuranceExpiryDate: undefined,
    };
  }

  return {
    // code: vehicles.code,
    // name: vehicles.name,
    vehicleBrand: vehicles.vehicleBrand,
    vehicleModel: vehicles.vehicleModel,
    registrationNumber: vehicles.registrationNumber,
    manufacturerDate: vehicles.manufacturerDate,
    service: vehicles.service,
    registrationDate: vehicles.registrationDate,
    firstcirculationDate: vehicles.firstcirculationDate,
    expiryTechnicalVisitDate: vehicles.expiryTechnicalVisitDate,
    insuranceExpiryDate: vehicles.insuranceExpiryDate,
  };
};
