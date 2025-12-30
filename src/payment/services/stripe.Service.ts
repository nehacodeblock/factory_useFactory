import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '../interface/paymentProvider.interface';

@Injectable()
export class stripeService implements PaymentProvider {
  getProviderName(): string {
    return 'Stripe';
  }
  getProcess(amt: number): string {
    return `amt ${amt} process by stripe `;
  }
}
