import { IMyDate } from "./my-date.interface";
import { IMyMarkedDate } from "./my-marked-date.interface";
import {IMyLabeledDate} from "./my-labeled-date.interface";
import {IMyHolidayDate} from "./my-holiday-date.interface";

export interface IMyCalendarDay {
    dateObj: IMyDate;
    cmo: number;
    currDay: boolean;
    disabled: boolean;
    markedDate: IMyMarkedDate;
    labeledDate: IMyLabeledDate;
    holidayDate: IMyHolidayDate;
    highlight: boolean;
}