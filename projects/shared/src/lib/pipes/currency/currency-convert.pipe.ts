import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { CurrencyService } from '../../../../../core/src/lib/services/currency/currency.service';

@Pipe({
  standalone: true,
  name: 'currencyConvert',
  pure: false,
})
export class CurrencyConvertPipe implements PipeTransform {
  private currencyService = inject(CurrencyService);

  public transform(
    amount: number,
    from: string,
    to: string
  ): Observable<number> {
    if (!from || !to || from === to) {
      return of(amount);
    }
    return this.currencyService.getRate$(from, to).pipe(
      map((response) => {
        const rate = response.rates[to];
        return amount * rate;
      })
    );
  }
}
