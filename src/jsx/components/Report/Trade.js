import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import { formatDatetime } from "../../../utils/formatDatetime";
import { formatNumber } from "../../../utils/formatNumber";

import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

const getClassTextColor = (side) => {
  return side === "buy" ? "text-success" : "text-danger";
};

const now = new Date();
const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

const Trade = ({ user }) => {
  const { t } = useTranslation();

  const options = [
    { value: "ALL", label: t("tradeHistory.siteOptions.all") },
    { value: 1, label: t("tradeHistory.siteOptions.local") },
    { value: 0, label: t("tradeHistory.siteOptions.global") },
  ];
  const [siteFilter, setSiteFilter] = useState(options[0]);
  const [dateRangeFilter, setDateRangeFilter] = useState({
    startDate: nowDate,
    endDate: nowDate,
  });
  const [trades] = useAxios({
    url: `/trade/${user.clientId}`,
    method: "GET",
  });

  function filterByDateRange(array, startDate, endDate) {
    return array.filter((item) => {
      const itemDate = new Date(item.tradeTime);
      const targetDate = new Date(
        itemDate.getFullYear(),
        itemDate.getMonth(),
        itemDate.getDate()
      );
      return targetDate >= startDate && targetDate <= endDate;
    });
  }

  const tradeHistoryList = useMemo(() => {
    const isLocal = siteFilter.value;

    if (trades) {
      const dateFiltered = filterByDateRange(
        trades,
        dateRangeFilter.startDate,
        dateRangeFilter.endDate
      );

      if (isLocal === "ALL") return dateFiltered;

      return dateFiltered.filter((trade) => trade.isLocal === Boolean(isLocal));
    }

    return [];
  }, [siteFilter.value, trades, dateRangeFilter]);

  const onDateFilterChangeHandler = (event, picker) => {
    setDateRangeFilter({
      startDate: picker.startDate.toDate(),
      endDate: picker.endDate.toDate(),
    });
  };

  const renderSiteFilter = () => {
    return (
      <div className="d-flex flex-wrap justify-content-end">
        <div className="d-flex w-25">
          <DateRangePicker onApply={onDateFilterChangeHandler}>
            <input
              type="text"
              className="form-control input-daterange-timepicker"
            />
          </DateRangePicker>
        </div>

        <Select
          options={options}
          defaultValue={siteFilter}
          className="custom-react-select ms-4 me-2"
          onChange={(val) => setSiteFilter(val)}
        />
      </div>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-xxl-12">
          <div className="pb-4">{renderSiteFilter()}</div>
          <div className="card">
            <div className="card-body px-0 pt-0">
              <div className="table-responsive">
                <table
                  className="order-history table shadow-hover tickettable display mb-4 no-footer"
                  id="example6"
                >
                  <thead>
                    <tr>
                      <th className="">{t("openOrder.field.orderTime")}</th>
                      <th className="fs-14 font-w600">
                        {t("openOrder.field.side")}
                      </th>
                      <th className="fs-14 font-w600 text-center">
                        {t("openOrder.field.price")}
                      </th>
                      <th className="fs-14 font-w600 text-center">
                        {t("openOrder.field.volume")}
                      </th>
                      <th className="fs-14 font-w600 text-center">การจับคู่</th>
                      <th className="fs-14 font-w600">
                        {t("openOrder.field.status")}
                      </th>
                      <th className="fs-14 font-w600"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {tradeHistoryList.length > 0 ? (
                      tradeHistoryList.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <span
                              className={`font-w600 fs-14 ${getClassTextColor(
                                item.incomingOrderSide
                              )}`}
                            >
                              {formatDatetime(item.tradeTime)}
                            </span>
                          </td>
                          <td
                            className={`fs-14 font-w500 ${getClassTextColor(
                              item.incomingOrderSide
                            )}`}
                          >
                            {item.incomingOrderSide === "buy" ? "Buy" : "Sell"}
                          </td>
                          <td
                            className={`text-center ${getClassTextColor(
                              item.incomingOrderSide
                            )}`}
                          >
                            {formatNumber(item.price)}
                          </td>
                          <td
                            className={`text-center ${getClassTextColor(
                              item.incomingOrderSide
                            )}`}
                          >
                            {formatNumber(item.quantity)}
                          </td>
                          <td
                            className={`text-center ${getClassTextColor(
                              item.incomingOrderSide
                            )}`}
                          >
                            <span
                              className={`label ${
                                item.isLocal ? "label-info" : "label-warning"
                              }`}
                            >
                              {item.isLocal ? "Local" : "Global"}
                            </span>
                          </td>
                          <td>
                            <span className={`label label-success`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          <h5>{t("openOrder.orderNotfound")}</h5>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.auth,
  };
};

export default connect(mapStateToProps)(Trade);
