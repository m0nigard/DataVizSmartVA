const WebSocket = require('ws');

let ws = new WebSocket("ws://127.0.0.1:5678/")

ws.addEventListener('open', function (event) {
  //WebSocket Connected
  console.log('connected')
})

ws.addEventListener('message', function (event) {
  //Received message
  console.log('MESSAGE RECEIVED')
  // console.log(event.data) //MESSAGE DATA
  updateFloodingValues(event.data);
})

ws.addEventListener('close', function (event) {
  //WebSocket disconnected
  console.log('disconnected')
})


function readSensorJSON() {
  const fs = require('fs');
  fs.readFile('sensors.json', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    const user = JSON.parse(data);
    var res = [];
    for (var i in user) {
      res.push(user[i]);
    }
    fetchFloodingValues(res);
  })
}

function updateSensorValues(fetchedData, fetchedData2) {
  data = JSON.stringify(fetchedData);
  var obj = JSON.parse(data);
  var res = [];
  for (var i in obj) {
    res.push(obj[i]);
  }

  data2 = JSON.stringify(fetchedData2);
  var obj2 = JSON.parse(data2);
  var res2 = [];
  for (var i in obj2) {
    res2.push(obj2[i]);
  }

  for (var i = 0; i < res.length; i++) {
    for (var j = 0; j < res2.length; j++) {
      if (res[i].SensorName === res2[j].sensorName) {
        res[i].Floodgrade = res2[j].floodGrade
        res[i].LatestUpdate = getDateTime();
        if (res2[j].floodGrade === "High") {
          res[i].FloodColor = "red";
          res[i].MarkerSize = 50;
        } else if (res2[j].floodGrade === "Medium") {
          res[i].FloodColor = "orange";
          res[i].MarkerSize = 35;
        } else if (res2[j].floodGrade === "Low") {
          res[i].FloodColor = "yellow";
          res[i].MarkerSize = 25;
        } else {
          res[i].FloodColor = "green";
          res[i].MarkerSize = 15;
        }
      }
    }
  }

  const fs = require('fs');
  const updatedValues = JSON.stringify(res);
  // write JSON string to a file
  fs.writeFile('sensors.json', updatedValues, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });

  //console.log(res);
}

async function fetchFloodingValues(orgSensorValues) {
  const fs = require('fs');
  fs.readFile('opcodeTest.json', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    const user = JSON.parse(data);
    var res = [];
    for (var i in user) {
      res.push(user[i]);
    }

    //console.log(res, orgSensorValues)
    updateSensorValues(orgSensorValues, res);
  })
}


async function updateFloodingValues(newFloodingValues) {
  var obj = JSON.parse(newFloodingValues);
  var res = [];
  for (var i in obj) {
    res.push(obj[i]);
  }
  //console.log(res);

  //console.log(res);
  const fs = require('fs');
  const updatedValues = JSON.stringify(res);
  // write JSON string to a file
  fs.writeFile('opcodeTest.json', updatedValues, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
    readSensorJSON();
  });
}

function getDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }
  if (second.toString().length == 1) {
    second = '0' + second;
  }
  var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
  return dateTime;
}