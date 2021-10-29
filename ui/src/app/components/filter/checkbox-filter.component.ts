import { Component, EventEmitter, Input } from '@angular/core';
import { ClrDatagridFilterInterface } from '@clr/angular';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: 'checkbox-filter.component.html',
})
export class CheckboxFilterComponent implements ClrDatagridFilterInterface<any> {
  // @ts-ignore
  @Input() public filterValues: string[];
  // @ts-ignore
  @Input() public filterKey: string;
  @Input() public selectedValues: { [value: string]: boolean } = {};

  public get selectedCount(): number {
    return Object.keys(this.selectedValues).reduce((selectedCount, key) => {
      return selectedCount + (this.selectedValues[key] ? 1 : 0);
    }, 0);
  }

  public changes: EventEmitter<any> = new EventEmitter<any>(false);

  public isActive(): boolean {
    return this.selectedCount > 0;
  }

  public accepts(item: any): boolean {
    return this.selectedCount === 0 || this.selectedValues[item[this.filterKey]];
  }

  public toggleCheckbox(value: string): void {
    this.changes.emit(true);
  }
}
