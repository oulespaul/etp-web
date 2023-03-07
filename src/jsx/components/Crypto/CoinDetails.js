import React, { useEffect, useMemo, useState } from "react";
import { Tab } from "react-bootstrap";
import dayjs from "dayjs";

import useSocket from "../../../hooks/useSocket";

import CoinChart from "./Coin/CoinChart";
import QuickTrade from "./Coin/QuickTrade";
import CoinBuyTable from "./Coin/CoinBuyTable";
import CoinSellTable from "./Coin/CoinSellTable";

const CoinDetails = () => {
  const [startTime, setStartTime] = useState(
    dayjs().set("minute", 0).set("second", 0)
  );
  const [endTime, setEndTime] = useState(
    dayjs().set("minute", 59).set("second", 59)
  );
  const { messages: orderbooks, sendMessage } = useSocket("orderBooks");

  useEffect(() => {
    sendMessage("getOrderbook", {
      startTime: startTime.toString(),
      endTime: endTime.toString(),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime.format("HH:mm:ss"), endTime.format("HH:mm:ss")]);

  const bid = useMemo(() => {
    return orderbooks
      .filter((order) => order.side === "buy")
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
  }, [orderbooks]);

  const ask = useMemo(() => {
    return orderbooks
      .filter((order) => order.side === "sell")
      .sort((a, b) => a.price - b.price)
      .slice(0, 5);
  }, [orderbooks]);

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
                    />
                  </div>

                  <div className="col-xl-6 col-sm-6">
                    <QuickTrade />
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
