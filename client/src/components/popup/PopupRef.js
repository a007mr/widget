import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { referralSignup, setLocalStorage } from '../../actions/referral';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import qs from 'query-string';

const PopupRef = ({
  setAlert,
  togglePopup,
  popup,
  referralSignup,
  referral: { isAuthenticatedRef, error, user },
  alert
}) => {
  const [formData, setFormData] = useState({
    email: '',
    // showPopup: true,
    showForm: true,
    showSuccess: false
  });

  const { email, showForm, showSuccess } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const referral = localStorage.getItem('faff-ref');

      const res = await referralSignup({ email, referral });

      // Async and await to get response and if there is no errors than change state
      if (!res) {
        setFormData({ ...formData, showForm: false, showSuccess: true });
      }
    } catch (error) {
      return;
    }
  };

  return (
    <Fragment>
      {/* {showPopup && ( */}
      <div className="modal">
        <div className="modal-content">
          {showForm && (
            <Fragment>
              {/* <div className="popup\_inner"> */}
              <div className="modal-header pt-3 pb-3 px-4">
                <button
                  className="modal-close"
                  // onClick={setFormData({ ...formData, showPopup: false })}
                  onClick={togglePopup(!popup)}
                >
                  &times;
                </button>
                <h2>Early Access</h2>
              </div>

              <div className="modal-body px-4">
                <p className="lead pb-3">Get Early Access</p>
                <div className="form form-detail">
                  <form onSubmit={e => onSubmit(e)}>
                    <div className="field_email field">
                      <input
                        type="email"
                        className="email"
                        placeholder="Company Email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                      />
                    </div>

                    <div className="form_button">
                      <button type="submit" className="btn btn-form mt-2">
                        {' '}
                        Get Access
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* </div> */}
            </Fragment>
          )}

          {showSuccess && (
            <div>
              {!user ? (
                <Spinner />
              ) : (
                <Fragment>
                  <div className="modal-header pt-3 px-4 text-center">
                    <span
                      className="modal-close"
                      // onClick={setFormData({ ...formData, showPopup: false })}
                    >
                      &times;
                    </span>
                    <h5>Thank you for signing up to use Focus</h5>
                    <p className="pt-1">
                      Share the link below to move up the waitlist! Your spot in
                      line:{' '}
                    </p>
                  </div>
                  <div className="modal-body px-4 text-center">
                    <p className="py-1">
                      <span className="blue fs4 bold">{user.rating}</span>{' '}
                    </p>
                    <p className="py-1">
                      Your link:{' '}
                      <span className="card-body block py-1 px-2 my-1 fs2 blue">
                        {user.link}
                      </span>{' '}
                    </p>
                    <p className="pb-3 fs1_4">
                      We're sending invites daily. Move up in line by sharing
                      this link on social media!
                    </p>
                  </div>
                </Fragment>
              )}
            </div>
            // </div>
          )}
        </div>
      </div>
      {/* )} */}
    </Fragment>
  );
};

PopupRef.propTypes = {
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
)(PopupRef);
