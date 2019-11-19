import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

function connectionToServer(onGetMessage) {
  console.log('connecting to server')
  socket.on('newMessage', (message, onGetMessage) => {
    console.log('the message is: ',message) 
    onGetMessage(message)
  })
  socket.emit('connection')
} 

export { connectionToServer }