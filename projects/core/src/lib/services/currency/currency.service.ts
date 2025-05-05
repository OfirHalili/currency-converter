import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, shareReplay } from 'rxjs';
import { CurrencyRatesResponse } from '../../models/currency/currency-rates-response.model';
import { Currency } from '../../../../../utils/src/public-api';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private httpClient = inject(HttpClient);
  private cacheRates = new Map<string, Observable<CurrencyRatesResponse>>();
  private currencies$?: Observable<Currency[]>;

  public fetchCurrencies$(): Observable<Currency[]> {
    if (!this.currencies$) {
      this.currencies$ = this.httpClient
        .get<Record<string, string>>(
          'https://api.frankfurter.dev/v1/currencies'
        )
        .pipe(
          map((data) =>
            Object.entries(data).map(([code, name]) => ({
              code,
              name,
            }))
          ),
          shareReplay(1)
        );
    }
    return this.currencies$;
  }

  public getRate$(from: string, to: string): Observable<CurrencyRatesResponse> {
    const key = `${from}->${to}`;
    if (!this.cacheRates.has(key)) {
      const url = `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`;
      const request$ = this.httpClient
        .get<CurrencyRatesResponse>(url)
        .pipe(shareReplay(1));
      this.cacheRates.set(key, request$);
    }
    return this.cacheRates.get(key)!;
  }
}
