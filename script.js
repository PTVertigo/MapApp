let map, geocoder, infoWindow;
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

    addColourMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College", "Mohawk Campus", mohawkIcon);
    
    // create the infowindow... we only create ONE infowindow and move it 
      // around and set its content when a marker is clicked as need be.
      infoWindow = new google.maps.InfoWindow();
      
      // when the marker is clicked, this function will run to open the 
      // infowindow... the "this" keyword will refer to the marker/object 
      // that was actually clicked... we'll use *that* to open the 
      // infowindow at that marker's location, and we'll store the name 
      // of each school in the "NAME" property of each marker object (each
      // marker is ultimately a javascript object, we can set whatever keys
      // we like...).
      let marker_clicked = function() {
        infoWindow.close(); // Close previously opened infowindow
        infoWindow.setContent(this.NAME);
        infoWindow.open(map, this);
      }
// for (let i = 0; i < waterfalls.length; i++) {
//     let waterfall = waterfalls[i];
//     // create a new icon for the marker
//     if (waterfall.properties.COMMUNITY == "Dundas")
//         new_icon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
//     else if (waterfall.properties.COMMUNITY == "Hamilton")
//         new_icon = "http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png";
//     else if (waterfall.properties.COMMUNITY == "Stoney Creek")
//         new_icon = "http://maps.google.com/mapfiles/kml/paddle/pink-blank.png";
//     else if (waterfall.properties.COMMUNITY == "Ancaster")
//         new_icon = "http://maps.google.com/mapfiles/kml/paddle/ltblu-blank.png";
//     else if (waterfall.properties.COMMUNITY == "Flamborough")
//         new_icon = "http://maps.google.com/mapfiles/kml/paddle/purple-blank.png";
//     else if (waterfall.properties.COMMUNITY == "Glanbrook")
//         new_icon = "http://maps.google.com/mapfiles/kml/paddle/orange-blank.png";
//     else
//         new_icon = "http://maps.google.com/mapfiles/kml/paddle/wht-blank.png";

//     addColourMarker(
//         waterfall.properties.NAME,
//         waterfall.geometry.coordinates[1],
//         waterfall.geometry.coordinates[0],
//         waterfall.properties.NAME,
//         new_icon
//     );
//      }
    
}

// Function to load Stoney Creek waterfalls
function loadStoneyC() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Stoney Creek") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/S.png";

            addColourMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon
            );
        }
    }
}

// Function to load Hamilton waterfalls
function loadHamilton() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Hamilton") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/H.png";

            addColourMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon
            );
        }
    }
}

// Function to load Flamborough waterfalls
function loadFlamborough() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Flamborough") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/F.png";

            addColourMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon
            );
        }
    }
}

// Function to load Glanbrook waterfalls
function loadBurlington() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Burlington") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/B.png";

            addColourMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon
            );
        }
    }
}

// Function to load Ancaster waterfalls
function loadAncaster() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Ancaster") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/A.png";

            addColourMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon
            );
        }
    }
}

// Function to load Dundas waterfalls
function loadDundas() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Dundas") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/D.png";

            addColourMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon
            );
        }
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

function addColourMarker(name, lat, lng, title, community, icon) {
    if (!markers[name]) { 
        // create the icon element
        const icon_content = document.createElement("img");
        icon_content.src = icon; // use the passed icon URL
        icon_content.style.width = "32px"; // Adjust size if necessary
        icon_content.style.cursor = "pointer"; // Make it clickable

        // create the marker with the icon
        markers[name] = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: { lat: lat, lng: lng },
            title: title,
            content: icon_content // add the icon to the marker
        });

        // Content for the infoWindow
        let contentString = `<div>
                                <h2>${name}</h2>
                                <p>Community: ${community}</p>
                                <p>Location: ${lat}, ${lng}</p>
                             </div>`;

        // Add click event to open infoWindow
        markers[name].addListener("click", () => {
            infoWindow.close(); // Close previously opened infowindow
            infoWindow.setContent(contentString);
            infoWindow.open(map,markers[name]);
        });
    }

    markerStack.push(name); // Add the marker name to the stack
}



// function addColourMarker(name, lat, lng, title, icon) {
//     if (!markers[name]) { 
//         // create the icon element
//         const icon_content = document.createElement("img");
//         icon_content.src = icon; // use the passed icon URL

//         // create the marker with the icon
//         markers[name] = new google.maps.marker.AdvancedMarkerElement({
//             map: map,
//             position: { lat: lat, lng: lng },
//             title: title,
//             content: icon_content // add the icon to the marker
//         });
//     }

//     markerStack.push(name); // Add the marker name to the stack
// }


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
document.getElementById("add_Hamilton").addEventListener("click", loadHamilton);
document.getElementById("add_Dundas").addEventListener("click", loadDundas);
document.getElementById("add_Ancaster").addEventListener("click", loadAncaster);
document.getElementById("add_StoneyCreek").addEventListener("click", loadStoneyC);
document.getElementById("add_Burlington").addEventListener("click", loadBurlington);
document.getElementById("add_Flamborough").addEventListener("click", loadFlamborough);

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    codeAddress(); // Call function to geocode and add marker
});
document.getElementById("remove_last").addEventListener("click", removeLastMarker);

