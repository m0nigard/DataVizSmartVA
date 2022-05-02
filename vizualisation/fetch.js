
async function Load(){
let rawData = await fetch('sensors.json');
  let sensors = await rawData.json();
  //console.log(sensors);
  return sensors;
}
