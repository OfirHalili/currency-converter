import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, shareReplay } from 'rxjs';
import { CurrencyRatesResponse } from '../../models/currency/currency-rates-response.model';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private httpClient = inject(HttpClient);
  private cacheRates = new Map<string, Observable<CurrencyRatesResponse>>();

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
