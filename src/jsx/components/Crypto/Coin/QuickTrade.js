import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderFormInputSchema } from "./schema/order-form-input";
import { ArrowSideDownIcon } from "../../../../icons/material/arrow-side-down";
import { ArrowSideUpIcon } from "../../../../icons/material/arrow-side-up";

const QuickTrade = ({ handleOrder }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderFormInputSchema),
  });
  const priceWatch = watch("price");
  const quantityWatch = watch("quantity");

  const value = useMemo(() => {
    const valueCal = +priceWatch * +quantityWatch;
    if (isNaN(valueCal)) return 0;

    return valueCal;
  }, [priceWatch, quantityWatch]);

  const onSubmit = (data) => {
    handleOrder(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card quick-trade">
        <div className="card-header pb-0 border-0 flex-wrap">
          <div>
            <h4 className="heading mb-0">Trade</h4>
          </div>
        </div>

        <div className="card-body pb-0">
          <div className="basic-form">
            <div className="form-wrapper trade-form">
              <div
                className={`input-group mb-3 ${
                  errors?.price && "input-danger"
                }`}
              >
                <span className="input-group-text">Price</span>
                <input
                  className="form-control form-control text-end"
                  type="number"
                  placeholder="Range of price is 0.25"
                  step="0.25"
                  {...register("price")}
                />
              </div>
              {errors.price && (
                <p className="text-danger">{errors.price.message}</p>
              )}

              <div
                className={`input-group mb-3 ${
                  errors?.price && "input-danger"
                }`}
              >
                <span className="input-group-text">Amount</span>
                <input
                  className="form-control form-control text-end"
                  type="number"
                  placeholder="Range of amount is 1.00"
                  step="1"
                  {...register("quantity")}
                />
              </div>
              {errors.quantity && (
                <p className="text-danger">Amount is required</p>
              )}

              <div className="input-group mb-3 ">
                <span className="input-group-text">Fee (1%)</span>
                <input
                  className="form-control form-control text-end"
                  type="number"
                  placeholder="0.00"
                  value={value / 100}
                  disabled
                />
              </div>

              <div className="input-group mb-3 ">
                <span className="input-group-text">Total</span>
                <input
                  className="form-control form-control text-end"
                  type="number"
                  placeholder="0.00"
                  value={value + value / 100}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer border-0">
          <div className="row">
            <div className="col-6">
              <button
                className="btn d-flex  btn-success justify-content-between w-100"
                type="submit"
                name="orderType"
                value="buy"
                onClick={() => setValue("side", "buy")}
              >
                BUY
                <ArrowSideUpIcon />
              </button>
            </div>

            <div className="col-6">
              <button
                className="btn d-flex btn-danger justify-content-between w-100"
                type="submit"
                name="orderType"
                value="sell"
                onClick={() => setValue("side", "sell")}
              >
                SELL
                <ArrowSideDownIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default QuickTrade;
