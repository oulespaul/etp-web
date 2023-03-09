import React, { lazy } from "react";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import "./index.css";
import "./chart.css";
import "./step.css";

import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

import ScrollToTop from "./layouts/ScrollToTop";
import Home from "./components/Dashboard/Home";
import CoinDetails from "./components/Crypto/CoinDetails";
import Order from "./components/Report/Order";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";

import LockScreen from "./pages/LockScreen";
import Error401 from "./pages/Error401";
import Error404 from "./pages/Error404";
import PrivateRoute from "./PrivateRoute";

const Login = lazy(() => import("./pages/Login"));

const Markup = () => {
  const allroutes = [
    { url: "dashboard", component: <Home /> },
    { url: "exchange", component: <CoinDetails /> },
    { url: "open-orders", component: <Order /> },
    { url: "invoice", component: <Invoice /> },
  ];

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/exchange" />} />

        <Route path="/exchanges" element={<LockScreen />} />
        <Route path="page-error-401" element={<Error401 />} />
        <Route path="page-error-404" element={<Error404 />} />

        {/* PrivateRoute */}
        <Route element={<MainLayout />}>
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={<PrivateRoute>{data.component}</PrivateRoute>}
            />
          ))}
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
      <ScrollToTop />
    </>
  );
};

function MainLayout() {
  return (
    <div id="main-wrapper" className="show menu-toggle">
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Markup;
