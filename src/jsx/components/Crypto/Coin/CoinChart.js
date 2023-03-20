import React, { useMemo } from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { formatNumber } from "../../../../utils/formatNumber";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const BitCoinChart = loadable(() => pMinDelay(import("./BitCoinChart"), 1000));

const transformData = (sessions) => {
  return sessions.map((session) => {
    return {
      x: dayjs(session.tradeTime).add(7, "hour"),
      y: [
        Number(session.openPrice),
        Number(session.highPrice),
        Number(session.lowPrice),
        Number(session.closePrice),
      ],
    };
  });
};

const CoinChart = ({ startTime, endTime, sessions, marketSummaryData }) => {
  const { t } = useTranslation();
  const series = useMemo(() => {
    return [{ data: transformData(sessions) }];
  }, [sessions]);

  const summaryData = useMemo(() => {
    return marketSummaryData[0];
  }, [marketSummaryData]);

  return (
    <>
      <div className="card coin-content">
        <div className="card-header border-0 flex-wrap">
          <h4 className="heading m-0">{t("exchange.chartSection.title")}</h4>
          <span className="fs-16">
            {t("exchange.tradeTime")}: {startTime} - {endTime}
          </span>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="price-content">
                <span className="fs-18 d-block mb-2">
                  {t("exchange.chartSection.lastPrice")}
                </span>
                <h4 className="fs-20 font-w600">
                  {formatNumber(summaryData?.lastPrice)}฿
                </h4>
              </div>
              <div className="price-content">
                <span className="fs-14 d-block mb-2">
                  {t("exchange.chartSection.value")}
                </span>
                <h4 className="font-w600 font-w600">
                  {formatNumber(summaryData?.value)}฿
                </h4>
              </div>
              <div className="price-content">
                <span className="fs-14 d-block mb-2">
                  {t("exchange.chartSection.volume")}
                </span>
                <h4 className="font-w600">
                  {formatNumber(summaryData?.sumQuantity)}
                </h4>
              </div>
              <div className="price-content">
                <span className="fs-14 d-block mb-2">
                  {t("exchange.chartSection.avaragePrice")}
                </span>
                <h4 className="font-w600">
                  {formatNumber(summaryData?.avgPrice)}฿
                </h4>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <h4 className="me-5 font-w600 mb-0">
                <span className="text-success me-2">
                  {t("exchange.chartSection.buy")}
                </span>{" "}
                {formatNumber(summaryData?.buyQuantity)} Kwh
              </h4>
              <h4 className="font-w600 mb-0">
                <span className="text-danger me-2">
                  {t("exchange.chartSection.sell")}
                </span>{" "}
                {formatNumber(summaryData?.sellQuantity)} Kwh
              </h4>
            </div>
          </div>
          <BitCoinChart series={series} />
        </div>
      </div>
    </>
  );
};
export default CoinChart;
