import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo/logo-full.png";
import useQuery from "../../hooks/useQuery";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/AuthActions";

const LockScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const userKey = query.get("Authorization");

  useEffect(() => {
    if (userKey) {
      dispatch(loginAction(userKey, navigate));
    }
  }, [dispatch, navigate, userKey]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="authincation">
        <div className="container">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                        <Link to="/dashboard">
                          <img src={logo} alt="" />
                        </Link>
                      </div>
                      <h4 className="text-center mb-4">Account Locked</h4>
                      <form onSubmit={(e) => submitHandler(e)}>
                        <div className="mb-3">
                          <label>
                            <strong>Password</strong>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            defaultValue="Password"
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Unlock
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LockScreen;
