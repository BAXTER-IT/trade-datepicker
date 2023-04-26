import { EventEmitter, OnChanges, AfterViewInit, SimpleChanges } from "@angular/core";
import { IMyCalendarMonth } from "../../interfaces/my-calendar-month.interface";
import { IMyOptions } from "../../interfaces/my-options.interface";
import { ActiveView } from "../../enums/active-view.enum";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import * as i0 from "@angular/core";
export declare class MonthViewComponent implements OnChanges, AfterViewInit {
    private utilService;
    opts: IMyOptions;
    months: Array<Array<IMyCalendarMonth>>;
    viewChanged: boolean;
    monthCellClicked: EventEmitter<IMyCalendarMonth>;
    monthCellKeyDown: EventEmitter<any>;
    viewActivated: EventEmitter<ActiveView>;
    constructor(utilService: UtilService);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    onMonthCellClicked(event: any, cell: IMyCalendarMonth): void;
    onMonthCellKeyDown(event: any, cell: IMyCalendarMonth): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MonthViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MonthViewComponent, "lib-month-view", never, { "opts": "opts"; "months": "months"; "viewChanged": "viewChanged"; }, { "monthCellClicked": "monthCellClicked"; "monthCellKeyDown": "monthCellKeyDown"; "viewActivated": "viewActivated"; }, never, never, false, never>;
}
