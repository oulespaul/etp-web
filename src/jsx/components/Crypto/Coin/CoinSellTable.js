import React from "react";

const CoinSellTable = ({ bgChangeSell, items }) => {
  if (!items) return <></>;

  return (
    <>
      <div className="card price-list">
        <div className="card-header border-0 pb-2">
          <div className="chart-title">
            <h4 className={`mb-0 text-${bgChangeSell}`}>Sell Order</h4>
          </div>
        </div>
        <div className="card-body p-3 py-0">
          <div className="table-responsive">
            <table
              className={`table text-center order-tbl bg-${bgChangeSell}-hover`}
            >
              <thead>
                <tr>
                  <th className="text-left">Price</th>
                  <th className="text-center">Amount</th>
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
export default CoinSellTable;
