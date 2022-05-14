// BUILD MAP
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",

  "esri/Graphic",
  "esri/layers/GraphicsLayer"

], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {


  esriConfig.apiKey = "AAPKa23dd05c324a492db8a56b2939be45394KV1CxC5C00XdxqvO-HHDPhHI1D4yxJcyhLvMcSZCoQOcqhtwdI1P0OP6hZgPPTn";

  const map = new Map({
    basemap: "arcgis-topographic" //Basemap layer service
  });

  const view = new MapView({
    map: map,
    center: [14.090508, 55.833811], //Longitude, latitude
    zoom: 14,
    container: "viewDiv"
  });

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);


  const polyline = {
    type: "polyline",
    paths: [
      [14.102326, 55.847143], //Longitude, latitude
      [14.105305,  55.836275], //Longitude, latitude
      [14.107621, 55.824495],
      [14.100122,55.820749],
      [14.090534, 55.819169],
      [14.069456, 55.820488],
      [14.070630, 55.835079],
      [14.076652, 55.844879],
      [14.102326, 55.847143]
       //Longitude, latitude
    ]
  };

  const simpleLineSymbol = {
    type: "simple-line",
    color: [226, 119, 40], // Orange
    width: 2
  };

  const polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol
  });
  graphicsLayer.add(polylineGraphic);



  Promise.resolve(Load()).then(sensors => {
    for (var sensor of sensors) {

      var Point = {
        type: "point",
        longitude: sensor.Longitude,
        latitude: sensor.Latitude

      };


      console.log(sensor.FloodColor);
      var simpleMarkerSymbol = {
        type: "simple-marker",
        color: sensor.FloodColor,
        size: sensor.MarkerSize,
        outline: {
          color: [255, 255, 255], // white
          width: 1
        }
      };

      let highcount = 0;
      let mediumcount = 0;
      let lowcount = 0;
      let nonecount = 0;

      for (var i = 0; i < sensor.FloodingArray.length; i++) {
        if (sensor.FloodingArray[i] === "Hög") {
          highcount++;
        } else if (sensor.FloodingArray[i] === "Medel") {
          mediumcount++;
        } else if (sensor.FloodingArray[i] === "Låg") {
          lowcount++;
        } else {
          nonecount++;
        }

      }


      const popupTemplate = {
        title: "{Name}",
        content: "Sensornamn: <b>{Sensorname}</b>" + "<br> Översvämningsrisk: <b>{Floodgrade}</b>"
          + "<br> Senast uppdaterad: <b>{Updated}</b>" + "<br>" +
          "<br> <b> Nedan kan du avläsa de senaste sju dagarnas översvämningsprognos för denna sensorn, om flödesrisken har varit hög de senaste dagarna kan det leda till en större översvämning. </b> <br>" +
          "<br> Hög översvämningsrisk: <b>{HistoricFloodGradesHigh}</b> dagar." + "<br> Medel översvämningsrisk: <b>{HistoricFloodGradesMedium}</b> dagar." + "<br> Låg översvämningsrisk: <b>{HistoricFloodGradesLow}</b> dagar." +
          "<br> Ingen översvämningsrisk: <b>{HistoricFloodGradesNone}</b> dagar."
      }

      const attributes = {
        Name: sensor.Type,
        Sensorname: sensor.SensorName,
        Floodgrade: sensor.Floodgrade,
        Updated: sensor.LatestUpdate,
        HistoricFloodGradesHigh: highcount,
        HistoricFloodGradesMedium: mediumcount,
        HistoricFloodGradesLow: lowcount,
        HistoricFloodGradesNone: nonecount,

      }


      var pointGraphic = new Graphic({
        geometry: Point,
        symbol: simpleMarkerSymbol,

        attributes: attributes,
        popupTemplate: popupTemplate
      });

      graphicsLayer.add(pointGraphic);




    }
  })
});

async function Load() {
  let rawData = await fetch('/backend/sensors.json');
  let sensors = await rawData.json();
  //console.log(sensors);
  return sensors;
}

