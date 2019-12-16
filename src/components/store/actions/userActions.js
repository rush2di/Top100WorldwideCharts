import { auth, dp } from "../../../configs/firebase/config";

// User signing up action creators

const userSignUpStart = () => ({ type: "SIGNUP_SUCCESS" });
const userSignUpSuccess = () => ({ type: "SIGNUP_SUCCESS" });
const userSignUpError = err => ({ type: "SIGNUP_ERROR", err });

export const userSignup = (username, email, password) => {
  return dispatch => {
    dispatch(userSignUpStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        dp.collection("users")
          .doc(cred.user.uid)
          .set({ id: cred.user.uid, username, likedTracks: [] })
          .then(() => {
            dispatch(userSignUpSuccess());
          });
      })
      .catch(err => {
        return dispatch(userSignUpError(err.message));
      });
  };
};

// user loging out action creators

const userlogOutStart = () => ({ type: "LOGOUT_START" });
const userlogOutSuccess = () => ({ type: "LOGOUT_SUCCESS" });
const userlogOutError = err => ({ type: "LOGOUT_ERROR", err });

export const userLogout = () => {
  return dispatch => {
    dispatch(userlogOutStart());
    auth
      .signOut()
      .then(() => {
        dispatch(userlogOutSuccess());
      })
      .catch(err => {
        dispatch(userlogOutError(err.message));
      });
  };
};

// add new saved tracks to user doc in firestore

const userUpdate = newfavs => ({ type: "USER_UPDATE_START", newfavs });
const userUpdateSuccess = () => ({ type: "USER_UPDATE_SUCCESS" });
const userUpdateError = err => ({ type: "USER_UPDATE_ERROR", err });

export const userSavedTrack = (uid, newfavs) => {
  return dispatch => {
    dispatch(userUpdate(newfavs));
    dp.collection("users")
      .doc(uid)
      .update({ likedTracks: newfavs })
      .then(() => {
        dispatch(userUpdateSuccess());
      })
      .catch(err => {
        dispatch(userUpdateError(err.message));
      });
  };
};
