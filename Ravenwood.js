


function loadRavenwood(){



    console.log("hello")

var bounds = [[0, 0], [65, 65]];

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 4,
    maxZoom: 8,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
}).setView([50, 50], 1);
//
//
//
//
//

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var image2 = L.imageOverlay('http://localhost:5000/static/img/WC/ravenwood.svg', bounds).addTo(map);


map.fitBounds(bounds);

//
//

map.on('click', function (e) {
    try{

        var target = e.originalEvent.target.attributes.stroke.nodeValue;
        if (target == "#00000001") {
            // handle the event for the path
            console.log('Clicked on wizardcity Fishing:');
        }
        else if(target == "#00000002"){
            
            console.log('Clicked on wizardcity Merles House:');
        }
        else{
            console.log(e.latlng.lng+"," + e.latlng.lat)
        }
    }
    catch{
        console.log(e.latlng.lng+"," + e.latlng.lat)

    }
});

var clickBoundaryCommonsArrow= [{
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [30.65625,14.434061343068697],
[32.53125,14.480955625257096],
[32.609375,9.119376028383382],
[37.28125,9.041218891402716],
[37.46875,8.806747480460716],
[38.546875,8.650433206499383],
[38.515625,3.867216423282599],
[37.921875,3.241959327437268],
[36.984375,3.1638021904566003],
[36.640625,3.351379319210203],
[36.59375,3.7109021493212673],
[26.984375,3.7109021493212673],
[26.8125,3.2106964726450045],
[26.265625,3.054382198683669],
[25.703125,3.1950650452488674],
[25.421875,3.6171135849444696],
[25.0625,3.9297421328671334],
[24.984375,4.273633535582064],
[25.046875,8.572276069518717],
[25.21875,9.025587464006582],
[25.5,8.91616747223365],
[25.625,8.58790749691485],
[25.875,8.791116053064583],
[26.09375,9.103744600987248],
[26.28125,9.40074172151378],
[27.34375,9.322584584533114],
[27.828125,9.525793140682847],
[30.671875,9.49453028589058],
[30.734375,14.40279848827643],
[32.453125,14.465324197860962]
]]
}    
}];    

var theCommonsArrow = {
    "color": "#00000003"
}    

var thecommonsarrow = L.geoJSON(clickBoundaryCommonsArrow, {
    style: theCommonsArrow
}).addTo(map);    

//
//hover over and out of merles house
thecommonsarrow.on('mouseover', function (e) {
    this.setStyle({
    "color": "#fffe65",
    "fillColor": "#d5b92040",
    "fillOpacity": "1"
})
})
thecommonsarrow.on('mouseout', function (e) {
    this.setStyle({"color": "#00000003"})
    this.setStyle({"fillColor": "#00000003"})
})























thecommonsarrow.on('click', function (e) {
    deleteCurrentMap(map).then(function (resolve){
        loadCommons(resolve)
    })
})
thecommonsarrow.on('click', function (e) {
    deleteCurrentMap(map).then(function (resolve){
        loadCommons(resolve)
    })
})
}