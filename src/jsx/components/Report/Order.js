import React from "react";
import { Link } from "react-router-dom";

const orderTable = [
  {
    email: "samantha@mail.com",
    title: "Samanta William",
    price: "$75,00",
    status: "Paid",
    statusChange: "success",
  },
  {
    email: "tony@gmail.com",
    title: "Tony Soap",
    price: "$80,00",
    status: "Unpaid",
    statusChange: "danger",
  },
  {
    email: "demo@mail.com",
    title: "Nela Vita",
    price: "$90,00",
    status: "Paid",
    statusChange: "success",
  },
  {
    email: "karen@mail.com",
    title: "Karen Hope",
    price: "$70,00",
    status: "Pending",
    statusChange: "warning",
  },
  {
    email: "nadia@mail.com",
    title: "Nadia Edja",
    price: "$76,00",
    status: "Unpaid",
    statusChange: "danger",
  },
  {
    email: "samantha@mail.com",
    title: "Samanta William",
    price: "$75,00",
    status: "Paid",
    statusChange: "success",
  },
  {
    email: "tony@gmail.com",
    title: "Tony Soap",
    price: "$80,00",
    status: "Unpaid",
    statusChange: "danger",
  },
  {
    email: "demo@mail.com",
    title: "Nela Vita",
    price: "$90,00",
    status: "Paid",
    statusChange: "success",
  },
  {
    email: "karen@mail.com",
    title: "Karen Hope",
    price: "$70,00",
    status: "Pending",
    statusChange: "warning",
  },
  {
    email: "nadia@mail.com",
    title: "Nadia Edja",
    price: "$76,00",
    status: "Unpaid",
    statusChange: "danger",
  },
];

const Order = () => {
  const checkboxFun = (type) => {
    setTimeout(() => {
      const checkbox = document.querySelectorAll(".order-history input");
      const motherCheckBox = document.querySelector(".sorting_asc input");
      for (let i = 0; i < checkbox.length; i++) {
        const element = checkbox[i];
        if (type === "all") {
          if (motherCheckBox.checked) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        } else {
          if (!element.checked) {
            motherCheckBox.checked = false;
            break;
          } else {
            motherCheckBox.checked = true;
          }
        }
      }
    }, 200);
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
                      <th className="">Order Time</th>
                      <th className="fs-14 font-w600">Side</th>
                      <th className="fs-14 font-w600 text-center">Price</th>
                      <th className="fs-14 font-w600 text-center">Volume</th>
                      <th className="fs-14 font-w600 text-center">Remaining volume</th>
                      <th className="fs-14 font-w600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderTable.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <span className="font-w600 fs-14">
                            09-09-2023 09:09:09
                          </span>
                        </td>
                        <td className="fs-14 font-w500">Buy</td>
                        <td className="text-center">{item.price}</td>
                        <td className="text-center">5</td>
                        <td className="text-center">3.5</td>
                        <td>
                          <span className={`label label-${item.statusChange}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-pagenation d-flex align-items-center justify-content-between">
                <p>
                  Showing <span> 1-10 </span> from <span> 50 </span> data{" "}
                </p>
                <nav>
                  <ul className="pagination pagination-gutter pagination-primary no-bg">
                    <li className="page-item page-indicator">
                      <Link to={"#"} className="page-link">
                        <i className="fa-solid fa-angle-left"></i>
                      </Link>
                    </li>
                    <li className="page-item ">
                      <Link to={"#"} className="page-link">
                        1
                      </Link>
                    </li>
                    <li className="page-item active">
                      <Link to={"#"} className="page-link">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link to={"#"} className="page-link">
                        3
                      </Link>
                    </li>
                    <li className="page-item page-indicator">
                      <Link to={"#"} className="page-link">
                        <i className="fa-solid fa-angle-right"></i>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Order;
