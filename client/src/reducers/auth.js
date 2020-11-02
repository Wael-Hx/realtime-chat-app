import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGOUT,
  LOGOUT_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_DELETED,
  CONTACT_ADDED,
  MESSAGE_RECEIVED,
  ACTIVE_CHAT,
} from "../actions/types";

const initialState = {
  authState: false,
  loading: true,
  user: null,
  userContacts: [],
  userCode: null,
  friendRequests: [],
  notificationsCount: 0,
  errors: { code: "", message: "" },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        authState: true,
        user: payload,
        userCode: payload.userProfile.codeName,
        userContacts: payload.userProfile.contacts,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        authState: true,
        errors: { code: "", message: "" },
        loading: false,
      };
    case CONTACT_ADDED:
      return {
        ...state,
        userContacts: [...state.userContacts, payload],
        loading: false,
      };
    case MESSAGE_RECEIVED:
      let isContact = state.userContacts.some(
        (contact) => contact.codeName === payload.codeName
      );
      let duplicate = state.friendRequests.includes(payload.codeName);
      if (!isContact && !duplicate) {
        return {
          ...state,
          friendRequests: [...state.friendRequests, payload.codeName],
          notificationsCount: state.notificationsCount + 1,
        };
      } else {
        return {
          ...state,
        };
      }
    case ACTIVE_CHAT:
      return {
        ...state,
        notificationsCount: 0,
      };
    case REGISTER_FAIL:
      return { ...state, errors: payload, loading: false };
    case USER_DELETED:
    case LOGOUT:
      return {
        ...state,
        authState: false,
        user: null,
        userContacts: [],
        userCode: null,
        loading: false,
      };
    case LOGOUT_ERROR:
      return { ...state, authState: false, errors: payload, loading: false };
    case LOGIN_FAIL:
      return {
        ...state,
        authState: false,
        errors: payload,
        user: null,
        loading: false,
      };
    case AUTH_ERROR:
      return { ...state, authState: false, user: null, loading: false };
    default:
      return state;
  }
}
