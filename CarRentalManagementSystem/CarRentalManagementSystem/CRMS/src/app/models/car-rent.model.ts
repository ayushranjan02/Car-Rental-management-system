export interface CarRent {
  rentCarId: number;
  rentFromDate: string;
  rentToDate: string;
  amount: number;
  approvedBy?: string;
  rentStatus: string;
  carId: number;
  carss?: Car; 
  customerId: number;
  customers?: Customer; 
}

export interface Car {
  carId: number;
  carName: string;
  model: string;
  color: string;
  fuelType: string;
  imageUrl?: string;
  rentPrice: number;
  availability_Status: string;
  seater: number;
  year: string;
}

export interface Customer {
  customerId: number;
  customer_Name: string;
  email: string;
  phone_Number: string;
}
