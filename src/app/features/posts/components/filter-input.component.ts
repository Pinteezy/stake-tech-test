import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-input',
  template: `
    <div class="filter-container">
      <label for="filterInput">Filter by username</label>
      <input
        id="filterInput"
        type="text"
        [value]="value"
        (input)="onInput($event)"
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
        border-radius: 6px;
        max-width: 400px;
      }
    `,
  ],
})
export class FilterInputComponent {
  @Input() value!: string;
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
