import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="pagination">
      <button
        mat-raised-button
        (click)="prev.emit()"
        [disabled]="currentPage === 0"
      >
        Previous
      </button>

      <span class="page-indicator">
        Page {{ currentPage + 1 }} / {{ totalPages }}
      </span>

      <button
        mat-raised-button
        (click)="next.emit()"
        [disabled]="currentPage + 1 >= totalPages"
      >
        Next
      </button>
    </div>
  `,
  styles: [
    `
      .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;

  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
