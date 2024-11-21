export interface Vehicles {
  _id: string;
  vehicleBrand: string;
  code: string;
  img: string;
  vehicleModel: string;
  registerNumber: string;
  registrationNumber: string;
  manufacturerDate: string;
  service: string;
  registrationDate: string;
  firstcirculationDate: string;
  expiryTechnicalVisitDate: string;
  insuranceExpiryDate: string;
  totalSeats: number;
  seat: {
    fare: string;
    statusFare: FareClass;
  };
  __v: 0;
}

export interface FareClass {
  vvip: number;
  vip: number;
  business: number;
  oridinary: number;
}
