import { EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { IMyMonth } from "../../interfaces/my-month.interface";
import { IMyOptions } from "../../interfaces/my-options.interface";
import * as i0 from "@angular/core";
export declare class SelectionBarComponent implements OnChanges {
    opts: IMyOptions;
    yearsDuration: string;
    visibleMonth: IMyMonth;
    selectMonth: boolean;
    selectYear: boolean;
    prevViewDisabled: boolean;
    nextViewDisabled: boolean;
    prevNavigateBtnClicked: EventEmitter<void>;
    nextNavigateBtnClicked: EventEmitter<void>;
    monthViewBtnClicked: EventEmitter<void>;
    yearViewBtnClicked: EventEmitter<void>;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    onPrevNavigateBtnClicked(event: any): void;
    onNextNavigateBtnClicked(event: any): void;
    onMonthViewBtnClicked(event: any): void;
    onYearViewBtnClicked(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectionBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectionBarComponent, "lib-selection-bar", never, { "opts": "opts"; "yearsDuration": "yearsDuration"; "visibleMonth": "visibleMonth"; "selectMonth": "selectMonth"; "selectYear": "selectYear"; "prevViewDisabled": "prevViewDisabled"; "nextViewDisabled": "nextViewDisabled"; }, { "prevNavigateBtnClicked": "prevNavigateBtnClicked"; "nextNavigateBtnClicked": "nextNavigateBtnClicked"; "monthViewBtnClicked": "monthViewBtnClicked"; "yearViewBtnClicked": "yearViewBtnClicked"; }, never, never, false, never>;
}
