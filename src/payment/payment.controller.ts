import { Body, Controller, Inject, Post } from '@nestjs/common';

import { PaymentProvider } from './interface/paymentProvider.interface';
import { PAYMENT_PROVIDER_TOKEN } from './payment.constants';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(PAYMENT_PROVIDER_TOKEN)

    // @ts-ignore
    private readonly paymentService: PaymentProvider,
  ) {}

  @Post('process')
  processPayment(@Body() body: { amt: number }) {
    const res = this.paymentService.getProcess(body.amt);
    return {
      res: res,
      useProvider: this.paymentService.getProviderName(),
    };
  }
}
