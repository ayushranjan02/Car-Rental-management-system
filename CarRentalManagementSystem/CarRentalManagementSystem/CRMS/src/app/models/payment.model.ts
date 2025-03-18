export interface Payment {
    paymentId: number;
    rentCarId: number;
    amount: number;
    paymentDate: string;
    paymentStatus: string;
    paymentMethod: string;
    upiId?: string; 
    cardNumber?: string; 
    cardName?: string; 
    expiryMonth?: number; 
    expiryYear?: number;
    cvv?: number; 
  }
  