import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Currency } from '../../../../../../utils/src/lib/models/currency/currency.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyConvertPipe } from '../../../pipes/currency/currency-convert.pipe';
import { CurrencyInputValue } from '../../../../../../utils/src/public-api';

@Component({
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, FormsModule, AsyncPipe, CurrencyConvertPipe],
})
export class CurrencyInputComponent implements OnInit {
  @Input({ required: true }) currencies!: Currency[];
  @Input() isPrimary: boolean = false;
  @Input() amount = 1;
  @Input() fromCurrencyCode: string = '';
  @Output() amountChange = new EventEmitter<number>();
  @Output() currencyChange = new EventEmitter<CurrencyInputValue>();

  protected currencyCode!: string;

  ngOnInit(): void {
    this.currencyCode = this.currencies[0].code;
  }

  public onAmountChange(event: Event): void {
    const amount = (event.target as HTMLInputElement).value;

    const numericValue = parseFloat(amount);
    if (!isNaN(numericValue)) {
      this.amount = numericValue;
      this.onCurrencyChange();
    }
  }

  public currencyCodeChange(event: Event): void {
    const currencyCode = (event.target as HTMLInputElement).value;
    const currency = this.currencies.find(
      (currency) => currency.code === currencyCode
    );

    if (currency) {
      this.currencyCode = currency.code;
      if (this.isPrimary) {
        this.onCurrencyChange();
      }
    }
  }

  private onCurrencyChange(): void {
    const currencyInputValue: CurrencyInputValue = {
      amount: this.amount,
      currencyCode: this.currencyCode,
    };
    this.currencyChange.emit(currencyInputValue);
  }
}
