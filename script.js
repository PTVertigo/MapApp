let map;
let markers = {}; 
let markerStack = [];

function initMap() {
    let mohawkLocation = { lat: 43.2387, lng: -79.8881 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: mohawkLocation,
        zoom: 12,
        mapId: "MAP_ID_GOES_HERE"
    });


    addMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College");
}
// Address Finder Function
function codeAddress() {
    let address = document.getElementById('address').value;

    // perform geocoding for the address entered into the input textbox, a 
    // callback function is given the latitude and longitude as an an 
    // argument as part of a results object..
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        
        // we could center the map at the location
        // map.setCenter(results[0].geometry.location);
        
        // put the latitude and longitude on the page as text
        document.getElementById("coords").innerHTML =
          "coords: " + 
          results[0].geometry.location.lat() + ", " + 
          results[0].geometry.location.lng();
         
        // put a marker on the map at the given position
        var marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: results[0].geometry.location
        });
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
document.getElementById("remove_last").addEventListener("click", removeLastMarker);
document.getElementById("remove_aviation").addEventListener("click", () => removeMarker("Mohawk College Aviation Campus"));
document.getElementById("remove_fennell").addEventListener("click", () => removeMarker("Mohawk College Fennell Campus"));
document.getElementById("add_aviation").addEventListener("click", () => 
    addMarker("Mohawk College Aviation Campus", 43.1632, -79.9266 , "Mohawk College"));
document.getElementById("add_fennell").addEventListener("click", () =>
    addMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College"));



initMap();