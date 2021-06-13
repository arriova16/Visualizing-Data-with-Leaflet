var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function (data) {

    function chooseColor(magnitude) {
    switch (true) {
        case magnitude > 5:
            return "#ff5f65";
        case magnitude > 4:
            return "#fe8d46";
        case magnitude > 3:
            return "#fbb22d";
        case magnitude > 2:
            return "#f7dc11";
        case magnitude > 1:
            return "#dcf400";
        default:
            return "#a4f600";
        } 
    }
    function markerSize(magnitude) {
     return magnitude * 4;
    };

    function styleFormat(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: chooseColor(feature.properties.mag),
            color: "#000000",
            radius: markerSize(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }
    }

    var earthquakeLayer = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
    style: styleFormat,
    onEachFeature: function(feature,layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.mag);
    }
    });
    createMap(earthquakeLayer);
});


 
    
    function createMap(earthquakes) {
        var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
        var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
        
        var overlayMaps = {
            Earthquakes: earthquakes
        };
        
        var baseMaps = {
            "Street Map": street,
            "Topographic Map": topo
        };
        
        var myMap = L.map("map", {
            center: [
            37.09, -95.71
            ],
            zoom: 4,
            layers: [street, earthquakes]
        });

        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);



    var legend = L.control({ position: "bottomleft" });
                
    legend.onAdd = function() {
        
        var div = L.DomUtil.create("div", "info legend");

        var limits = ["6", "5", "4", "3", "2","1"];
        var colors = ["#ff5f65", "#fe8d46", "#fbb22d", "#f7dc11",  "#dcf400", "#a4f600"]
        

      for (var i=0; i<limits.length; i++) {
          div.innerHTML +=
          "<i style = 'background: " + colors[i] + "'></1> " + limits[i] + (limits[i+1] ? "&ndash;" + limits[i + 1] + "<br>" : "+")
      }
  
        
  return div;
    };
      
        // Adding the legend to the map
        legend.addTo(myMap);
      
    
      
}


  