

function getData(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './database.db', true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function(e) {
        var uInt8Array = new Uint8Array(this.response);
        var db = new SQL.Database(uInt8Array);
        
        // Now you can run SQL queries on the db object.
        var results = db.exec("SELECT * FROM eoitems");
        console.log(results);
    };

xhr.send();
}



$( document ).ready(function() {
    $('#popup_background').click(function (e) {
        if (e.target.classList[0]== "npc_inv"){

        }
        else{
            $('#popup_background').css('display', 'none');
        }
        // console.log(e)
        // if $(".npc_inv")
        // $("#login_popup_modal").css("display", "block")
    })
});

const shop_npc_stroke = 'ff0000'
const quest_npc_stroke = '1ecbe1'

function deleteCurrentMap(map) {
    return new Promise(function (resolve, reject) {
        //console.log("currentmap")
        //console.log(currentmap)
        //map.off()
        //map.remove()
        //map = undefine
        try{

            map.remove()
            let newHeight = ($(window).height()-10)
            document.getElementById('map').outerHTML = "<div id='map' style='height:"+newHeight+"px;'></div>";
            resolve(map);
        }
        catch{

            reject()
        }
    })
}
function loadCommons(){
    currentmap = "commons"
    console.log("loadCommons")
    // var bounds = [[0, 0], [25, 25]];
    // var bounds = [[0, 0], [30, 30]];
    var bounds = [[0, 0], [65, 65]];
    
    var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 4,
    maxZoom: 8,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
}).setView([50, 50], 1);

//
function findPoints(center) {
    // Define the distances in x (longitude) and y (latitude)
    const deltaX = 0.251953125;
    const deltaY = 0.55288994850908;
  
    // Extract x and y coordinates from the center point
    const [x, y] = center;
  
    // Calculate four points around the center
    const point1 = [x - deltaX, y - deltaY];
    const point2 = [x - deltaX, y + deltaY];
    const point3 = [x + deltaX, y + deltaY];
    const point4 = [x + deltaX, y - deltaY];
  
    // Return the new points
    return [point1, point2, point3, point4];
  }
  
//   // Example usage
//   const center = [42.333984375, 33.55636740933211];
//   const points = findPoints(center);
//   console.log(points);
  

function build_square_bounds(name, color, center, stroke) {
    const points = findPoints(center);
  
    var clickBoundary = [{
      "type": "Feature",
      "id": `uniqueFeatureId${name}`,
      "geometry": {
        "type": "Polygon",
        "coordinates": [points]
      }
    }];
  
    var theStyle = {
    //   "color": `#${color}`,
      "color": `#0000000000`,
      "fillOpacity": "0"
    };
  
    var mouse = L.geoJSON(clickBoundary, {
      style: theStyle,
      properties: {
        id: `myCustomID${name}`
      }
    }).addTo(map);
  
    mouse.on('mouseover', function (e) {
      this.setStyle({
        "color": `#${stroke}`,
        // "color": "#ff0000",
        "fillColor": `#${color}`,
        "fillOpacity": "1"
      });
    });
  
    mouse.on('mouseout', function (e) {
      this.setStyle({
        "color": `#0000000000`,
        // "fillColor": `#${color}`,
        "fillColor": `#0000000000`,
        "fillOpacity": "0"
      });
    });
  }
  
  
  

//add map image

var image2 = L.imageOverlay('aaaupdates/aeven.svg', bounds).addTo(map);


map.fitBounds(bounds);

//
//

function open_shop_info(shop){
    $("#popup_background").css('display', 'flex');
}

function open_quest_npc(fill){
    for(let i = 0; i < aeven_quest_npcs.length; i++) {
        if(aeven_quest_npcs[i].fill === fill) {
            return console.log(aeven_quest_npcs[i])
        }
    }

    // Return null if no matching object is found
    return null;
}
function open_shop_npc(fill){
    for(let i = 0; i < aeven_shop_npcs.length; i++) {
        if(aeven_shop_npcs[i].fill === fill) {
            return console.log(aeven_shop_npcs[i])
        }
    }

    // Return null if no matching object is found
    return null;
}

map.on('click', function (e) {
    try{

        var stroke = e.originalEvent.target.attributes.stroke.nodeValue;
        var target = e.originalEvent.target.attributes.fill.nodeValue;
        console.log(e)
        // console.log(stroke)
        // console.log(target)
        if (stroke == "#ff0000") {
            // handle the event for the path
            // open_shop_npc(target.replace("#",""))
            //then
            open_shop_info(open_shop_npc(target.replace("#","")))
        }
        else if(stroke == "#1ecbe1"){
            open_quest_npc(target.replace("#",""))
            
        }
        else{
            // console.log(e.latlng.lng+"," + e.latlng.lat)
        }
    }
    catch{
    //     console.log(e.latlng.lng+"," + e.latlng.lat)
    //     points = [e.latlng.lng,e.latlng.lat]
    //     console.log(findPoints(points))

    }
});
// build_square_bounds("test", "00000002", [49.171875,35.054565460003474])
// build_square_bounds("test", "00000002", [46.8984375,36.41362821352589])


var aeven_shop_npcs = [
    {
        "name": "Aeven Shavers",
        "fill": "00000002",
        "center": [49.53125,33.00360609757612]
    },
    {
        "name": "Farmer Merchant",
        "fill": "00000003",
        "center": [45.94921875,30.92489618516035]
    },
    {
        "name": "Happy Berry Jane",
        "fill": "00000004",
        "center": [51.19921875,34.30407730001738]
    },
    {
        "name": "Happy Berry Mike",
        "fill": "00000005",
        "center": [49.15625,35.08554719190301]
    },
    {
        "name": "Barry Trade",
        "fill": "00000006",
        "center": [42.34765625,33.491348612456335]
    },
    {
        "name": "Packer Piper",
        "fill": "00000007",
        "center": [46.890625,36.43338925054637]
    },
    {
        "name": "Shady Potion Merchant",
        "fill": "00000008",
        "center": [42.68359375,40.046806833515454]
    },
    {
        "name": "Packer Piper",
        "fill": "00000009",
        "center": [10.8203125,32.80071748135317]
    },
    {
        "name": "Creative Caroline",
        "fill": "00000010",
        "center": [39.984375,31.46260744952317]
    }
]
var aeven_quest_npcs = [
    {
        "name": "Goat Collector",
        "fill": "00000011",
        "center": [45.12890625,35.030946549197836]
    },
    {
        "name": "Foreman",
        "fill": "00000012",
        "center": [25.09765625,31.45640016028825]
    },
    {
        "name": "Shady Doorkeeper",
        "fill": "00000013",
        "center": [27.81640625,39.40919312354095]
    },
    
]


aeven_shop_npcs.forEach(npc => {
    build_square_bounds(npc.name, npc.fill, npc.center, shop_npc_stroke);
  });
  aeven_quest_npcs.forEach(npc => {
    build_square_bounds(npc.name, npc.fill, npc.center, quest_npc_stroke);
  });



  L.Control.Button = L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        var button = L.DomUtil.create('a', 'leaflet-control-button', container);
        L.DomEvent.disableClickPropagation(button);
        L.DomEvent.on(button, 'click', function(){
            console.log('clicked control!');
        });

        container.title = "Title";
        container.html = "<p>Title</p>";
        console.log(container)

        return container;
    },
    onRemove: function(map) {},
});
var control = new L.Control.Button()
control.addTo(map);
// function remove_npc_group(group){
//   group.forEach(npc => {
//     // build_square_bounds(npc.name, npc.fill, npc.center);
//     map.removeLayer(polygon);myCustomID${name}
//   });
// }


// var clickBoundaryBank = [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [37.34375,36.83122754515803],
// [36.296875,36.31545741651352],
// [34.1796875,37.42905201245054],
// [34.1640625,38.7849022748721],
// [34.70703125,39.65624120432457],
// [36.86328125,38.60125685027898],
// [37.36328125,38.21833660325502],
// [37.33984375,36.83122754515803],
// ]]
// }    
// }];    

// var theCommonsBank = {
//     "color": "#00000002"
// }    

// var Bankmouse = L.geoJSON(clickBoundaryBank, {
//     style: theCommonsBank
// }).addTo(map);    


// //hover over and out of merles house
// Bankmouse.on('mouseover', function (e) {
//     this.setStyle({"color": "#ff0000",
//     "fillColor": "#ef7272",
//     "fillOpacity": ".5"
// })
// })
// Bankmouse.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000002"})
//     this.setStyle({"fillColor": "#00000002"})
// })




// var clickBoundarybarry = [{
//     "type": "Feature",
//     "id": "uniqueFeatureId1",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [42.08203125,33.00347746082303],
//             [42.08203125,34.10925735784119],
// [42.5859375,34.10925735784119],
// [42.5859375,33.00347746082303],
// ]]
// }    
// }];    

// var theCommonsbarry = {
//     "color": "#00000002"
// }    

// var barrymouse = L.geoJSON(clickBoundarybarry, {
//     style: theCommonsbarry,
//     properties: {
//         id: 'myCustomID'
//       }
// }).addTo(map);    


// //hover over and out of merles house
// barrymouse.on('mouseover', function (e) {
//     this.setStyle({"color": "#ff0000",
//     "fillColor": "#00000002",
//     "fillOpacity": "1"
// })
// })
// barrymouse.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000002"})
//     this.setStyle({"fillColor": "#00000002"})
// })








// var clickBoundarygoat_trader = [{
//     "type": "Feature",
//     "id": "uniqueFeatureId1",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[

//             [44.892578125, 34.47415145014818],
//             [44.892578125, 35.579931347166344],
//             [45.396484375, 35.579931347166344],
//             [45.396484375, 34.47415145014818],
// ]]
// }    
// }];    

// var theCommonsgoat_trader = {
//     "color": "#00000003"
// }    

// var goat_tradermouse = L.geoJSON(clickBoundarygoat_trader, {
//     style: theCommonsgoat_trader,
//     properties: {
//         id: 'myCustomID'
//       }
// }).addTo(map);    


// //hover over and out of merles house
// goat_tradermouse.on('mouseover', function (e) {
//     this.setStyle({"color": "#ff0000",
//     "fillColor": "#00000003",
//     "fillOpacity": "1"
// })
// })
// goat_tradermouse.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000003"})
//     this.setStyle({"fillColor": "#00000003"})
// })







// var clickBoundaryshears = [{
//     "type": "Feature",
//     "id": "uniqueFeatureId1",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[

//             [49.275390625, 32.56012853068759],
//             [49.275390625, 33.66590842770576],
//             [49.779296875, 33.66590842770576],
//             [49.779296875, 32.56012853068759]
// ]]
// }    
// }];    

// var theCommonsshears = {
//     "color": "#00000004"
// }    

// var shearsmouse = L.geoJSON(clickBoundaryshears, {
//     style: theCommonsshears,
//     properties: {
//         id: 'myCustomID'
//       }
// }).addTo(map);    


// //hover over and out of merles house
// shearsmouse.on('mouseover', function (e) {
//     this.setStyle({"color": "#ff0000",
//     "fillColor": "#00000004",
//     "fillOpacity": "1"
// })
// })
// shearsmouse.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000004"})
//     this.setStyle({"fillColor": "#00000004"})
// })







// var clickBoundarygoat_trader = [{
//     "type": "Feature",
//     "id": "uniqueFeatureId1",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[

//             [44.892578125, 34.47415145014818],
//             [44.892578125, 35.579931347166344],
//             [45.396484375, 35.579931347166344],
//             [45.396484375, 34.47415145014818],
// ]]
// }    
// }];    

// var theCommonsgoat_trader = {
//     "color": "#00000005"
// }    

// var goat_tradermouse = L.geoJSON(clickBoundarygoat_trader, {
//     style: theCommonsgoat_trader,
//     properties: {
//         id: 'myCustomID'
//       }
// }).addTo(map);    


// //hover over and out of merles house
// goat_tradermouse.on('mouseover', function (e) {
//     this.setStyle({"color": "#ff0000",
//     "fillColor": "#00000005",
//     "fillOpacity": "1"
// })
// })
// goat_tradermouse.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000005"})
//     this.setStyle({"fillColor": "#00000005"})
// })







// var clickBoundaryjane = [{
//     "type": "Feature",
//     "id": "uniqueFeatureId1",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[

//             [46.646484375, 35.860738265016806]
//             [46.646484375, 36.96651816203497],
//             [47.150390625, 36.96651816203497],
//             [47.150390625, 35.860738265016806],
// ]]
// }    
// }];    

// var theCommonsjane = {
//     "color": "#00000006"
// }    

// var janemouse = L.geoJSON(clickBoundaryjane, {
//     style: theCommonsjane,
//     properties: {
//         id: 'myCustomID'
//       }
// }).addTo(map);    


// //hover over and out of merles house
// janemouse.on('mouseover', function (e) {
//     this.setStyle({"color": "#ff0000",
//     "fillColor": "#00000006",
//     "fillOpacity": "1"
// })
// })
// janemouse.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000006"})
//     this.setStyle({"fillColor": "#00000006"})
// })






// var clickBoundaryjane = [{
//     "type": "Feature",
//     "id": "uniqueFeatureId1",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[

//             [45.697265625, 30.33700940826835],
//             [45.697265625, 31.44278930528651],
//             [46.201171875, 31.44278930528651],
//             [46.201171875, 30.33700940826835]
// ]]
// }    
// }];    

// var theCommonsjane = {
//     "color": "#00000006"
// }    

// var janemouse = L.geoJSON(clickBoundaryjane, {
//     style: theCommonsjane,
//     properties: {
//         id: 'myCustomID'
//       }
// }).addTo(map);    


// //hover over and out of merles house
// janemouse.on('mouseover', function (e) {
//     this.setStyle({"color": "#ff0000",
//     "fillColor": "#00000006",
//     "fillOpacity": "1"
// })
// })
// janemouse.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000006"})
//     this.setStyle({"fillColor": "#00000006"})
// })






// var clickBoundarymike = [{
//     "type": "Feature",
//     "id": "uniqueFeatureId1",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [48.919921875, 34.50167551149439]
//             [48.919921875, 35.60745540851256]
//             [49.423828125, 35.60745540851256]
//             [49.423828125, 34.50167551149439]
// ]]
// }    
// }];    

// var theCommonsjane = {
//     "color": "#00000006"
// }    

// var janemouse = L.geoJSON(clickBoundaryjane, {
//     style: theCommonsjane,
//     properties: {
//         id: 'myCustomID'
//       }
// }).addTo(map);    


// //hover over and out of merles house
// janemouse.on('mouseover', function (e) {
//     this.setStyle({"color": "#ff0000",
//     "fillColor": "#00000006",
//     "fillOpacity": "1"
// })
// })
// janemouse.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000006"})
//     this.setStyle({"fillColor": "#00000006"})
// })



//
//


// var clickBoundaryCommonsFishing = [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [35.765625765625,17.636498611682434],
//             [34.671875,18.011652869189632],
//             [33.984375,18.6056471102427],
//             [33.75,19.51226989921843],
//             [33.84375,20.293841269025094],
//             [34.734375,21.09104406622789],
//             [36.640625,22.060192564788153],
//             [38.046875,22.71671251542575],
//             [38.390625,24.27985525503908],
//             [37.890625,25.74919014808721],
//             [37.46875,26.608918654874536],
//             [36.78125,27.71875],
//             [36.484375,28.390901378033732],
//             [37.75,29.15684132044426],
//             [38.640625,28.797318490333197],
//             [38.921875,28.3752699506376],
//             [39.25,27.937589983545866],
//             [39.515625,27.187281468531467],
//             [40.234375,23.842156005758945],
//             [43.90625,20.887816227889758],
//             [44.578125,19.88740487453723],
//             [44.9375,18.793204956807898],
//             [45.21875,17.9491078774167],
//             [45.359375,17.198799362402305],
//             [47.515625,15.791970896750309],
//             [46.3125,15.057293809132045],
//             [45.0625,16.057705162484574],
//             [43.984375,15.588762340600576],
//             [43.96875,14.385142431098313],
//             [42.734375,14.213196729740847],
//             [42.4375,15.197976655697245],
//             [42.703125,16.620436548745374],
//             [43.515625,18.152316433566433],
//             [42.34375,20.450136260798025],
//             [40.03125,20.450136260798025],
//             [37.21875,18.152316433566433],
//             [36.28125,17.83968788564377],
//             [35.765625765625,17.636498611682434]
//         ]]
//     }
// }];

// var theCommonsFishingColor = {
//     "color": "#00000001"
// }

// var fishingmouse = L.geoJSON(clickBoundaryCommonsFishing, {
//     style: theCommonsFishingColor
// }).addTo(map);    



// fishingmouse.on('click', function (e) {
//     console.log("clicked me")
// })
// //hover over and out of fishing area
// fishingmouse.on('mouseover', function (e) {
//     this.setStyle({"color": "#dfe619",
//     "fillColor": "#85b7c6",
//     "fillOpacity": "1"
// })
// })
// fishingmouse.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000001"})
//     this.setStyle({"fillColor": "#00000001"})
// })


// //
// //
// //





// var clickBoundaryMerlesHouse = [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [30.25,13.511042266556972],
// [24.859375,12.26052807486631],            
// [24.125,18.044156211435624],
// [23.59375,20.044978918140682],
// [25.203125,21.51433309337721],
// [26.5625,20.27945032908268],
// [26.65625,18.591256170300287],
// [28.765625,18.98204185520362],
// [29.09375,17.262584841628957],
// [27.171875,16.715484882764294],
// [27.1875,15.058553578774166],
// [29.5,15.355550699300698]
// ]]
// }    
// }];    

// var theCommonsMerlesHouse = {
//     "color": "#00000002"
// }    

// var merleshousemouse = L.geoJSON(clickBoundaryMerlesHouse, {
//     style: theCommonsMerlesHouse
// }).addTo(map);    


// //hover over and out of merles house
// merleshousemouse.on('mouseover', function (e) {
//     this.setStyle({"color": "#ae5f1b",
//     "fillColor": "#d07725",
//     "fillOpacity": "1"
// })
// })
// merleshousemouse.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000002"})
//     this.setStyle({"fillColor": "#00000002"})
// })
// //
// //

// //
// //

// var clickBoundaryRavenwoodArrow= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [28.03125,26.8125],
// [29.484375,26.796875],
// [29.421875,29.25],
// [30.171875,29.515625],
// [28.53125,31.1875],
// [27.25,29.328125],
// [27.96875,29.21875],
// [28.078125,26.796875]
// ]]
// }    
// }];    

// var theCommonsRavenwoodArrow = {
//     "color": "#00000003"
// }    

// var thecommonsravenwoodarrow = L.geoJSON(clickBoundaryRavenwoodArrow, {
//     style: theCommonsRavenwoodArrow
// }).addTo(map);    


// //hover over and out of merles house
// thecommonsravenwoodarrow.on('mouseover', function (e) {
//     this.setStyle({"color": "#fffe65",
//     "fillColor": "#d5b920",
//     "fillOpacity": "1"
// })
// thecommonsravenwoodtitle.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"

// })
// })
// thecommonsravenwoodarrow.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000003"})
//     this.setStyle({"fillColor": "#00000003"})
//     thecommonsravenwoodtitle.setStyle({"color": "#00000003"})
//     thecommonsravenwoodtitle.setStyle({"fillColor": "#00000003"})
// })






// //
// //
// //

// //
// //

// var clickBoundaryRavenwoodTitle= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [21.59375,47.312532136980664],
// [21.59375,46.70290646853147],
// [20.9375,46.484066484985604],
// [20,46.921746452077336],
// [19.5625,47.5626349753188],
// [19.53125,50.28250334224599],
// [19.90625,50.75144616412999],
// [20.40625,50.42318618881119],
// [21.21875,50.75144616412999],
// [27.796875,50.61076331756479],
// [28.40625,50.42318618881119],
// [29.34375,50.70455188194159],
// [29.875,50.67328902714932],
// [30.296875,50.40755476141506],
// [31.078125,50.548237607980255],
// [31.640625,50.76707759152612],
// [32.03125,50.70455188194159],
// [32.21875,50.454449043603454],
// [32.6875,50.67328902714932],
// [33.015625,50.76707759152612],
// [33.484375,50.67328902714932],
// [33.734375,50.438817616207324],
// [34.390625,50.61076331756479],
// [34.578125,50.67328902714932],
// [35.140625,50.28250334224599],
// [35.28125,49.95424336692719],
// [35.578125,50.36066047922665],
// [35.9375,50.68892045454545],
// [36.265625,50.59513189016865],
// [36.390625,47.703317821884],
// [35.9375,47.0936921534348],
// [35.359375,46.718537895927604],
// [34.5,46.593486476758535],
// [34.1875,46.843589315096665],
// [34.34375,47.406320701357465],
// [33.203125,47.43758355614973],
// [32.328125,47.296900709584534],
// [31.90625,47.3750578465652],
// [31.46875,47.625160684903335],
// [31.15625,47.296900709584534],
// [30.703125,47.312532136980664],
// [30.109375,47.296900709584534],
// [29.3125,47.468846410942],
// [27.9375,47.156217863019336],
// [27,47.39068927396133],
// [26.53125,47.6095292575072],
// [25.875,47.2812692821884],
// [25.0625,47.234375],
// [24.3125,47.20311214520773],
// [23.453125,47.6095292575072],
// [23.15625,47.25000642739613],
// [22.515625,47.171849290415466],
// [21.875,47.234375]
// ]]
// }    
// }];    

// var theCommonsRavenwoodTitle = {
//     "color": "#00000004"
// }    

// var thecommonsravenwoodtitle = L.geoJSON(clickBoundaryRavenwoodTitle, {
//     style: theCommonsRavenwoodTitle
// }).addTo(map);    


// //hover over and out of merles house
// thecommonsravenwoodtitle.on('mouseover', function (e) {
//     this.setStyle({"color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"
// })
// thecommonsravenwoodarrow.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b920",
//     "fillOpacity": "1"

// })
// })
// thecommonsravenwoodtitle.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000003"})
//     this.setStyle({"fillColor": "#00000003"})
//     thecommonsravenwoodarrow.setStyle({"color": "#00000003"})
//     thecommonsravenwoodarrow.setStyle({"fillColor": "#00000003"})
// })
// //
// //
// //
// //



// thecommonsravenwoodarrow.on('click', function (e) {
//     deleteCurrentMap(map).then(function (resolve){
//         loadRavenwood(resolve)
//     })
// })
// thecommonsravenwoodtitle.on('click', function (e) {
//     deleteCurrentMap(map).then(function (resolve){
//         loadRavenwood(resolve)
//     })
// })







// //
// //
// var clickBoundaryNightsideArrow= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [36.578125,28.452041983751542],
// [36.8125,28.588816973467708],
// [37.25,28.870182666598108],
// [37.53515625,29.02649694055944],
// [37.6328125,29.112469791238173],
// [37.7265625,29.29613906314274],
// [37.7421875,29.538426187782804],
// [37.76171875,29.76508188502674],
// [37.59375,30.464602722645],
// [37.51171875,30.632640567153434],
// [37.27734375,30.792862697963802],
// [37.1875,30.894466976038668],
// [37.0546875,30.871019834944466],
// [36.90234375,30.812401982208968],
// [36.6875,30.675626992492802],
// [36.48828125,30.550575573323734],
// [36.30859375,30.40207701306047],
// [36.15625,30.269209880193337],
// [36.0546875,30.136342747326204],
// [35.9296875,30.034738469251337],
// [35.8984375,29.940949904874536],
// [35.97265625,29.784635630913204],
// [36.03125,29.62441350010284],
// [36.1171875,29.448559941896338],
// [36.23046875,29.182825676162075],
// [36.33203125,29.010879974804606],
// [36.3671875,28.823302846051007],
// [36.43359375,28.573200007712874]
// ]]
// }    
// }]; 
// var theCommonsNightsideArrow = {
//     "color": "#00000004"
// }    

// var thecommonsnightsidearrow = L.geoJSON(clickBoundaryNightsideArrow, {
//     style: theCommonsNightsideArrow
// }).addTo(map);    


// //hover over and out of merles house
// thecommonsnightsidearrow.on('mouseover', function (e) {
//     this.setStyle({"color": "#fffe65",
//     "fillColor": "#000000c9",
//     "fillOpacity": "1"
// })
// thecommonsnightsidetitle.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"

// })
// })
// thecommonsnightsidearrow.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000004"})
//     this.setStyle({"fillColor": "#00000004"})
//     thecommonsnightsidetitle.setStyle({"color": "#00000004"})
//     thecommonsnightsidetitle.setStyle({"fillColor": "#00000004"})
// })
// //
// //
// //
// //
// //
// var clickBoundaryNightsideTitle= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [29.125,31.496927704648293],
// [28.453125,31.543821986836694],
// [27.734375,32.169079082682025],
// [27.59375,32.90375617030029],
// [27.609375,34.90457887700535],
// [27.921875,35.49857311805841],
// [28.375,34.99836744138214],
// [28.546875,34.63884461127108],
// [29.015625,35.37352169888935],
// [29.953125,35.26410170711641],
// [30.921875,35.45167883587001],
// [31.5,35.37352169888935],
// [31.90625,35.170313142739616],
// [32.25,35.38915312628548],
// [34.375,35.326627416700944],
// [35.09375,35.10778743315508],
// [35.703125,35.40478455368161],
// [36.390625,35.326627416700944],
// [36.75,35.01399886877828],
// [37.09375,35.12341886055121],
// [37.3125,35.310995989304814],
// [38.0625,35.310995989304814],
// [38.25,35.092156005758945],
// [38.484375,35.12341886055121],
// [38.828125,35.24847027972028],
// [39.234375,35.24847027972028],
// [39.46875,34.842053167420815],
// [40.21875,35.24847027972028],
// [40.625,34.98273601398601],
// [40.671875,34.52942461949815],
// [40.921875,34.70137032085562],
// [41.1875,35.170313142739616],
// [41.484375,35.185944570135746],
// [41.5625,34.63884461127108],
// [41.71875,33.02878187988482],
// [41.65625,32.59110191279309],
// [41.640625,32.16905337309749],
// [41.296875,31.856424825174827],
// [40.84375,31.512533422459892],
// [40.328125,31.418744858083095],
// [39.9375,31.418744858083095],
// [39.640625,31.73137340600576],
// [39.296875,31.950213389551624],
// [38.71875,31.887687679967094],
// [38.34375,31.887687679967094],
// [37.96875,32.16905337309749],
// [37.609375,32.356630501851086],
// [37.125,32.247210510078155],
// [36.328125,32.12215909090909],
// [35.828125,32.15342194570135],
// [35.65625,32.29410479226656],
// [35.1875,32.106527663512956],
// [33.859375,32.13779051830522],
// [33.6875,32.340999074454956],
// [33.328125,32.481681921020154],
// [33.03125,32.18468480049363],
// [32.453125,31.997107671740025],
// [31.453125,32.12215909090909],
// [30.921875,32.340999074454956],
// [30.734375,32.231579082682025],
// [30.28125,32.106527663512956],
// [29.390625,32.090896236116826],
// [29.5,31.54379627725216],
// [28.953125,31.371850575894694],
// [28.359375,31.46563914027149],
// [27.5625,32.41915621143562]
// ]]
// }    
// }];    

// var theCommonsNightsideTitle = {
//     "color": "#00000004"
// }    

// var thecommonsnightsidetitle = L.geoJSON(clickBoundaryNightsideTitle, {
//     style: theCommonsRavenwoodTitle
// }).addTo(map);    


// //hover over and out of merles house
// thecommonsnightsidetitle.on('mouseover', function (e) {
//     this.setStyle({"color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"
// })
// thecommonsnightsidearrow.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#000000c9",
//     "fillOpacity": "1"

// })
// })
// thecommonsnightsidetitle.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000004"})
//     this.setStyle({"fillColor": "#00000004"})
//     thecommonsnightsidearrow.setStyle({"color": "#00000004"})
//     thecommonsnightsidearrow.setStyle({"fillColor": "#00000004"})
// })
// //
// //
// //
// var clickBoundaryUnicornArrow= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [44.015625,33.87179272932949],
// [45.671875,36.09145541958042],
// [46.671875,35.87261543603455],
// [46.59375,37.81091243315508],
// [43.890625,36.79486965240642],
// [44.53125,36.31029540312628],
// [43.109375,34.637732671740025],
// [44.109375,33.96558129370629]
// ]]
// }    
// }]; 
// var theCommonsUnicornArrow = {
//     "color": "#00000005"
// }    

// var thecommonsunicornarrow = L.geoJSON(clickBoundaryUnicornArrow, {
//     style: theCommonsUnicornArrow
// }).addTo(map);    


// //hover over and out of merles house
// thecommonsunicornarrow.on('mouseover', function (e) {
//     this.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b920",
//     "fillOpacity": "1"
// })
// thecommonsunicorntitle.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"

// })
// })
// thecommonsunicornarrow.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000005"})
//     this.setStyle({"fillColor": "#00000005"})
//     thecommonsunicorntitle.setStyle({"color": "#00000005"})
//     thecommonsunicorntitle.setStyle({"fillColor": "#00000005"})
// })
// //
// //
// //
// var clickBoundaryUnicornTitle= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [40.734375,37.4185906005759],
// [39.703125,37.887533422459896],
// [39.234375,38.76289335664336],
// [39.265625,42.71764448786507],
// [39.515625,43.74931869600987],
// [39.859375,43.54611013986014],
// [40.046875,43.17095588235294],
// [40.375,43.030273035787744],
// [40.609375,43.59300442204854],
// [41.4375,43.608635849444674],
// [41.890625,43.65553013163307],
// [42.34375,43.733687268613735],
// [43.296875,43.733687268613735],
// [45.109375,43.718055841217605],
// [45.84375,43.67116155902921],
// [46.3125,43.51484728506787],
// [46.78125,43.67116155902921],
// [47.125,43.843107260386674],
// [47.625,43.702424413821475],
// [48.0625,43.49921585767174],
// [48.140625,43.858738687782804],
// [48.5,43.843107260386674],
// [48.953125,43.63989870423694],
// [49.40625,43.608635849444674],
// [49.734375,43.74931869600987],
// [50.125,43.78058155080214],
// [50.453125,43.624267276840804],
// [50.8125,43.624267276840804],
// [51.140625,43.63989870423694],
// [51.46875,43.51484728506787],
// [51.84375,43.26474444672974],
// [52.15625,43.74931869600987],
// [52.546875,43.63989870423694],
// [52.6875,43.18658730974907],
// [52.65625,38.30958196215549],
// [52.171875,37.574904874537225],
// [51.328125,37.40295917317977],
// [51,37.465484882764294],
// [50.5625,37.96569055944056],
// [50.171875,38.24705625257096],
// [49.640625,38.18453054298642],
// [49.125,38.18453054298642],
// [48.8125,38.29395053475936],
// [48.140625,38.20016197038256],
// [47.390625,38.18453054298642],
// [46.921875,38.21579339777869],
// [46.40625,38.10637340600576],
// [45.515625,38.137636260798025],
// [45.046875,38.09074197860963],
// [44.84375,38.278319107363224],
// [44.203125,38.09074197860963],
// [43.15625,38.05947912381736],
// [42.671875,38.043847696421224],
// [42.4375,38.15326768819416],
// [42.046875,38.043847696421224],
// [41.796875,37.99695341423283],
// [41.5625,38.043847696421224],
// [41.203125,37.903164849856026],
// [41.203125,37.68432486631016],
// [40.671875,37.559273447141095],
// [40.703125,37.449853455368164]
// ]]
// }    
// }];    

// var theCommonsUnicornTitle = {
//     "color": "#00000005"
// }    

// var thecommonsunicorntitle = L.geoJSON(clickBoundaryUnicornTitle, {
//     style: theCommonsUnicornTitle
// }).addTo(map);    


// //hover over and out of merles house
// thecommonsunicorntitle.on('mouseover', function (e) {
//     this.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"
// })
// thecommonsunicornarrow.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b920",
//     "fillOpacity": "1"

// })
// })
// thecommonsunicorntitle.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000005"})
//     this.setStyle({"fillColor": "#00000005"})
//     thecommonsunicornarrow.setStyle({"color": "#00000005"})
//     thecommonsunicornarrow.setStyle({"fillColor": "#00000005"})
// })
// //
// //
// //
// //
// //
// var clickBoundaryPetArrow= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [50.4375,16.015625],
// [51.46875,15.515625],
// [50.859375,14.671875],
// [54.765625,14.875],
// [53.203125,17.234375],
// [52.40625,16.625],
// [51.28125,17.265625],
// [50.5,16.09375]
// ]]
// }    
// }]; 
// var theCommonsPetArrow = {
//     "color": "#00000006"
// }    

// var thecommonspetarrow = L.geoJSON(clickBoundaryPetArrow, {
//     style: theCommonsPetArrow
// }).addTo(map);    


// //hover over and out of merles house
// thecommonspetarrow.on('mouseover', function (e) {
//     this.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b920",
//     "fillOpacity": "1"
// })
// thecommonspettitle.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"

// })
// })
// thecommonspetarrow.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000006"})
//     this.setStyle({"fillColor": "#00000006"})
//     thecommonspettitle.setStyle({"color": "#00000006"})
//     thecommonspettitle.setStyle({"fillColor": "#00000006"})
// })
// //
// //
// //
// //
// //
// //
// var clickBoundaryPetTitle= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [52.578125,14.262404874537228],
// [52.875,13.887250617030029],
// [53.15625,13.543359214315096],
// [53.40625,14.027933463595229],
// [53.671875,14.215510592348828],
// [54.203125,14.121722027972027],
// [55,14.231142019744961],
// [58.703125,14.387456293706293],
// [58.875,14.106090600575895],
// [59.484375,14.37182486631016],
// [59.921875,14.309299156725627],
// [60.34375,14.106090600575895],
// [60.8125,14.231142019744961],
// [61.15625,14.231142019744961],
// [61.625,14.059196318387494],
// [61.890625,14.13735345536816],
// [62.15625,14.309299156725627],
// [62.546875,14.18424773755656],
// [62.796875,14.13735345536816],
// [63.171875,14.168616310160427],
// [63.53125,14.199879164952694],
// [63.796875,13.762199197860962],
// [64.015625,13.840356334841628],
// [64.09375,14.168616310160427],
// [64.5,14.106090600575895],
// [64.671875,13.887250617030029],
// [64.765625,9.150928116001646],
// [64.625,9.02587669683258],
// [64.265625,8.55693387494858],
// [63.734375,8.228673899629781],
// [63.09375,8.228673899629781],
// [62.421875,8.55693387494858],
// [62,8.69761672151378],
// [61.375,8.822668140682847],
// [61.375,8.93208813245578],
// [60.828125,8.775773858494446],
// [53.8125,8.869562422871246],
// [53.90625,8.588196729740847],
// [53.78125,8.181779617441382],
// [53.34375,8.134885335252982],
// [52.859375,8.400619600987248],
// [52.390625,8.74451100370218],
// [52.15625,9.291610962566844],
// [52.234375,13.809093480049363],
// [52.515625,14.231142019744961]
// ]]
// }    
// }];    

// var theCommonsPetTitle = {
//     "color": "#00000005"
// }    

// var thecommonspettitle = L.geoJSON(clickBoundaryPetTitle, {
//     style: theCommonsPetTitle
// }).addTo(map);    


// //hover over and out of merles house
// thecommonspettitle.on('mouseover', function (e) {
//     this.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"
// })
// thecommonspetarrow.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b920",
//     "fillOpacity": "1"

// })
// })
// thecommonspettitle.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000005"})
//     this.setStyle({"fillColor": "#00000005"})
//     thecommonspetarrow.setStyle({"color": "#00000005"})
//     thecommonspetarrow.setStyle({"fillColor": "#00000005"})
// })
// //
// //

// //
// //
// //
// //
// //
// var clickBoundaryShopArrow= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [32.390625,11.65625],
// [33.59375,11.921875],
// [33.984375,9.859375],
// [34.90625,9.9375],
// [33.875,6.921875],
// [31.734375,9.328125],
// [32.578125,9.515625],
// [32.296875,11.625]
// ]]
// }    
// }]; 
// var theCommonsShopArrow = {
//     "color": "#00000006"
// }    

// var thecommonsshoparrow = L.geoJSON(clickBoundaryShopArrow, {
//     style: theCommonsShopArrow
// }).addTo(map);    


// //hover over and out of merles house
// thecommonsshoparrow.on('mouseover', function (e) {
//     this.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b920",
//     "fillOpacity": "1"
// })
// thecommonsshoptitle.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"

// })
// })
// thecommonsshoparrow.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000006"})
//     this.setStyle({"fillColor": "#00000006"})
//     thecommonsshoptitle.setStyle({"color": "#00000006"})
//     thecommonsshoptitle.setStyle({"fillColor": "#00000006"})
// })
// //
// //
// //
// //
// //
// //
// var clickBoundaryShopTitle= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [36.328125,3.7923308309337713],
// [35.265625,4.527007918552037],
// [35.28125,9.341487556561086],
// [35.71875,9.904218942821885],
// [48.6875,9.872956088029618],
// [48.828125,9.529064685314685],
// [48.8125,4.667690765117236],
// [48.46875,4.011170814479637],
// [47.9375,3.714173693953107],
// [47.09375,3.8548565405183055],
// [46.484375,4.308167935006168],
// [37.359375,4.292536507610038],
// [37.234375,3.7766994035376413],
// [36.46875,3.6360165569724394],
// [35.828125,3.7454365487453742]
// ]]
// }    
// }];    

// var theCommonsShopTitle = {
//     "color": "#00000005"
// }    

// var thecommonsshoptitle = L.geoJSON(clickBoundaryShopTitle, {
//     style: theCommonsShopTitle
// }).addTo(map);    


// //hover over and out of merles house
// thecommonsshoptitle.on('mouseover', function (e) {
//     this.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"
// })
// thecommonsshoparrow.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b920",
//     "fillOpacity": "1"

// })
// })
// thecommonsshoptitle.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000005"})
//     this.setStyle({"fillColor": "#00000005"})
//     thecommonsshoparrow.setStyle({"color": "#00000005"})
//     thecommonsshoparrow.setStyle({"fillColor": "#00000005"})
// })
// //
// //

// //
// var clickBoundaryGolemTitle= [{
//     "type": "Feature",
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [14.25,24.636022984368573],
// [10.59375,26.652477118469765],
// [9.90625,26.1053771596051],
// [9.15625,27.99677987453723],
// [4.40625,28.11857260386672],
// [3.875,27.64962978198272],
// [3.40625,33.808412176059235],
// [12.46875,33.8396750308515],
// [12.84375,33.62083504730563],
// [13.125,33.87093788564377],
// [13.5,33.77714932126697],
// [13.5,28.900143973673387],
// [13.25,28.05604689428219],
// [12.875,27.743418346359523],
// [12.28125,27.712155491567255],
// [11.875,27.868469765528587],
// [11.75,27.39952694364459],
// [15.15625,25.429967091731797],
// [14.375,24.617132867132867]
// ]]
// }    
// }];    

// var theCommonsGolemTitle = {
//     "color": "#00000005"
// }    

// var thecommonsgolemtitle = L.geoJSON(clickBoundaryGolemTitle, {
//     style: theCommonsGolemTitle
// }).addTo(map);    


// //hover over and out of merles house
// thecommonsgolemtitle.on('mouseover', function (e) {
//     this.setStyle({
//     "color": "#fffe65",
//     "fillColor": "#d5b92040",
//     "fillOpacity": "1"
// })
// })
// thecommonsgolemtitle.on('mouseout', function (e) {
//     this.setStyle({"color": "#00000005"})
//     this.setStyle({"fillColor": "#00000005"})
// })
// //
// //

// //

}