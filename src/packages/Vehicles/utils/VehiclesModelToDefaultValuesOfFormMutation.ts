// import { VehicleFormMutationProps } from '../components/FormMutation/FormMutation';
// import { Vehicles } from '../models/Vehicles';

// interface VehiclesModelToDefaultValuesOfFormMutation {
//   vehicles: Vehicles | undefined;
// }

// export const VehiclesModelToDefaultValuesOfFormMutation = ({
//   vehicles,
// }: VehiclesModelToDefaultValuesOfFormMutation): VehicleFormMutationProps['defaultValues'] => {
//   if (!vehicles) {
//     return {
//       vehicleInformation: {
//         vehicleBrand: undefined,
//         vehicleModel: undefined,
//         registrationNumber: undefined,
//         manufacturerDate: undefined,
//         services: [],
//         registrationDate: undefined,
//         firstcirculationDate: undefined,
//         expiryTechnicalVisitDate: undefined,
//         insuranceExpiryDate: undefined,
//       },
//       seatSettings: {
//         seats: [],
//       },
//     };
//   }

//   return {
//     vehicleInformation: {
//       vehicleBrand: undefined,
//       vehicleModel: undefined,
//       registrationNumber: undefined,
//       manufacturerDate: undefined,
//       services: [],
//       registrationDate: undefined,
//       firstcirculationDate: undefined,
//       expiryTechnicalVisitDate: undefined,
//       insuranceExpiryDate: undefined,
//     },
//     seatSettings: {
//       seats: [],
//     },
//   };
// };

import { VehicleFormMutationProps } from '../components/FormMutation/FormMutation';
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
        vehicleBrand: '', // Empty string instead of undefined
        vehicleModel: '', // Empty string instead of undefined
        registrationNumber: '', // Empty string instead of undefined
        manufacturerDate: '', // Empty string instead of undefined
        services: [], // Empty array for services
        registrationDate: '', // Empty string instead of undefined
        firstcirculationDate: '', // Empty string instead of undefined
        expiryTechnicalVisitDate: '', // Empty string instead of undefined
        insuranceExpiryDate: '', // Empty string instead of undefined
      },
      seatSettings: {
        seats: [], // Empty array for seats
      },
    };
  }

  // Map vehicle fields to form default values
  return {
    vehicleInformation: {
      vehicleBrand: vehicles.vehicleBrand || '', // Use vehicle data if available, otherwise empty string
      vehicleModel: vehicles.vehicleModel || '', // Use vehicle data if available, otherwise empty string
      registrationNumber: vehicles.registrationNumber || '', // Use vehicle data if available, otherwise empty string
      manufacturerDate: vehicles.manufacturerDate || '', // Use vehicle data if available, otherwise empty string
      services: vehicles.service ? [vehicles.service] : [], // Assuming 'service' field exists on vehicle
      registrationDate: vehicles.registrationDate || '', // Use vehicle data if available, otherwise empty string
      firstcirculationDate: vehicles.firstcirculationDate || '', // Use vehicle data if available, otherwise empty string
      expiryTechnicalVisitDate: vehicles.expiryTechnicalVisitDate || '', // Use vehicle data if available, otherwise empty string
      insuranceExpiryDate: vehicles.insuranceExpiryDate || '', // Use vehicle data if available, otherwise empty string
    },
    seatSettings: {
      seats: [], // Set default seats if applicable
    },
  };
};
