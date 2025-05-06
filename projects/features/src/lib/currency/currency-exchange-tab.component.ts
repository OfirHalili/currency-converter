import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CurrencyService } from '../../../../core/src/lib/services/currency/currency.service';
import { CurrencyInputComponent } from '../../../../shared/src/public-api';
import { CurrencyInputValue } from '../../../../utils/src/public-api';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'currency-exchange-tab',
  templateUrl: './currency-exchange-tab.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, MatTabsModule, CurrencyInputComponent],
})
export class CurrencyExchangeTabComponent {
  @Output() currencyInputValueChanged = new EventEmitter<CurrencyInputValue>();
  private currencyService: CurrencyService = inject(CurrencyService);

  private readonly currencyInputValue: BehaviorSubject<CurrencyInputValue> =
    new BehaviorSubject({ currencyCode: '', amount: 1 });

  protected readonly currencyInputValue$ =
    this.currencyInputValue.asObservable();
  protected readonly currencies$ = this.currencyService.fetchCurrencies$();

  protected currencyChange(currencyInputValue: CurrencyInputValue): void {
    this.currencyInputValue.next(currencyInputValue);
    this.currencyInputValueChanged.emit(currencyInputValue);
  }
}
