import {
  MESSAGE_SENT,
  SOCKET_DISCONNECT,
  CONNECTED,
  MESSAGE_RECEIVED,
  CHAT_ERROR,
  CONTACT_ADDED,
  ACTIVE_CHAT,
  EXIT,
} from "./types";
import io from "socket.io-client";

const server = process.env.REACT_APP_ENDPOINT;
const socket = io(server);

export const connectSocket = (codeName) => async (dispatch) => {
  if (codeName) {
    socket.connect();
    socket.emit("connected", { codeName });
    dispatch({ type: CONNECTED });
  } else {
    return;
  }
};

export const socketMessage = (recepient, newMessage) => async (dispatch) => {
  socket.emit("private", { to: recepient, message: newMessage });
  dispatch({
    type: MESSAGE_SENT,
    payload: { to: recepient, newMessage },
  });
};

export const socketReceive = () => async (dispatch) => {
  socket.on("private", (data) => {
    dispatch({
      type: MESSAGE_RECEIVED,
      payload: data.message,
    });
  });
};

export const disconnect = () => async (dispatch) => {
  socket.emit("disconnect");
  socket.close();
  dispatch({
    type: SOCKET_DISCONNECT,
  });
};

export const addContact = (codeName, contact) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let res = await fetch(`${server}/api/profile/${codeName}`, {
      method: "PUT",
      headers: config.headers,
      body: JSON.stringify({ contact }),
    });

    if (!res.ok) {
      let message = await res.text();
      throw new Error(message);
    }
    let data = await res.json();
    dispatch({
      type: CONTACT_ADDED,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: err.message,
    });
  }
};

export const currentChat = (codeName) => (dispatch) => {
  dispatch({
    type: ACTIVE_CHAT,
    payload: codeName,
  });
};

export const exitChat = () => (dispatch) => {
  dispatch({
    type: EXIT,
  });
};
