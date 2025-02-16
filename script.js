let map;
let markers = {}; 

function initMap() {
    let mohawkLocation = { lat: 43.2387, lng: -79.8881 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: mohawkLocation,
        zoom: 12,
        mapId: "MAP_ID_GOES_HERE"
    });


    addMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College");
}

// Function to add a marker
function addMarker(name, lat, lang, title) {

    if (!markers[name]) { 
        markers[name] = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: { lat: lat, lng: lang },
            title: title
        });
    }
}

// Function to remove a marker
function removeMarker(name) {
    if (markers[name]) {
        markers[name].position = null; // Remove from the map
        delete markers[name]; // Remove from the object
    }
}

// Example button event listeners
document.getElementById("remove_aviation").addEventListener("click", () => removeMarker("Mohawk College Aviation Campus"));
document.getElementById("remove_fennell").addEventListener("click", () => removeMarker("Mohawk College Fennell Campus"));
document.getElementById("add_aviation").addEventListener("click", () => 
    addMarker("Mohawk College Aviation Campus", 43.1632, -79.9266 , "Mohawk College"));
document.getElementById("add_fennell").addEventListener("click", () =>
    addMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College"));


initMap();