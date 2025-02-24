// This class automatically select other radio input when an amount is entered into it.

import { EngridLogger, ENGrid, EnForm } from ".";

export class DataLayer {
  private logger: EngridLogger = new EngridLogger(
    "DataLayer",
    "#f1e5bc",
    "#009cdc",
    "📊"
  );
  private dataLayer = (window as any).dataLayer || [];
  private _form: EnForm = EnForm.getInstance();

  private excludedFields = [
    // Credit Card
    "transaction.ccnumber",
    "transaction.ccexpire.delimiter",
    "transaction.ccexpire",
    "transaction.ccvv",
    "supporter.creditCardHolderName",

    // Bank Account
    "supporter.bankAccountNumber",
    "supporter.bankAccountType",
    "transaction.bankname",
    "supporter.bankRoutingNumber",
  ];

  private hashedFields = [
    // Supporter Address, Phone Numbers, and Address
    "supporter.emailAddress",
    "supporter.phoneNumber",
    "supporter.phoneNumber2",
    "supporter.address1",
    "supporter.address2",
    "supporter.address3",

    // In Honor/Memory Inform Email and Address
    "transaction.infemail",
    "transaction.infadd1",
    "transaction.infadd2",
    "transaction.infadd3",

    // Billing Address
    "supporter.billingAddress1",
    "supporter.billingAddress2",
    "supporter.billingAddress3",
  ];

  constructor() {
    this.onLoad();
    this._form.onSubmit.subscribe(() => this.onSubmit());
  }

  private transformJSON(value: string) {
    if (typeof value === "string") {
      return value.toUpperCase().split(" ").join("-").replace(":-", "-");
    } else if (typeof value === "boolean") {
      value = value ? "TRUE" : "FALSE";
      return value;
    }

    return "";
  }

  private onLoad() {
    if (ENGrid.getGiftProcess()) {
      this.logger.log("EN_SUCCESSFUL_DONATION");
      this.dataLayer.push({
        event: "EN_SUCCESSFUL_DONATION",
      });
    } else {
      this.logger.log("EN_PAGE_VIEW");
      this.dataLayer.push({
        event: "EN_PAGE_VIEW",
      });
    }

    if (window.pageJson) {
      const pageJson = window.pageJson;

      for (const property in pageJson) {
        if (Number.isInteger(pageJson[property])) {
          this.dataLayer.push({
            event: `EN_PAGEJSON_${property.toUpperCase()}-${
              pageJson[property]
            }`,
          });

          this.dataLayer.push({
            [`'EN_PAGEJSON_${property.toUpperCase()}'`]: pageJson[property],
          });
        } else {
          this.dataLayer.push({
            event: `EN_PAGEJSON_${property.toUpperCase()}-${this.transformJSON(
              pageJson[property]
            )}`,
          });

          this.dataLayer.push({
            [`'EN_PAGEJSON_${property.toUpperCase()}'`]: this.transformJSON(
              pageJson[property]
            ),
          });
        }
      }

      if (ENGrid.getPageCount() === ENGrid.getPageNumber()) {
        this.dataLayer.push({
          event: "EN_SUBMISSION_SUCCESS_" + pageJson.pageType.toUpperCase(),
        });
        this.dataLayer.push({
          [`'EN_SUBMISSION_SUCCESS_${pageJson.pageType.toUpperCase()}'`]:
            "TRUE",
        });
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
      this.dataLayer.push({
        event: `EN_URLPARAM_${key.toUpperCase()}-${this.transformJSON(value)}`,
      });
      this.dataLayer.push({
        [`'EN_URLPARAM_${key.toUpperCase()}'`]: this.transformJSON(value),
      });
    });

    if (ENGrid.getPageType() === "DONATION") {
      const recurrFreqEls = document.querySelectorAll(
        '[name="transaction.recurrfreq"]'
      ) as NodeListOf<HTMLInputElement>;

      const recurrValues = [...recurrFreqEls].map((el) => el.value);

      this.dataLayer.push({
        event: "EN_RECURRING_FREQUENCIES",
        [`'EN_RECURRING_FREQEUENCIES'`]: recurrValues,
      });
    }

    this.attachEventListeners();
  }

  private onSubmit() {
    const optIn = document.querySelector(
      ".en__field__item:not(.en__field--question) input[name^='supporter.questions'][type='checkbox']:checked"
    );
    if (optIn) {
      this.logger.log("EN_SUBMISSION_WITH_EMAIL_OPTIN");
      this.dataLayer.push({
        event: "EN_SUBMISSION_WITH_EMAIL_OPTIN",
      });
    } else {
      this.logger.log("EN_SUBMISSION_WITHOUT_EMAIL_OPTIN");
      this.dataLayer.push({
        event: "EN_SUBMISSION_WITHOUT_EMAIL_OPTIN",
      });
    }
  }

  private attachEventListeners() {
    const textInputs = document.querySelectorAll(
      ".en__component--advrow input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]):not([type=hidden]):not([unhidden]), .en__component--advrow textarea"
    ) as NodeListOf<HTMLInputElement>;

    textInputs.forEach((el) => {
      el.addEventListener("blur", (e) => {
        this.handleFieldValueChange(e.target as HTMLInputElement);
      });
    });

    const radioAndCheckboxInputs = document.querySelectorAll(
      ".en__component--advrow input[type=checkbox], .en__component--advrow input[type=radio]"
    ) as NodeListOf<HTMLInputElement>;

    radioAndCheckboxInputs.forEach((el) => {
      el.addEventListener("change", (e) => {
        this.handleFieldValueChange(e.target as HTMLInputElement);
      });
    });

    const selectInputs = document.querySelectorAll(
      ".en__component--advrow select"
    ) as NodeListOf<HTMLInputElement>;

    selectInputs.forEach((el) => {
      el.addEventListener("change", (e) => {
        this.handleFieldValueChange(e.target as HTMLInputElement);
      });
    });
  }

  private handleFieldValueChange(el: HTMLInputElement | HTMLSelectElement) {
    if (el.value === "" || this.excludedFields.includes(el.name)) return;

    const value = this.hashedFields.includes(el.name)
      ? this.hash(el.value)
      : el.value;

    if (["checkbox", "radio"].includes(el.type)) {
      if ((el as HTMLInputElement).checked) {
        if (el.name === "en__pg") {
          //Premium gift handling
          this.dataLayer.push({
            event: "EN_FORM_VALUE_UPDATED",
            enFieldName: el.name,
            enFieldLabel: "Premium Gift",
            enFieldValue: el
              .closest(".en__pg__body")
              ?.querySelector(".en__pg__name")?.textContent,
            enProductId: (
              document.querySelector(
                '[name="transaction.selprodvariantid"]'
              ) as HTMLInputElement
            )?.value,
          });
        } else {
          this.dataLayer.push({
            event: "EN_FORM_VALUE_UPDATED",
            enFieldName: el.name,
            enFieldLabel: this.getFieldLabel(el),
            enFieldValue: value,
          });
        }
      }
      return;
    }

    this.dataLayer.push({
      event: "EN_FORM_VALUE_UPDATED",
      enFieldName: el.name,
      enFieldLabel: this.getFieldLabel(el),
      enFieldValue: value,
    });
  }

  private hash(value: string): string {
    return btoa(value);
  }

  private getFieldLabel(
    el: HTMLInputElement | HTMLSelectElement
  ): string | null {
    return el.closest(".en__field")?.querySelector("label")?.textContent || "";
  }
}
