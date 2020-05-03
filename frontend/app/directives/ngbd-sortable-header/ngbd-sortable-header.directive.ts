import { Directive, EventEmitter, Input, Output } from '@angular/core';

import { Catalog } from 'frontend/app/models/catalog';

export type SortColumn = keyof Catalog | '';
export type SortDirection = 'asc' | 'desc' | '';
export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeaderDirective {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

}
