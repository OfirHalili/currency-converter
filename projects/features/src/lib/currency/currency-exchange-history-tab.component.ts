import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { CurrencyInputValue } from '../../../../utils/src/public-api';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'currency-exchange-history-tab',
  templateUrl: './currency-exchange-history-tab.component.html',
  styleUrls: ['./currency-exchange-history-tab.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, DatePipe, MatTabsModule],
})
export class CurrencyExchangeHistoryTabComponent {
  @Input() conversionHistory: Array<CurrencyInputValue & { timestamp: Date }> =
    [];
}
