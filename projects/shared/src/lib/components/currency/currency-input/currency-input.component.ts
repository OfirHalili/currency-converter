import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Currency } from '../../../../../../utils/src/lib/models/currency/currency.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyConvertPipe } from '../../../pipes/currency/currency-convert.pipe';
import { CurrencyInputValue } from '../../../../../../utils/src/public-api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, FormsModule, AsyncPipe, CurrencyConvertPipe],
  providers: [CurrencyConvertPipe],
})
export class CurrencyInputComponent implements OnInit {
  @Input({ required: true }) currencies!: Currency[];
  @Input() isPrimary: boolean = false;
  @Input() amount = 1;
  @Input() baseCurrencyCode: string = '';
  @Input() toCurrencyCode: string = '';

  @Output() currencyChange = new EventEmitter<CurrencyInputValue>();

  private currencyConvertPipe = inject(CurrencyConvertPipe);

  ngOnInit(): void {
    this.baseCurrencyCode = this.currencies[0].code;
    this.toCurrencyCode = this.currencies[0].code;
  }

  public async onAmountChanged(event: Event): Promise<void> {
    const amount = (event.target as HTMLInputElement).value;

    const numericValue = parseFloat(amount);
    if (!isNaN(numericValue)) {
      this.amount = numericValue;
      if (!this.isPrimary) {
        this.amount = await firstValueFrom(
          this.currencyConvertPipe.transform(
            this.amount,
            this.toCurrencyCode,
            this.baseCurrencyCode
          )
        );
      }
      this.onCurrencyChange(
        this.baseCurrencyCode,
        this.toCurrencyCode,
        this.amount
      );
    }
  }

  public async onCurrencyCodeChanged(event: Event): Promise<void> {
    const currencyCode = (event.target as HTMLInputElement).value;
    const currency = this.currencies.find(
      (currency) => currency.code === currencyCode
    );

    if (currency) {
      if (this.isPrimary) {
        this.baseCurrencyCode = currency.code;
      } else {
        this.toCurrencyCode = currency.code;
      }
      this.onCurrencyChange(
        this.baseCurrencyCode,
        this.toCurrencyCode,
        this.amount
      );
    }
  }

  private async onCurrencyChange(
    baseCurrencyCode: string,
    toCurrencyCode: string,
    amount: number
  ): Promise<void> {
    const convertedAmount = await firstValueFrom(
      this.currencyConvertPipe.transform(
        this.amount,
        this.toCurrencyCode,
        this.baseCurrencyCode
      ));
    const currencyInputValue: CurrencyInputValue = {
      amount,
      convertedAmount,
      toCurrencyCode,
      baseCurrencyCode,
    };
    this.currencyChange.emit(currencyInputValue);
  }
}
