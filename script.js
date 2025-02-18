let map, geocoder, infoWindow, directionsService, directionsRenderer;
let selectedDropdown;
let markers = {}; 
let markerStack = [];
let iconStack = [];
let isSubmitted = false;


function initMap() {
    let mohawkLocation = { lat: 43.2387, lng: -79.8881 };
    let starterIcon = "https://maps.google.com/mapfiles/kml/paddle/orange-stars.png";

    map = new google.maps.Map(document.getElementById("map"), {
        center: mohawkLocation,
        zoom: 11,
        mapId: "2ca3e5ed6f5789e3",
    });

    infoWindow = new google.maps.InfoWindow();

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true // This prevents markers from being shown at the origin and destination
    });
    directionsRenderer.setMap(map);


    addColourMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College", "Mohawk Campus", starterIcon);
    
}

// Directions function to calculate route
function getRoute(origin, destination, travelMode = 'DRIVING') {

    // Create a directions request
    let request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode[travelMode] // Use Google Maps Travel Modes
    };

    // Call the Directions Service
    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            console.error("Error getting directions:", status);
            alert("Could not retrieve directions: " + status);
        }
    });
}

// Function to get route to a marker
function getRouteToMarker(destLat, destLng) {
    let origin;
    
    if (isSubmitted === true) {
        let address = document.getElementById('address').value;
        origin = address;
    } else {
        // Call getCurrentPosition and pass a callback to handle the route once the position is retrieved
        getCurrentLocation((lat, lng) => {
            addColourMarker("Current Location", lat, lng, "You are here", "Your Location", "https://maps.google.com/mapfiles/kml/shapes/man.png");
            origin = { lat: lat, lng: lng }; // Set origin to the current position
            getRoute(origin, { lat: destLat, lng: destLng }); // Call getRoute once we have the origin
        });
        return; // Return early because we're awaiting the geolocation result
    }

    // Call getRoute with entered address if origin was provided
    getRoute(origin, { lat: destLat, lng: destLng });
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
function getAddress(address, icon, iconName) {
    // geocoder service object
    geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
         
        // put a marker on the map at the given position
        addColourMarker("Search Result", results[0].geometry.location.lat(), results[0].geometry.location.lng(), "Search Result", "", icon);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    iconStack.push(iconName);
}

// Function to add a marker with a custom icon
function addColourMarker(name, lat, lng, title, community, icon) {
    if (!markers[name]) { 
        // create the icon element
        const icon_content = document.createElement("img");
        icon_content.src = icon; // use the passed icon URL
        icon_content.style.width = "40px"; // Adjust size if necessary
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
                                <button onclick="getRouteToMarker(${lat}, ${lng})">Get Directions</button>
                             </div>`;

        // Add click event to open infoWindow
        markers[name].addListener("click", () => {
            infoWindow.close(); // Close previously opened infowindow
            infoWindow.setContent(contentString);
            infoWindow.open(map,markers[name]);
            map.panTo({ lat: lat, lng: lng }); // Pan to the marker when clicked
            map.setZoom(12); // Zoom in when marker is clicked
        });
    }

    markerStack.push(name); // Add the marker name to the stack
}

function removeMarker(name) {
    if (markers[name]) {
        markers[name].map = null; // Unset the map reference
        markers[name].dispose(); // Properly remove the marker from the DOM
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
// error function
function showError(error) {
    // the error function is given an error object containing a code property
    // that we can look at to determine which error occurred...
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
            break;
            case error.POSITION_UNAVAILABLE:
                 alert("Location information is unavailable.");
            break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
            break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
            break;
        }
    }

// success function
function showPosition() {
    getCurrentLocation((lat, lng) => {
    document.getElementById("geo_locate").innerHTML =
        "Latitude: " +
        lat +
        "<br>Longitude: " +
        lng
        let icon = "https://maps.google.com/mapfiles/kml/shapes/man.png";
        addColourMarker("Current Location", lat, lng, "You are here", "Your Location", icon);
    });
}

// Created a call back function to be abel to use the lat and lng in other functions
function getCurrentLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                callback(lat, lng); 
            },
            showError
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}



// Example button event listeners
document.getElementById("add_Hamilton").addEventListener("click", loadHamilton);
document.getElementById("add_Dundas").addEventListener("click", loadDundas);
document.getElementById("add_Ancaster").addEventListener("click", loadAncaster);
document.getElementById("add_StoneyCreek").addEventListener("click", loadStoneyC);
document.getElementById("add_Burlington").addEventListener("click", loadBurlington);
document.getElementById("add_Flamborough").addEventListener("click", loadFlamborough);
document.getElementById("locate_me").addEventListener("click", showPosition);

// Store the selected dropdown item
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        selectedDropdown = this.id;  // Save the selected dropdown item's ID
        console.log("Selected dropdown option:", selectedDropdown);
    });
});

document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission to handle it manually
    isSubmitted = true;

    let address = document.getElementById('address').value; 

    if (selectedDropdown == "green_house") {
        if(iconStack.at(-1) == "green_car" || iconStack.at(-1) == "gree_arrow") {
            removeMarker("Search Result");
            let new_icon = "https://maps.google.com/mapfiles/kml/shapes/ranger_station.png";
            getAddress(address, new_icon, "green_house");
        }
        else{
            let new_icon = "https://maps.google.com/mapfiles/kml/shapes/ranger_station.png";
            getAddress(address, new_icon, "green_house");
            console.log(new_icon);
        }
        } else if (selectedDropdown == "green_car") {
        if(iconStack.at(-1) == "green_house" || iconStack.at(-1) == "gree_arrow") {
            removeMarker("Search Result");
            let new_icon = "https://maps.google.com/mapfiles/kml/pal4/icon62.png";
            getAddress(address, new_icon, "green_car");
        }
        else {
            let new_icon = "https://maps.google.com/mapfiles/kml/pal4/icon62.png";
            getAddress(address, new_icon, "green_car");
        }
        } else if (selectedDropdown == "green_arrow") {
        if(iconStack.at(-1) == "green_car" || iconStack.at(-1) == "green_house") {
            removeMarker("Search Result");
            let new_icon = "https://www.google.com/mapfiles/arrow.png";
            getAddress(address, new_icon, "gree_arrow");
        }
        else {
            let new_icon = "https://www.google.com/mapfiles/arrow.png";
            getAddress(address, new_icon, "gree_arrow");
        }
        } else {
        alert("!! Please select an Icon before enetering the address !!");
    }
});
  
// document.getElementById("submit").addEventListener("click", getAddress);
document.getElementById("remove_last").addEventListener("click", removeMarker("Search Result"));

