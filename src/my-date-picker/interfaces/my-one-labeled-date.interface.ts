import { IMyDate } from "./my-date.interface";

export interface IMyOneLabeledDate {
    date: IMyDate;
    style: string;
    code?: string;
    label: string;
    title: string;
}