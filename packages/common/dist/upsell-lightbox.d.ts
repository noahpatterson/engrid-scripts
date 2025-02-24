import { ProcessingFees } from "./";
import { DonationAmount } from "./events";
export declare class UpsellLightbox {
    private options;
    private overlay;
    private _form;
    _amount: DonationAmount;
    _fees: ProcessingFees;
    private _frequency;
    private logger;
    constructor();
    private renderLightbox;
    private shouldRun;
    private shouldSkip;
    private popupOtherField;
    private liveAmounts;
    private getUpsellAmount;
    private shouldOpen;
    private open;
    private setOriginalAmount;
    private continue;
    private close;
    private getAmountTxt;
    private checkOtherAmount;
}
