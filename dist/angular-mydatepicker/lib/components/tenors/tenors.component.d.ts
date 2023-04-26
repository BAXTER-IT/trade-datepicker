import { EventEmitter } from '@angular/core';
import { IAngularMyDpOptions } from '../../interfaces/my-options.interface';
import { IMyDate } from '../../interfaces/my-date.interface';
import * as i0 from "@angular/core";
export declare class TenorsComponent {
    opts: IAngularMyDpOptions;
    onSelectDate: EventEmitter<IMyDate>;
    constructor();
    onBtnClicked(date: IMyDate): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TenorsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TenorsComponent, "lib-tenors", never, { "opts": "opts"; }, { "onSelectDate": "onSelectDate"; }, never, never, false, never>;
}
