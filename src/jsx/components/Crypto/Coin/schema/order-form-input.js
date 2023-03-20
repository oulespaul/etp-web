import * as yup from "yup";

export const orderFormInputSchema = (t) => {
  return yup
    .object({
      price: yup
        .number()
        .typeError(t("exchange.orderForm.error.priceRequired"))
        .positive(t("exchange.orderForm.error.priceRequired"))
        .required()
        .test(
          "minimumIncrement",
          t("exchange.orderForm.error.priceStep"),
          (value) => value % 0.25 === 0
        ),
      quantity: yup
        .number()
        .typeError(t("exchange.orderForm.error.amountRequired"))
        .positive(t("exchange.orderForm.error.amountRequired"))
        .required()
        .test(
          "minimumIncrement",
          t("exchange.orderForm.error.amountStep"),
          (value) => value % 1 === 0
        )
        .positive()
        .required(),
      side: yup.string().oneOf(["buy", "sell"]),
      orderTime: yup.string(),
    })
    .required();
};
