import React from "react";
import { useTranslation } from "react-i18next";

const CoinBuyTable = ({ bgChange, items }) => {
  const { t } = useTranslation();
  if (!items) return <></>;

  return (
    <>
      <div className="card price-list">
        <div className="card-header border-0 pb-2">
          <div className="chart-title">
            <h4 className={`mb-0 text-${bgChange}`}>
              {t("exchange.orderbooks.title.buy")}
            </h4>
          </div>
        </div>
        <div className="card-body p-3 py-0">
          <div className="table-responsive">
            <table
              className={`table text-center order-tbl bg-${bgChange}-hover`}
            >
              <thead>
                <tr>
                  <th className="text-left">
                    {t("exchange.orderbooks.priceTitle")}
                  </th>
                  <th className="text-center">
                    {t("exchange.orderbooks.amountTitle")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="text-left">{item.price}</td>
                    <td>{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoinBuyTable;
