import { Injectable } from '@angular/core';
import { createStore, Store, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { sessionStorageStrategy } from '@ngneat/elf-persist-state';
import { Observable } from 'rxjs';
import { select } from '@ngneat/elf';
import { CurrencyInputValue } from '../../../../utils/src/public-api';

export type CurrencyHistoryItem = CurrencyInputValue & { timestamp: Date };

type CurrencyHistoryState = {
  history: CurrencyHistoryItem[];
};

const store = createStore(
  { name: 'currency-history' },
  withProps<CurrencyHistoryState>({ history: [] })
);

persistState(store, {
  key: 'currency-history',
  storage: sessionStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class CurrencyHistoryStore {
  public getHistory$(): Observable<CurrencyHistoryItem[]> {
    return store.pipe(select((state) => state.history));
  }

  public addToHistory(item: CurrencyHistoryItem): void {
    const current = this.getHistory();
    debugger;
    store.update((state) => ({
      ...state,
      history: [item, ...current],
    }));
  }

  public clearHistory(): void {
    store.update((state) => ({
      ...state,
      history: [],
    }));
  }

  private getHistory(): CurrencyHistoryItem[] {
    return store.getValue().history;
  }
}
