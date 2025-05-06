import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { NgIf, NgFor, DatePipe, AsyncPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyHistoryStore } from '../../../../core/src/lib/store/currency-history.store';

@Component({
  selector: 'currency-exchange-history-tab',
  templateUrl: './currency-exchange-history-tab.component.html',
  styleUrls: ['./currency-exchange-history-tab.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, DatePipe, MatTabsModule, AsyncPipe],
})
export class CurrencyExchangeHistoryTabComponent {
  protected currencyHistoryStore = inject(CurrencyHistoryStore);

}
