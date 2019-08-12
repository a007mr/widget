import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { referralSignup, setLocalStorage } from '../../actions/referral';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import qs from 'query-string';
import PopupRef from '../popup/PopupRef';

const RegisterReferral = ({
  setAlert,
  referralSignup,
  setLocalStorage,
  location,
  referral: { isAuthenticatedRef, error, user },
  alert
}) => {
  const [popup, togglePopup] = useState(false);

  useEffect(() => {
    const url = qs.parse(location.search);

    if (url.referral) {
      const id = url.referral;
      setLocalStorage(id);
    }
  }, []);

  // const { email, showForm, showSuccess } = formData;

  return (
    <Fragment>
      <section id="signup">
        <div className="container">
          <Fragment>
            <button
              type="submit"
              className="btn btn-primary my-2 mxa block"
              onClick={() => togglePopup(!popup)}
            >
              {' '}
              Get Early Access
            </button>
          </Fragment>

          {popup && <PopupRef togglePopup={togglePopup} popup={popup} />}
        </div>
      </section>
    </Fragment>
  );
};

RegisterReferral.propTypes = {
  setAlert: PropTypes.func.isRequired,
  referralSignup: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticatedRef: PropTypes.bool
};

const mapStateToProps = state => ({
  referral: state.referral,
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { setAlert, referralSignup, setLocalStorage }
)(RegisterReferral);
