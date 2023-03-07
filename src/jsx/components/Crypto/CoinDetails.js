/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { Tab } from "react-bootstrap";
import dayjs from "dayjs";

import useSocket from "../../../hooks/useSocket";

import CoinChart from "./Coin/CoinChart";
import QuickTrade from "./Coin/QuickTrade";
import CoinBuyTable from "./Coin/CoinBuyTable";
import CoinSellTable from "./Coin/CoinSellTable";

const CoinDetails = () => {
  const [startTime] = useState(dayjs().set("minute", 0).set("second", 0));
  const [endTime] = useState(dayjs().set("minute", 59).set("second", 59));
  const [orderbooks, sendWSMessage] = useSocket("orderBooks");
  const [sessions] = useSocket("sessions");
  const [marketSummaryData] = useSocket("marketSummary");

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
    sendWSMessage("sendOrder", {
      orderType: "limit",
      accountNo: "10050201", // Binding user id when authed
      ...order,
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

export default CoinDetails;
