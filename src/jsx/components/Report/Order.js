import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import useAxios from "../../../hooks/useAxios";
import { formatDatetime } from "../../../utils/formatDatetime";
import { formatNumber } from "../../../utils/formatNumber";
import axios from "axios";

const getClassTextColor = (side) => {
  return side === "buy" ? "text-success" : "text-danger";
};

const Order = ({ user }) => {
  const { t } = useTranslation();
  const [orders, , , fetchOrder] = useAxios({
    url: `/order/${user.clientId}`,
    method: "GET",
  });

  const onCalcelSubmitHandler = (item) => {
    Swal.fire({
      title: "ต้องการยกเลิกรายการคำสั่ง ?",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        return axios
          .request({
            url: `/order/${item.order_id}`,
            method: "PATCH",
          })
          .then((res) => {
            if (res.data) {
              fetchOrder()
              toast.success("ยกเลิกรายการคำสั่งสำเร็จ", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          });
      }

      return;
    });
  };

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
                      <th className="fs-14 font-w600"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <span
                              className={`font-w600 fs-14 ${getClassTextColor(
                                item.side
                              )}`}
                            >
                              {formatDatetime(item.orderTime)}
                            </span>
                          </td>
                          <td
                            className={`fs-14 font-w500 ${getClassTextColor(
                              item.side
                            )}`}
                          >
                            {item.side === "buy" ? "Buy" : "Sell"}
                          </td>
                          <td
                            className={`text-center ${getClassTextColor(
                              item.side
                            )}`}
                          >
                            {formatNumber(item.price)}
                          </td>
                          <td
                            className={`text-center ${getClassTextColor(
                              item.side
                            )}`}
                          >
                            {formatNumber(item.quantity)}
                          </td>
                          <td
                            className={`text-center ${getClassTextColor(
                              item.side
                            )}`}
                          >
                            {formatNumber(item.remainingQuantity)}
                          </td>
                          <td>
                            <span className={`label label-warning`}>
                              {item.status}
                            </span>
                          </td>
                          <td className={`text-center`}>
                            <button
                              className="btn d-flex btn-danger px-4 py-1"
                              name="calcelOrderBtn"
                              onClick={() => onCalcelSubmitHandler(item)}
                            >
                              {t("openOrder.cancel")}
                            </button>
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
