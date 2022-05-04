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

  console.log(res);
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


readSensorJSON();
//hej();