import { EventEmitter, OnChanges, AfterViewInit, SimpleChanges } from "@angular/core";
import { IMyCalendarYear } from "../../interfaces/my-calendar-year.interface";
import { IMyOptions } from "../../interfaces/my-options.interface";
import { ActiveView } from "../../enums/active-view.enum";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import * as i0 from "@angular/core";
export declare class YearViewComponent implements OnChanges, AfterViewInit {
    private utilService;
    opts: IMyOptions;
    years: Array<Array<IMyCalendarYear>>;
    viewChanged: boolean;
    yearCellClicked: EventEmitter<IMyCalendarYear>;
    yearCellKeyDown: EventEmitter<any>;
    viewActivated: EventEmitter<ActiveView>;
    constructor(utilService: UtilService);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    onYearCellClicked(event: any, cell: IMyCalendarYear): void;
    onYearCellKeyDown(event: any, cell: IMyCalendarYear): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<YearViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<YearViewComponent, "lib-year-view", never, { "opts": "opts"; "years": "years"; "viewChanged": "viewChanged"; }, { "yearCellClicked": "yearCellClicked"; "yearCellKeyDown": "yearCellKeyDown"; "viewActivated": "viewActivated"; }, never, never, false, never>;
}
