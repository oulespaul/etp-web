import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

import LogoutPage from "./Logout";

import United from "../../../images/United.png";
import Thai from "../../../images/Thai.png";
import defaultAvatar from "../../../images/profile/default-avatar.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = ({ onNote }) => {
  const [rightSelect, setRightSelect] = useState("Eng");
  const [headerFix, setheaderFix] = useState(false);
  const { i18n, t } = useTranslation();

  const setLanguage = (language) => {
    i18n.changeLanguage(language);
    setRightSelect(language === "en" ? "Eng" : "ไทย");
  };

  useEffect(() => {
    const curLang = localStorage.getItem("lang") || "en";
    setLanguage(curLang);
  }, []);

  const changeLanguageHandler = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

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
                {t(`menu.${finalName}`)}
              </div>
            </div>
            <div className="navbar-nav header-right">
              <div className="dz-side-menu">
                <div className="search-coundry d-flex align-items-center">
                  <img
                    src={rightSelect === "Eng" ? United : Thai}
                    alt=""
                    className="mx-2 width20"
                  />
                  <Dropdown className="sidebar-dropdown me-2 mt-2">
                    <Dropdown.Toggle
                      as="div"
                      className="i-false sidebar-select"
                    >
                      {rightSelect}{" "}
                      <i className="fa-solid fa-angle-down ms-2" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => changeLanguageHandler("en")}
                      >
                        EN
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => changeLanguageHandler("th")}
                      >
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
                      <Link to="/profile" className="dropdown-item ai-icon">
                        <svg
                          id="icon-user1"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary me-1"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                        <span className="ms-2">{t("nav.menu.profile")}</span>
                      </Link>
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
