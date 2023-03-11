import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../images/logo/logo-color.png";
import bg6 from "../../images/background/bg6.jpg";
import useQuery from "../../hooks/useQuery";
import { loginAction } from "../../store/actions/AuthActions";

function Login(props) {
  const [heartActive, setHeartActive] = useState(true);
  const [userManualKey, setUserManualKey] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const userKey = query.get("Authorization");

  useEffect(() => {
    if (userKey) {
      dispatch(loginAction(userKey, navigate));
    }
  }, [dispatch, navigate, userKey]);

  function onLogin(e) {
    e.preventDefault();

    dispatch(loginAction(userManualKey, navigate));
  }

  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix overflow-hidden"
          style={{ background: "#fff url(" + bg6 + ")", height: "100vh" }}
        >
          <div className="row gx-0">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 vh-100 bg-white ">
              <div
                id="mCSB_1"
                className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
                style={{ maxHeight: "653px" }}
              >
                <div
                  id="mCSB_1_container"
                  className="mCSB_container"
                  style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                    dir: "ltr",
                  }}
                >
                  <div className="login-form style-2">
                    <div className="card-body">
                      <div className="logo-header d-flex align-items-center">
                        <Link to={"#"} className="logo">
                          <img
                            src={logo}
                            alt=""
                            className="width-80 mCS_img_loaded"
                          />
                        </Link>
                        <span style={{ marginLeft: 14 }}>
                          <h3>Energy Trading</h3>
                        </span>
                      </div>
                      <div className="nav nav-tabs border-bottom-0">
                        <div className="tab-content w-100" id="nav-tabContent">
                          <div
                            className="tab-pane fade active show"
                            id="nav-personal"
                          >
                            <form className=" dz-form pb-3" onSubmit={onLogin}>
                              <h3 className="form-title m-t0">
                                Client Infomation
                              </h3>
                              <div className="dz-separator-outer m-b5">
                                <div className="dz-separator bg-primary style-liner"></div>
                              </div>
                              <div className="form-group mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={userManualKey}
                                  placeholder="Enter User key"
                                  onChange={(e) =>
                                    setUserManualKey(e.target.value)
                                  }
                                />
                                {props.errorMessage && (
                                  <div className="text-danger fs-12">
                                    {props.errorMessage}
                                  </div>
                                )}
                              </div>

                              <div className="d-flex justify-content-end">
                                <button
                                  type="submit"
                                  className="btn btn-primary dz-xs-flex m-r5"
                                  disabled={!userManualKey}
                                >
                                  login
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer">
                      <div className=" bottom-footer clearfix m-t10 m-b20 row text-center">
                        <div className="col-lg-12 text-center">
                          <span>
                            {" "}
                            © Copyright by{" "}
                            <span
                              className={`heart ${
                                heartActive ? "" : "heart-blast"
                              }`}
                              onClick={() => setHeartActive(!heartActive)}
                            ></span>
                            <a href="#" target="_blank">
                              Energy Trade Platform (ETP)
                            </a>{" "}
                            All rights reserved.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Login);
