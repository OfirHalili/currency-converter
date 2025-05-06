import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencyInputValue } from '../../../../utils/src/public-api';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyExchangeTabComponent } from './currency-exchange-tab.component';
import { CurrencyExchangeHistoryTabComponent } from './currency-exchange-history-tab.component';
import { CurrencyHistoryStore } from '../../../../core/src/lib/store/currency-history.store';

@Component({
  selector: 'currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTabsModule,
    CurrencyExchangeTabComponent,
    CurrencyExchangeTabComponent,
    CurrencyExchangeHistoryTabComponent,
  ],
})
export class CurrencyExchangeComponent {
  private currencyHistoryStore = inject(CurrencyHistoryStore);

  protected currencyChange(currencyInputValue: CurrencyInputValue): void {
    this.currencyHistoryStore.addToHistory({
      ...currencyInputValue,
      timestamp: new Date(),
    });
  }
}
