import * as yup from "yup";

export const orderFormInputSchema = yup
  .object({
    price: yup
      .number()
      .typeError("Price is required a number")
      .positive("Price must be a positive number")
      .required()
      .test(
        "minimumIncrement",
        "Range of price is not 0.25",
        (value) => value % 0.25 === 0
      ),
    quantity: yup
      .number()
      .typeError("Amount is required a number")
      .positive("Amount must be a positive number")
      .required()
      .test(
        "minimumIncrement",
        "Range of amount is not 1",
        (value) => value % 1 === 0
      )
      .positive()
      .required(),
    side: yup.string().oneOf(["buy", "sell"]),
  })
  .required();
