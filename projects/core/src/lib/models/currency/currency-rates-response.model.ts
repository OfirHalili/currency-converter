export interface CurrencyRatesResponse {
    base: string;
    date: string;
    rates: {
      [currencyCode: string]: number;
    };
  }
  