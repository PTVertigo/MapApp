let map, geocoder;
let markers = {}; 
let markerStack = [];

function initMap() {
    let mohawkLocation = { lat: 43.2387, lng: -79.8881 };
    let mohawkIcon = "https://maps.google.com/mapfiles/kml/paddle/orange-stars.png";

    map = new google.maps.Map(document.getElementById("map"), {
        center: mohawkLocation,
        zoom: 11,
        mapId: "MAP_ID_GOES_HERE"
    });

    addColourMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College", mohawkIcon);
    //put markers on the map for all the schools in waterfalls.js 
for (let i = 0; i < waterfalls.length; i++) {
    let waterfall = waterfalls[i];
    // create a new icon for the marker
    if (waterfall.properties.COMMUNITY == "Dundas")
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
    else if (waterfall.properties.COMMUNITY == "Hamilton")
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png";
    else if (waterfall.properties.COMMUNITY == "Stoney Creek")
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/pink-blank.png";
    else if (waterfall.properties.COMMUNITY == "Ancaster")
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/ltblu-blank.png";
    else if (waterfall.properties.COMMUNITY == "Flamborough")
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/purple-blank.png";
    else if (waterfall.properties.COMMUNITY == "Glanbrook")
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/orange-blank.png";
    else
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/wht-blank.png";

    addColourMarker(
        waterfall.properties.NAME,
        waterfall.geometry.coordinates[1],
        waterfall.geometry.coordinates[0],
        waterfall.properties.NAME,
        new_icon
    );
     }
    
}


// Address Finder Function
function codeAddress() {
    let address = document.getElementById('address').value;
    // geocoder service object
    geocoder = new google.maps.Geocoder();

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
function addMarker(name, lat, lng, title) {
    if (!markers[name]) { 
    
        // create the marker with the icon
        markers[name] = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: { lat: lat, lng: lng },
            title: title,
        });
    }

    markerStack.push(name); // Add the marker name to the stack
}
function addColourMarker(name, lat, lng, title, icon) {
    if (!markers[name]) { 
        // create the icon element
        const icon_content = document.createElement("img");
        icon_content.src = icon; // use the passed icon URL

        // create the marker with the icon
        markers[name] = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: { lat: lat, lng: lng },
            title: title,
            content: icon_content // add the icon to the marker
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

$(document).ready(function () {
    // element where we will output either our location or the error
    var x = document.getElementById("geo_locate");

    // success function
    function showPosition(position) {
      // the success is given a position object containing latitude and longitude
      // data by getGetCurrentPosition, let's output the latitude and longitude
      x.innerHTML =
        "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude;

      // check out what the position object looks like in the sconsole
      console.log(position);
    }

    // error function
    function showError(error) {
      // the error function is given an error object containing a code property
      // that we can look at to determine which error occurred...
      switch (error.code) {
        case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred.";
          break;
      }
    }

    // we'll call this function to perform geolocation
    function getLocation() {
      // if navigator.geolocation doesn't exist, the browser does not support
      // geolocaation... geolocation is an HTML5 feature so virtually all browers
      // now support it
      if (navigator.geolocation) {
        // call getCurrentPosition, give it our success and error functions
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    // call the getLocation function when the user clicks the geolocate button
    document.getElementById("locate_me").onclick = getLocation;
  });

// Example button event listeners
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    codeAddress(); // Call function to geocode and add marker
});
document.getElementById("green_house").addEventListener("click", removeLastMarker);
document.getElementById("remove_last").addEventListener("click", removeLastMarker);
document.getElementById("remove_aviation").addEventListener("click", () => removeMarker("Mohawk College Aviation Campus"));
document.getElementById("remove_fennell").addEventListener("click", () => removeMarker("Mohawk College Fennell Campus"));
document.getElementById("add_aviation").addEventListener("click", () => 
    addMarker("Mohawk College Aviation Campus", 43.1632, -79.9266 , "Mohawk College"));
document.getElementById("add_fennell").addEventListener("click", () =>
    addMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College"));



