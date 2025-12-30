import { Inject, Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { stripeService } from './services/stripe.Service';
import { paypalService } from './services/paypal.service';
import { ConfigService } from '@nestjs/config';
import { PAYMENT_PROVIDER_TOKEN } from './payment.constants';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [
    stripeService,
    paypalService,

    {
      provide: PAYMENT_PROVIDER_TOKEN,
      // useFactory runs ONCE when the app starts up/module loads
      useFactory: (
        configService: ConfigService,
        stripeService: stripeService,
        paypalService: paypalService,
      ) => {
        // Read the configuration at startup time
        const providerType = configService.get<string>(
          'DEFAULT_PAYMENT_PROVIDER',
        );

        console.log(
          `[Factory Startup] Selecting default provider: ${providerType}`,
        );

        switch (providerType) {
          case 'STRIPE':
            return stripeService; // Return the Stripe service instance
          case 'PAYPAL':
            return paypalService; // Return the PayPal service instance
          default:
            // Handle error or default to one
            throw new Error(
              'DEFAULT_PAYMENT_PROVIDER environment variable not set or invalid.',
            );
        }
      },
      inject: [ConfigService, stripeService, paypalService],
    },
  ],
  exports: [PAYMENT_PROVIDER_TOKEN],
})
export class PaymentModule {}
