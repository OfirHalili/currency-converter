import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CurrencyService } from '../../../../core/src/lib/services/currency/currency.service';
import { CurrencyInputComponent } from '../../../../shared/src/public-api';
import { Currency, CurrencyInputValue } from '../../../../utils/src/public-api';

@Component({
  selector: 'currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, CurrencyInputComponent, AsyncPipe],
})
export class CurrencyExchangeComponent {
  private currencyService: CurrencyService = inject(CurrencyService);

  private readonly currencyInputValue: BehaviorSubject<CurrencyInputValue> =
    new BehaviorSubject({ currencyCode: '', amount: 1 });
  protected currencies: Currency[] = [];
  protected readonly currencyInputValue$ =
    this.currencyInputValue.asObservable();
  protected readonly currencies$ = this.currencyService.fetchCurrencies$();

  protected currencyChange(currencyInputValue: CurrencyInputValue): void {
    this.currencyInputValue.next(currencyInputValue);
  }
}
