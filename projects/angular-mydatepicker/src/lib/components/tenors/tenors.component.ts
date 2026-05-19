import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAngularMyDpOptions } from '../../interfaces/my-options.interface';
import { IMyDate } from '../../interfaces/my-date.interface';
// import { IMyBTNRow, IMyHolidayDates, IMyLabeledDates } from '../../interfaces/tenors.interface';

@Component({
    selector: 'lib-tenors',
    templateUrl: './tenors.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule]
})
export class TenorsComponent {

  @Input()
  opts: IAngularMyDpOptions;

  @Output()
  onSelectDate: EventEmitter<IMyDate> = new EventEmitter<IMyDate>();

  constructor() {
  }

  onBtnClicked(date: IMyDate):void {
    this.onSelectDate.emit(date);
  }

}


