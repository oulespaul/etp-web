import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../store/selectors/AuthSelectors";

const PrivateRoute = ({ isAuthenticated, children }) => {
  const userKeyLS = localStorage.getItem("userKey");
  if (!isAuthenticated && !userKeyLS) {
    return <Navigate to="/page-error-401" replace />;
  }

  return <div>{children}</div>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default connect(mapStateToProps)(PrivateRoute);
