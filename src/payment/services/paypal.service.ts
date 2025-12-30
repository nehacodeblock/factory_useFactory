import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '../interface/paymentProvider.interface';

@Injectable()
export class paypalService implements PaymentProvider {
  getProviderName(): string {
    return 'paypal';
  }
  getProcess(amt: number): string {
    return `amt ${amt} process by paypal `;
  }
}
