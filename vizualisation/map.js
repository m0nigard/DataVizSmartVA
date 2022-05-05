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
    zoom: 15,
    container: "viewDiv"
  });

  // 55.833811, 14.090508

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  Promise.resolve(Load()).then(sensors => {
    for (var sensor of sensors) {

      var Point = {
        type: "point",
        longitude: sensor.Longitude,
        latitude: sensor.Latitude

      };


      var simpleMarkerSymbol = {
        type: "simple-marker",
        color: sensor.FloodColor,
        size: sensor.MarkerSize,  // Green
        outline: {
          color: [255, 255, 255], // white
          width: 1
        }
      };

      const popupTemplate = {
        title: "{Name}",
        content: "Sensorname: <b>{Sensorname}</b>" + "<br> Floodgrade: <b>{Floodgrade}</b>"
          + "<br> Last updated: <b>{Updated}</b>"
      }
      const attributes = {
        Name: sensor.Type,
        Sensorname: sensor.SensorName,
        Floodgrade: sensor.Floodgrade,
        Updated: sensor.LatestUpdate
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

