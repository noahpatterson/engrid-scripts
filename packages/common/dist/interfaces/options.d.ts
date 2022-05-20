export interface Options {
    backgroundImage?: string | string[];
    MediaAttribution?: boolean;
    applePay?: boolean;
    CapitalizeFields?: boolean;
    ClickToExpand?: boolean;
    CurrencySymbol?: string;
    AddCurrencySymbol?: boolean;
    CurrencySeparator?: string;
    ThousandsSeparator?: string;
    DecimalSeparator?: string;
    DecimalPlaces?: number;
    MinAmount?: number;
    MaxAmount?: number;
    MinAmountMessage?: string;
    MaxAmountMessage?: string;
    SkipToMainContentLink?: boolean;
    SrcDefer?: boolean;
    NeverBounceAPI?: string | null;
    NeverBounceDateField?: string | null;
    NeverBounceDateFormat?: string;
    NeverBounceStatusField?: string | null;
    ProgressBar?: boolean | null;
    AutoYear?: boolean;
    TranslateFields?: boolean;
    Debug?: boolean;
    RegionLongFormat?: string;
    RememberMe?: boolean | {
        remoteUrl?: string;
        cookieName?: string;
        cookieExpirationDays?: number;
        fieldNames?: string[];
        fieldDonationAmountRadioName?: string;
        fieldDonationAmountOtherName?: string;
        fieldDonationRecurrPayRadioName?: string;
        fieldDonationAmountOtherCheckboxID?: string;
        fieldOptInSelectorTarget?: string;
        fieldOptInSelectorTargetLocation?: string;
        fieldClearSelectorTarget?: string;
        fieldClearSelectorTargetLocation?: string;
        checked?: boolean;
    };
    TidyContact?: false | {
        cid?: number;
        record_field?: string;
        date_field?: string;
        status_field?: string;
        countries?: string[];
        address_fields?: {
            address1: string;
            address2: string;
            address3: string;
            city: string;
            region: string;
            postalCode: string;
            country: string;
        };
    };
    onLoad?: () => void;
    onResize?: () => void;
    onSubmit?: () => void;
    onError?: () => void;
    onValidate?: () => void;
}
export declare const OptionsDefaults: Options;
