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
    center: [14.0892635, 55.8371511], //Longitude, latitude
    zoom: 15,
    container: "viewDiv"
  });

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
        color: [46, 204, 113],  // Green
        outline: {
          color: [255, 255, 255], // white
          width: 1
        }
      };


      // Create attributes
      var attributes = {
        Name: sensor.Type,  // The name of the
        Location: sensor.Floodgrade  // The owner of the
      };
      // Create popup template 
      var popupTemplate = {
        title: "{Name}",
        content: "Test <b>{Location}</b>."
      };

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

