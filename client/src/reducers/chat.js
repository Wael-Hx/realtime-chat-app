import {
  CHAT_ERROR,
  MESSAGE_RECEIVED,
  MESSAGE_SENT,
  LOGOUT,
  CONTACT_ADDED,
  ACTIVE_CHAT,
  EXIT,
} from "../actions/types";
const initialState = {
  messages: {},
  loading: true,
  msgNotifier: [],
  activeChat: null,
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
          msgNotifier: [...state.msgNotifier, payload.codeName],
        };
      } else {
        return {
          ...state,
          messages: {
            ...state.messages,
            [payload.codeName]: [...state.messages[payload.codeName], payload],
          },
          msgNotifier: [...state.msgNotifier, payload.codeName],
        };
      }
    case ACTIVE_CHAT:
      return {
        ...state,
        activeChat: payload,
        msgNotifier: state.msgNotifier.filter(
          (codename) => codename !== payload
        ),
      };
    case EXIT:
      return {
        ...state,
        activeChat: null,
      };
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
