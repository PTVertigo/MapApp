let map, geocoder;
let markers = {}; 
let markerStack = [];

function initMap() {
    let mohawkLocation = { lat: 43.2387, lng: -79.8881 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: mohawkLocation,
        zoom: 12,
        mapId: "MAP_ID_GOES_HERE"
    });

    // geocoder service object
    geocoder = new google.maps.Geocoder();

    addMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College");
}
// Address Finder Function
function codeAddress() {
    let address = document.getElementById('address').value;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
         
        // put a marker on the map at the given position
        addMarker("Search Result", results[0].geometry.location.lat(), results[0].geometry.location.lng(), "Search Result");
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
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
    markerStack.push(name); // Add the marker name to the stack
}

// Function to remove a marker
function removeMarker(name) {
    if (markers[name]) {
        markers[name].position = null; // Remove from the map
        delete markers[name]; // Remove from the object
    }
}

// Function to remove the last added marker
function removeLastMarker() {
    const lastMarkerName = markerStack.pop(); // Get the last added marker's name
    if (lastMarkerName) {
        removeMarker(lastMarkerName); // Remove it from the map
    }
}

// Example button event listeners
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    codeAddress(); // Call function to geocode and add marker
});
document.getElementById("remove_last").addEventListener("click", removeLastMarker);
document.getElementById("remove_aviation").addEventListener("click", () => removeMarker("Mohawk College Aviation Campus"));
document.getElementById("remove_fennell").addEventListener("click", () => removeMarker("Mohawk College Fennell Campus"));
document.getElementById("add_aviation").addEventListener("click", () => 
    addMarker("Mohawk College Aviation Campus", 43.1632, -79.9266 , "Mohawk College"));
document.getElementById("add_fennell").addEventListener("click", () =>
    addMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College"));



