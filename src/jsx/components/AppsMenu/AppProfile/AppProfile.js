import React, { Fragment } from "react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import defaultAvatar from "../../../../images/profile/default-avatar.png";
import { connect } from "react-redux";

const AppProfile = ({ user }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={defaultAvatar}
                    className="img-fluid rounded-circle bg-white"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">{user.stationName}</h4>
                    <p>Station name</p>
                  </div>
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-muted mb-0">{user.station}</h4>
                    <p>Station type</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{user.clientId}</h4>
                    <p>Client id</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.auth,
  };
};

export default connect(mapStateToProps)(AppProfile);
