import { ENGrid, Options } from "./";
export declare class App extends ENGrid {
    private _form;
    private _fees;
    private _amount;
    private _frequency;
    private options;
    private logger;
    constructor(options: Options);
    private run;
    private onLoad;
    private onResize;
    private onValidate;
    private onSubmit;
    private onError;
    setDataAttributes(): void;
    static log(message: string): void;
}
