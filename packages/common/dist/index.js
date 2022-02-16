document
    .getElementsByTagName("body")[0]
    .setAttribute("data-engrid-scripts-js-loading", "started");
document
    .getElementsByTagName("body")[0]
    .setAttribute("data-engrid-client-js-loading", "waiting");
export * from "./deprecated"; // Runs first so it can change the DOM markup before any markup dependent code fires
export { OptionsDefaults } from "./interfaces/options";
export { UpsellOptionsDefaults, } from "./interfaces/upsell-options";
export { TranslateOptionsDefaults, } from "./interfaces/translate-options";
export * from "./loader";
export * from "./app";
export * from "./amount-label";
export * from "./engrid";
export * from "./apple-pay";
export * from "./capitalize-fields";
export * from "./credit-card-numbers";
export * from "./auto-year";
export * from "./autocomplete";
export * from "./ecard";
export * from "./click-to-expand";
import * as legacy_1 from "./custom-methods";
export { legacy_1 as legacy };
export * from "./iframe";
export * from "./media-attribution";
export * from "./live-variables";
export * from "./upsell-lightbox";
export * from "./show-hide-radio-checkboxes";
export * from "./translate-fields";
export * from "./simple-country-select";
export * from "./skip-link";
export * from "./src-defer";
export * from "./set-recurr-freq";
export * from "./page-background";
export * from "./neverbounce";
export * from "./progress-bar";
export * from "./remember-me";
export * from "./show-if-amount";
export * from "./other-amount";
export * from "./logger";
export * from "./min-max-amount";
// Events
export * from "./events";
document
    .getElementsByTagName("body")[0]
    .setAttribute("data-engrid-scripts-js-loading", "finished");
