import io from 'socket.io-client';

const socket = io();

const socketManager = {
  subscribe: (event, callback) => {
    socket.on(event, callback);
  },
  emit: (event, payload, callback) => {
    socket.emit(event, payload, (response) => callback(response));
  },
};

export default socketManager;
