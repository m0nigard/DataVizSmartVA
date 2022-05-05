import { updateFloodingValues } from "/backend/client.js";


const WebSocket = require('ws');



let ws = new WebSocket("ws://127.0.0.1:5678/")

ws.addEventListener('open', function (event) {
  //WebSocket Connected
  console.log('connected')
})

ws.addEventListener('message', function (event) {
  //Received message
  console.log('MESSAGE RECEIVED')
  console.log(event.data) //MESSAGE DATA

  updateFloodingValues(event.data);
})

ws.addEventListener('close', function (event) {
  //WebSocket disconnected
  console.log('disconnected')
})

// To send data
//ws.send('hello')

// Only text formats allowed to send, if data is in json format use
//ws.send(JSON.stringify(object))