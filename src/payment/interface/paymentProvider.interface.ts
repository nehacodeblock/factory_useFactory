export interface PaymentProvider {
  getProviderName(): string;

  getProcess(amt: number): string;
}
