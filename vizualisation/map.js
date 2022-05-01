var locs = ["14.086536, 55.838911", "14.093254, 55.837071", "14.091694, 55.833669"]


// BUILD MAP
require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/Graphic",
    "esri/layers/GraphicsLayer"

    ], function(esriConfig,Map, MapView, Graphic, GraphicsLayer) {

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

 

 for (i = 0; i < locs.length; i++) {
    console.log(locs[i].split(",")[0]);
    // create a point 
     var Point ={
      type: "point",
      longitude: locs[i].split(",")[0], //check if the point is longitude and change accordingly
       latitude: locs[i].split(",")[1] //check if the point is latitude and change accordingly

     };
     var simpleMarkerSymbol = {
       type: "simple-marker",
       color: [46, 204, 113 ],  // Green
       outline: {
         color: [255, 255, 255], // white
         width: 1
       }
     };

     //*** ADD ***//
    // Create attributes
    var attributes = {
      Name: "My point",  // The name of the
      Location: " Point Dume State Beach",  // The owner of the
    };
    // Create popup template
    var popupTemplate = {
      title: "{Name}",
      content: "Test <b>{Location}</b>."
    };

    var pointGraphic = new Graphic({
      geometry: Point,
      symbol: simpleMarkerSymbol,
      //*** ADD ***//
      attributes: attributes,
      popupTemplate: popupTemplate
    });

    graphicsLayer.add(pointGraphic);
  }

});

