import axios from "axios";
import { loginConfirmedAction, Logout } from "../store/actions/AuthActions";

axios.defaults.baseURL = process.env.REACT_APP_BE_URL + "/api";

export function signUp(email, password) {
  //axios call
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
    postData
  );
}

export function login(key) {
  return axios.post(`/user/login`, { key });
}

export function formatError(errorResponse) {
  switch (errorResponse.statusCode) {
    case 401:
      return "User key is invalid";
    default:
      return "";
  }
}

export function saveTokenInLocalStorage(key) {
  localStorage.setItem("userKey", key);
}

export function runLogoutTimer(dispatch, timer, navigate) {
  setTimeout(() => {
    dispatch(Logout(navigate));
  }, timer);
}

export function checkAutoLogin(dispatch, navigate) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    dispatch(Logout(navigate));
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  let expireDate = new Date(tokenDetails.expireDate);
  let todaysDate = new Date();

  if (todaysDate > expireDate) {
    dispatch(Logout(navigate));
    return;
  }

  dispatch(loginConfirmedAction(tokenDetails));

  const timer = expireDate.getTime() - todaysDate.getTime();
  runLogoutTimer(dispatch, timer, navigate);
}
