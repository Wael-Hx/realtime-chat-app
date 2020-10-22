import {
  CHAT_ERROR,
  MESSAGE_RECEIVED,
  MESSAGE_SENT,
  LOGOUT,
  CONTACT_ADDED,
} from "../actions/types";
const initialState = {
  messages: {},
  loading: true,
  msgRequest: null,
  errors: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case MESSAGE_SENT:
      if (!state.messages[payload.to]) {
        return {
          ...state,
          messages: { ...state.messages, [payload.to]: [payload.newMessage] },
        };
      } else {
        return {
          ...state,
          messages: {
            ...state.messages,
            [payload.to]: [...state.messages[payload.to], payload.newMessage],
          },
        };
      }
    case MESSAGE_RECEIVED:
      if (!state.messages[payload.codeName]) {
        return {
          ...state,
          messages: { ...state.messages, [payload.codeName]: [payload] },
        };
      } else {
        return {
          ...state,
          messages: {
            ...state.messages,
            [payload.codeName]: [...state.messages[payload.codeName], payload],
          },
        };
      }
    case LOGOUT:
      return { ...state, messages: {}, msgRequest: null, errors: null };
    case CONTACT_ADDED:
      return { ...state, errors: null };
    case CHAT_ERROR:
      return { ...state, errors: payload, loading: false };
    default:
      return state;
  }
};
