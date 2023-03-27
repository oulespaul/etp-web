import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderFormInputSchema } from "./schema/order-form-input";
import { ArrowSideDownIcon } from "../../../../icons/material/arrow-side-down";
import { ArrowSideUpIcon } from "../../../../icons/material/arrow-side-up";
import { useTranslation } from "react-i18next";

const timeOptions = [...Array(24 + 1).keys()].slice(1).map((time) => {
  const label = dayjs()
    .add(time + 1, "hour")
    .set("minute", 0)
    .set("second", 0)
    .format("DD/MM/YYYY HH:mm:ss");
  return { label, value: time };
});

const QuickTrade = ({ handleOrder }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderFormInputSchema(t)),
    defaultValues: { orderTime: dayjs() },
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

  const onChangeScheduleTimeHandler = (value) => {
    const timeSelected = dayjs()
      .add(value.value, "hour")
      .set("minute", 0)
      .set("second", 0);

    setValue("orderTime", timeSelected);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card quick-trade">
        <div className="card-header pb-0 border-0 flex-wrap">
          <div className="d-flex w-100 justify-content-between">
            <h4 className="heading mb-0">{t("exchange.orderForm.title")}</h4>

            <div className="w-50">
              <Select
                onChange={onChangeScheduleTimeHandler}
                options={timeOptions}
                placeholder={t("exchange.orderForm.scheduleTitle")}
              />
            </div>
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
                <span className="input-group-text">
                  {t("exchange.orderForm.priceTitle")}
                </span>
                <input
                  className="form-control form-control text-end"
                  type="number"
                  placeholder={t("exchange.orderForm.pricePlaceholder")}
                  step="0.25"
                  {...register("price")}
                />
                <span className="input-group-text">
                  {t("exchange.orderForm.priceUnit")}
                </span>
              </div>
              {errors.price && (
                <p className="text-danger">{errors.price.message}</p>
              )}

              <div
                className={`input-group mb-3 ${
                  errors?.price && "input-danger"
                }`}
              >
                <span className="input-group-text">
                  {t("exchange.orderForm.amountTitle")}
                </span>
                <input
                  className="form-control form-control text-end"
                  type="number"
                  placeholder={t("exchange.orderForm.amountPlaceholder")}
                  step="1"
                  {...register("quantity")}
                />
                <span className="input-group-text">
                  {t("exchange.orderForm.amountUnit")}
                </span>
              </div>
              {errors.quantity && (
                <p className="text-danger">{errors.quantity.message}</p>
              )}

              <div className="input-group mb-3 ">
                <span className="input-group-text">
                  {t("exchange.orderForm.feeTitle")}
                </span>
                <input
                  className="form-control form-control text-end"
                  type="number"
                  placeholder="0.00"
                  value={quantityWatch * 0.25}
                  disabled
                />
                <span className="input-group-text">
                  {t("exchange.orderForm.priceUnit")}
                </span>
              </div>

              <div className="input-group mb-3 ">
                <span className="input-group-text">
                  {t("exchange.orderForm.totalTitle")}
                </span>
                <input
                  className="form-control form-control text-end"
                  type="number"
                  placeholder="0.00"
                  value={value + value / 100}
                  disabled
                />
                <span className="input-group-text">
                  {t("exchange.orderForm.priceUnit")}
                </span>
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
                {t("exchange.chartSection.buy")}
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
                {t("exchange.chartSection.sell")}
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
