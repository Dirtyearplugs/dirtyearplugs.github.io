var data
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './database.db', true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function (e) {
        var uInt8Array = new Uint8Array(this.response);
        var db = new SQL.Database(uInt8Array);

        // Now you can run SQL queries on the db object.
        data = db.exec("SELECT * FROM eoitems");
        console.log(data);
    };

    xhr.send();
}
function getDataByName(name) {
    let title_name = toTitleCase(name)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './database.db', true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function (e) {
        var uInt8Array = new Uint8Array(this.response);
        var db = new SQL.Database(uInt8Array);

        // Now you can run SQL queries on the db object.
        let query_string = "SELECT * FROM eoitems"
        let addition = " WHERE \"Name\" = '" + title_name + "'"
        let query = query_string + addition
        data = db.exec(query);
        console.log(data);
    };

    xhr.send();
}
function getDataByID(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './database.db', true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function (e) {
        var uInt8Array = new Uint8Array(this.response);
        var db = new SQL.Database(uInt8Array);

        // Now you can run SQL queries on the db object.
        let query_string = "SELECT * FROM eoitems"
        let addition = " WHERE \"ID\" = " + int(id)
        let query = query_string + addition
        data = db.exec(query);
        // console.log(data);
    };

    xhr.send();
}



$(document).ready(function () {
    $('#popup_background').click(function (e) {
        if (e.target.classList[0] == "npc_inv") {

        }
        else if (e.originalEvent.srcElement.id == "sell"){
            $("#npc_content").empty()
        }
        else if (e.originalEvent.srcElement.id == "buy"){
            $("#npc_content").empty()
        }
        else {
            $('#popup_background').css('display', 'none');
            console.log(e)

        }
        // console.log(e)
        // if $(".npc_inv")
        // $("#login_popup_modal").css("display", "block")
    })
});

const shop_npc_stroke = 'ff0000'
const quest_npc_stroke = '1ecbe1'

function deleteCurrentMap(map) {
        //console.log("currentmap")
        //console.log(currentmap)
        //map.off()
        //map.remove()
        //map = undefine
        try {

            map.remove()
            let newHeight = ($(window).height() - 10)
            document.getElementById('map').outerHTML = "<div id='map' style='height:" + newHeight + "px;'></div>";
            resolve(map);
        }
        catch {

            reject()
        }
}
function loadCommons() {
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

    function open_shop_info(shop) {
        $("#popup_background").css('display', 'flex');
        console.log("shop: ", shop)
        $("#npc_title").html("<h1 style='color:white;pointer-events:none'>"+shop.name +"</h1>")
        // build_shop_table(shop)

    }

    function open_quest_npc(fill) {
        for (let i = 0; i < aeven_quest_npcs.length; i++) {
            if (aeven_quest_npcs[i].fill === fill) {
                return console.log(aeven_quest_npcs[i])
            }
        }

        // Return null if no matching object is found
        return null;
    }
    function open_shop_npc(fill) {
        return new Promise(function (resolve, reject) {
            for (let i = 0; i < aeven_shop_npcs.length; i++) {
                if (aeven_shop_npcs[i].fill === fill) {
                    resolve(aeven_shop_npcs[i])
                }
            }

            // Return null if no matching object is found
            resolve(null);
        })
    }

    map.on('click', function (e) {
        try {

            var stroke = e.originalEvent.target.attributes.stroke.nodeValue;
            var target = e.originalEvent.target.attributes.fill.nodeValue;
            console.log(e)
            // console.log(stroke)
            // console.log(target)
            if (stroke == "#ff0000") {
                // handle the event for the path
                // open_shop_npc(target.replace("#",""))
                //then
                // open_shop_info(open_shop_npc(target.replace("#", "")))
                open_shop_npc(target.replace("#", "")).then(function (resolve) {
                    return open_shop_info(resolve);
                })
            }
            else if (stroke == "#1ecbe1") {
                open_quest_npc(target.replace("#", ""))

            }
            else {
                // console.log(e.latlng.lng+"," + e.latlng.lat)
            }
        }
        catch {
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
            "center": [49.53125, 33.00360609757612],
            "buy_items" : [213],
            "sell_items" : []
        },
        {
            "name": "Farmer Merchant",
            "fill": "00000003",
            "center": [45.94921875, 30.92489618516035]
        },
        {
            "name": "Happy Berry Jane",
            "fill": "00000004",
            "center": [51.19921875, 34.30407730001738]
        },
        {
            "name": "Happy Berry Mike",
            "fill": "00000005",
            "center": [49.15625, 35.08554719190301]
        },
        {
            "name": "Barry Trade",
            "fill": "00000006",
            "center": [42.34765625, 33.491348612456335]
        },
        {
            "name": "Packer Piper",
            "fill": "00000007",
            "center": [46.890625, 36.43338925054637]
        },
        {
            "name": "Shady Potion Merchant",
            "fill": "00000008",
            "center": [42.68359375, 40.046806833515454]
        },
        {
            "name": "Packer Piper",
            "fill": "00000009",
            "center": [10.8203125, 32.80071748135317]
        },
        {
            "name": "Creative Caroline",
            "fill": "00000010",
            "center": [39.984375, 31.46260744952317]
        }
    ]
    var aeven_quest_npcs = [
        {
            "name": "Goat Collector",
            "fill": "00000011",
            "center": [45.12890625, 35.030946549197836]
        },
        {
            "name": "Foreman",
            "fill": "00000012",
            "center": [25.09765625, 31.45640016028825]
        },
        {
            "name": "Shady Doorkeeper",
            "fill": "00000013",
            "center": [27.81640625, 39.40919312354095]
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
            L.DomEvent.on(button, 'click', function () {
                console.log('clicked control!');
            });

            container.title = "Title";
            container.html = "<p>Title</p>";
            console.log(container)

            return container;
        },
        onRemove: function (map) { },
    });
    var control = new L.Control.Button()
    control.addTo(map);

}