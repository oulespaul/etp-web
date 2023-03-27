/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { Tab } from "react-bootstrap";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import useSocket from "../../../hooks/useSocket";

import CoinChart from "./Coin/CoinChart";
import QuickTrade from "./Coin/QuickTrade";
import CoinBuyTable from "./Coin/CoinBuyTable";
import CoinSellTable from "./Coin/CoinSellTable";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const CoinDetails = ({ user }) => {
  const [startTime] = useState(dayjs().set("minute", 0).set("second", 0));
  const [endTime] = useState(dayjs().set("minute", 59).set("second", 59));
  const [orderbooks, sendWSMessage] = useSocket("orderBooks");
  const [sessions] = useSocket("sessions");
  const [marketSummaryData] = useSocket("marketSummary");
  const { t } = useTranslation();

  const orderbooksDeps = JSON.stringify(orderbooks);

  useEffect(() => {
    sendWSMessage("getSession", "hour");
    sendWSMessage("getMarketSummaryData", "hour");
    sendWSMessage("getOrderbook", {
      startTime: startTime.toString(),
      endTime: endTime.toString(),
    });
  }, []);

  const bid = useMemo(() => {
    return orderbooks
      .filter((order) => order.side === "buy")
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
  }, [orderbooksDeps]);

  const ask = useMemo(() => {
    return orderbooks
      .filter((order) => order.side === "sell")
      .sort((a, b) => a.price - b.price)
      .slice(0, 5);
  }, [orderbooksDeps]);

  const handleOrder = (order) => {
    if (!user.clientId) return;
    const isOrderBuy = order.side === "buy";
    const value = order.price * order.quantity;

    Swal.fire({
      title: "Order confirmation",
      html:
        `<div><h5>Price: ${order.price} Baht</h5>` +
        `<h5>Amount: ${order.quantity} kWh</h5>` +
        `<h5>Fee: ${value / 100} kWh</h5>` +
        `<h5>Total: ${value + value / 100} kWh</h5></div>`,
      showCancelButton: true,
      confirmButtonColor: isOrderBuy ? "#00A389" : "#EB5757",
      cancelButtonColor: "#A098AE",
      confirmButtonText: isOrderBuy ? "Buy" : "Sell",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        return sendWSMessage("sendOrder", {
          orderType: "limit",
          accountNo: user.clientId,
          ...order,
        });
      }

      return;
    });
  };

  return (
    <>
      <div className="row">
        <Tab.Container defaultActiveKey="bitcoin">
          <div className="col-xl-12">
            <Tab.Content>
              <Tab.Pane eventKey="bitcoin">
                <div className="row">
                  <div className="col-xl-12 col-xxl-12">
                    <CoinChart
                      startTime={startTime.format("HH:mm:ss")}
                      endTime={endTime.format("HH:mm:ss")}
                      sessions={sessions}
                      marketSummaryData={marketSummaryData}
                    />
                  </div>

                  <div className="col-xl-6 col-sm-6">
                    <QuickTrade handleOrder={handleOrder} />
                  </div>

                  <div className="col-xl-3 col-sm-6">
                    <CoinBuyTable bgChange="success" items={bid} />
                  </div>

                  <div className="col-xl-3 col-sm-6">
                    <CoinSellTable bgChangeSell="danger" items={ask} />
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.auth,
  };
};

export default connect(mapStateToProps)(CoinDetails);
