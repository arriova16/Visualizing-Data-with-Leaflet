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
                
    legend.onAdd = function(map) {
        
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML += "<h4>Earthquake Magnitude</h4>";
    div.innerHTML += '<span><i class="bi bi-circle-fill" style="color: #648FFF"></i> &nbsp;&nbsp; &lt; 1 </span><br>';
    div.innerHTML += '<span><i class="bi bi-circle-fill" style="color: #785EF0"></i> &nbsp;&nbsp; 1 - 2</span><br>';
    div.innerHTML += '<span><i class="bi bi-circle-fill" style="color: #DC267F"></i> &nbsp;&nbsp; 3 - 4</span><br>';
    div.innerHTML += '<span><i class="bi bi-circle-fill" style="color: #FE6100"></i> &nbsp;&nbsp; 4 - 5</span><br>';
    div.innerHTML += '<span><i class="bi bi-circle-fill" style="color: #FFB000"></i> &nbsp;&nbsp; 6 +</span><br>';
    
       
  
        
  return div;
    };
      
        // Adding the legend to the map
        legend.addTo(myMap);
      
    
      
}


  