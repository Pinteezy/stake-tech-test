import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filter-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filter-container">
      <label for="filterInput">Filter by username</label>
      <input
        id="filterInput"
        type="text"
        [formControl]="inputControl"
        placeholder="e.g. Bret"
        class="filter-input"
      />
    </div>
  `,
  styles: [
    `
      .filter-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
      }

      .filter-input {
        padding: 10px;
        max-width: 400px;
      }
    `,
  ],
})
export class FilterInputComponent implements OnInit, OnDestroy {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  readonly inputControl = new FormControl('');
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.inputControl.setValue(this.value, { emitEvent: false });

    this.inputControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((val) => this.valueChange.emit(val ?? ''));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
