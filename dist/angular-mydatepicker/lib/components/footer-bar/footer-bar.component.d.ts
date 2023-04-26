import { EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { IMyOptions } from "../../interfaces/my-options.interface";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import * as i0 from "@angular/core";
export declare class FooterBarComponent implements OnChanges {
    private utilService;
    opts: IMyOptions;
    footerBarTxtClicked: EventEmitter<void>;
    footerBarTxt: string;
    constructor(utilService: UtilService);
    ngOnChanges(changes: SimpleChanges): void;
    onFooterBarTxtClicked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FooterBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FooterBarComponent, "lib-footer-bar", never, { "opts": "opts"; }, { "footerBarTxtClicked": "footerBarTxtClicked"; }, never, never, false, never>;
}
