import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import useAxios from "../../../hooks/useAxios";
import { formatDatetime } from "../../../utils/formatDatetime";
import { formatNumber } from "../../../utils/formatNumber";

const Order = ({ user }) => {
  const { t } = useTranslation();
  const [orders, , loading] = useAxios({
    url: `/order/${user.clientId}`,
    method: "GET",
  });

  return (
    <>
      <div className="row">
        <div className="col-xxl-12">
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
                      <th className="fs-14 font-w600 text-center">
                        {t("openOrder.field.remaingVolume")}
                      </th>
                      <th className="fs-14 font-w600">
                        {t("openOrder.field.status")}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <span className="font-w600 fs-14">
                              {formatDatetime(item.orderTime)}
                            </span>
                          </td>
                          <td className="fs-14 font-w500">
                            {item.side === "buy" ? "Buy" : "Sell"}
                          </td>
                          <td className="text-center">
                            {formatNumber(item.price)}
                          </td>
                          <td className="text-center">
                            {formatNumber(item.quantity)}
                          </td>
                          <td className="text-center">
                            {formatNumber(item.remainingQuantity)}
                          </td>
                          <td>
                            <span className={`label label-warning`}>
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

export default connect(mapStateToProps)(Order);
