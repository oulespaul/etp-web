import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

import LogoutPage from "./Logout";

import United from "../../../images/United.png";
import defaultAvatar from "../../../images/profile/default-avatar.png";

const Header = ({ onNote }) => {
  const [rightSelect, setRightSelect] = useState("Eng");
  const [headerFix, setheaderFix] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);

  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName;

  return (
    <div className={`header ${headerFix ? "is-fixed" : ""}`}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div
                className="dashboard_bar"
                style={{ textTransform: "capitalize" }}
              >
                {finalName.join(" ").length === 0
                  ? "Dashboard"
                  : finalName.join(" ") === "dashboard dark"
                  ? "Dashboard"
                  : finalName.join(" ")}
              </div>
            </div>
            <div className="navbar-nav header-right">
              <div className="dz-side-menu">
                <div className="search-coundry d-flex align-items-center">
                  <img src={United} alt="" className="mx-2" />
                  <Dropdown className="sidebar-dropdown me-2 mt-2">
                    <Dropdown.Toggle
                      as="div"
                      className="i-false sidebar-select"
                    >
                      {rightSelect}{" "}
                      <i className="fa-solid fa-angle-down ms-2" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setRightSelect("EN")}>
                        EN
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setRightSelect("TH")}>
                        TH
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <ul>
                  <Dropdown
                    as="li"
                    className="nav-item dropdown header-profile"
                  >
                    <Dropdown.Toggle
                      variant=""
                      as="a"
                      className="nav-link i-false c-pointer"
                    >
                      <img src={defaultAvatar} width={20} alt="" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      align="right"
                      className="dropdown-menu dropdown-menu-end"
                    >
                      <LogoutPage />
                    </Dropdown.Menu>
                  </Dropdown>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
