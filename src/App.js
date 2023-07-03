import { Suspense } from "react";
import Index from "./jsx";

import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import "./i18n";
import { connect, useDispatch } from "react-redux";
import { loginAction } from "./store/actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userKeyLS = localStorage.getItem("userKey");

  if (!props.auth.auth.clientId && userKeyLS) {
    dispatch(loginAction(userKeyLS, navigate));
  }

  return (
    <>
      <Suspense>
        <Index />
      </Suspense>
      <ToastContainer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
