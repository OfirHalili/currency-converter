import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrencyExchangeComponent } from "../../projects/features/src/lib/currency/currency-exchange.component";

@Component({
  selector: 'app-root',
  imports: [CurrencyExchangeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'currency-converter';
}
