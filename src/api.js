import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

function connectionToServer(interval, cb) {
  console.log('connecting to server')
  socket.emit('connection')
} 
export { connectionToServer }