import { auth } from "../firebase";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGOUT,
  LOGOUT_ERROR,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./types";

const server = process.env.REACT_APP_ENDPOINT;

export const registerUser = (history, email, username, password) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let newUser = await auth.createUserWithEmailAndPassword(email, password);

    if (newUser) {
      await newUser.user.updateProfile({
        displayName: username,
      });
      let newProfile = {
        username: username,
        codeName: username + newUser.user.uid.substring(0, 4),
      };
      await axios.post(`${server}/api/profile`, newProfile, config);
      /* newUser.user.sendEmailVerification(); */
      dispatch({
        type: REGISTER_SUCCESS,
      });
    } else {
      newUser = null;
    }
    history.push("/");
    dispatch(currentUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err,
    });
  }
};

export const currentUser = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      let codeName = user.displayName + user.uid.substring(0, 4);
      axios.get(`${server}/api/profile/${codeName}`).then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: {
            userProfile: res.data,
            uid: user.uid,
            username: user.displayName,
            avatar: user.photoURL,
            phone: user.phoneNumber,
            isVerified: user.emailVerified,
            anonymous: user.isAnonymous,
            tenantId: user.tenantId,
          },
        });
      });
    } else {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  });
};

export const login = (history, email, password) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
    });
    history.push("/");
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err,
    });
  }
};

export const logout = (history, redirected) => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch({
      type: LOGOUT,
    });
    redirected ? history.push("/auth") : history.push("/");
  } catch (err) {
    dispatch({
      type: LOGOUT_ERROR,
      payload: err.message,
    });
  }
};
// todo update user avatar
/* export const updateUser = (newAvatar, avatarName) => (dispatch) => {
  const uploadTask = storage.ref(`avatars/${avatarName}`).put(newAvatar);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      let progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      dispatch({
        type: AVATAR_UP,
        payload: progress,
      });
    },
    (error) => {
      dispatch({
        type: AVATAR_UP_FAIL,
        payload: error,
      });
    },
    () => {
      storage
        .ref("avatars")
        .child(avatarName)
        .getDownloadURL()
        .then((url) => {
          auth.currentUser.updateProfile({
            photoURL: url,
          });
          dispatch({
            type: AVATAR_UP_SUCCESS,
            payload: url,
          });
        });
    }
  );
};
 */
//delete user

/* export const deleteAccount = (history, redirected) => async (dispatch) => {
  try {
    let user = auth.currentUser;
    await user.delete();
    dispatch({
      type: USER_DELETED,
    });
    history.push("/");
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.message,
    });
    dispatch(logout(history, redirected));
  }
}; */
