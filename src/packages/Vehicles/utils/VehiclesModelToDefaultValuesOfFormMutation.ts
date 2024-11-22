import { VehicleFormMutationProps } from '../components/FormMutation/Formmutation';
import { Vehicles } from '../models/Vehicles';

interface VehiclesModelToDefaultValuesOfFormMutation {
  vehicles: Vehicles | undefined;
}

export const VehiclesModelToDefaultValuesOfFormMutation = ({
  vehicles,
}: VehiclesModelToDefaultValuesOfFormMutation): VehicleFormMutationProps['defaultValues'] => {
  if (!vehicles) {
    return {
      vehicleInformation: {
        vehicleBrand: undefined,
        vehicleModel: undefined,
        registrationNumber: undefined,
        manufacturerDate: undefined,
        services: [],
        registrationDate: undefined,
        firstcirculationDate: undefined,
        expiryTechnicalVisitDate: undefined,
        insuranceExpiryDate: undefined,
      },
      seatSettings: {
        seats: [],
      },
    };
  }

  return {
    vehicleInformation: {
      vehicleBrand: undefined,
      vehicleModel: undefined,
      registrationNumber: undefined,
      manufacturerDate: undefined,
      services: [],
      registrationDate: undefined,
      firstcirculationDate: undefined,
      expiryTechnicalVisitDate: undefined,
      insuranceExpiryDate: undefined,
    },
    seatSettings: {
      seats: [],
    },
  };
};
