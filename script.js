// StAuth10244: I Pouya Tayyari, 000949516 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

let map, geocoder, infoWindow, directionsService, directionsRenderer;
let firstDropdown;
let secondDropdown;
const mohawkLocation = { lat: 43.2387, lng: -79.8881 };
let markers = {}; 
let markerStack = [];
let iconStack = [];
let isSubmitted = false;


function initMap() {
    let schoolIcon = "https://maps.google.com/mapfiles/kml/shapes/schools.png";
    let contentStrings = [];

    map = new google.maps.Map(document.getElementById("map"), {
        center: mohawkLocation,
        zoom: 9,
        mapId: "2ca3e5ed6f5789e3",
    });

    geocoder = new google.maps.Geocoder();
    infoWindow = new google.maps.InfoWindow();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true // This prevents markers from being shown at the origin and destination
    });
    directionsRenderer.setMap(map);

    campusData.forEach(campus => {
        contentStrings.push(`
          <div class="infoWindow">
            <img src="${campus.src}" />
            <h2><br>${campus.h2}</h2>
            <h3 class="text-decoration-underline">${campus.h3}</h3>
            <p>${campus.p}</p>
            <button onclick="getRouteToMarker(${campus.lat}, ${campus.lng})" type="button" class="btn btn-dark btn-sm">
              Get Directions
            </button>
          </div>
        `);
    });

    campusData.forEach((campus, index) => {
        addColourMarker(campus.h2, campus.lat, campus.lng, "Mohawk College", schoolIcon, contentStrings[index]);
    });

}

// Directions function to calculate route
function getRoute(origin, destination, travelMode) {

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
    let address = document.getElementById('address').value;

    if (isSubmitted === true) {
        origin = address;
        infoWindow.close();
    } else {
        // Call getCurrentPosition and pass a callback to handle the route once the position is retrieved
        getCurrentLocation((lat, lng) => {
            geocoder.geocode({ location: { lat: lat, lng: lng } }, (results, status) => { 
                if (status === "OK" && results[0]) {
                    origin = results[0].formatted_address; // Set origin from geocoding
                    let distance = getDistance(destLat, destLng, lat, lng);
                    let destinationName = isSubmitted && address || "your selected destination";
                    let addressContent = `<div class="infoWindow">
                                        <h2>${origin}</h2>
                                        <p>Currently located at: ${lat}, ${lng}</p>
                                        <p>You are approximately ${distance} km away from ${destinationName}</p>
                                      </div>`;
                    let midPoint = getMidpoint(destLat, destLng, lat, lng);

                    // Center and zoom map
                    map.setCenter(midPoint);
                    map.setZoom(9);

                    // Add a marker
                    let icon = "https://maps.google.com/mapfiles/kml/shapes/man.png";
                    addColourMarker(origin, lat, lng, "Your Location", icon, addressContent);

                    // Call getRoute with selected travel mode
                    if (secondDropdown === "driving") {
                        getRoute(origin, { lat: destLat, lng: destLng }, "DRIVING");
                    } else if (secondDropdown === "walking") {
                        getRoute(origin, { lat: destLat, lng: destLng }, "WALKING");
                    } else if (secondDropdown === "transit") {
                        getRoute(origin, { lat: destLat, lng: destLng }, "TRANSIT");
                    } else {
                        alert("!! Please select a Travel Mode before getting the route !!");
                    }
                    infoWindow.close();
                } else {
                    console.error("Geocode was not successful: " + status);
                    alert("Geocoding failed. Please try again.");
                }
            });
        });

        return; // Ensure function doesn't execute further while waiting for geolocation
    }

    // If the address is provided, call getRoute with the entered address and the selected travel mode
    if (secondDropdown === "driving") {
        getRoute(origin, { lat: destLat, lng: destLng }, "DRIVING");
    } else if (secondDropdown === "walking") {
        getRoute(origin, { lat: destLat, lng: destLng }, "WALKING");
    } else if (secondDropdown === "transit") {
        getRoute(origin, { lat: destLat, lng: destLng }, "TRANSIT");
    } else {
        alert("!! Please select a Travel Mode before getting the route !!");
    }
    infoWindow.close();
}


// Function to add a marker with a custom icon
function addColourMarker(name, lat, lng, title, icon, contentString) {
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


        // Add click event to open infoWindow
        markers[name].addListener("click", () => {
            clearDirections();
            infoWindow.close(); // Close previously opened infowindow
            infoWindow.setContent(contentString);
            infoWindow.open(map,markers[name]);
            map.panTo({ lat: lat, lng: lng }); // Pan to the marker when clicked
            map.setZoom(12); // Zoom in when marker is clicked
        });
    }

    markerStack.push(name); // Add the marker name to the stack
}

// Function to add a waterfalls marker with a custom icon
function addWaterfallMarker(name, lat, lng, title, community, icon, type, Cluster_area, Height_In_M, Width_In_M, Ranking, Ownership, Access_From) {
    if (!markers[name]) { 
        // create the icon element
        const icon_content = document.createElement("img");
        icon_content.src = icon; 
        icon_content.style.width = "40px"; // Adjusting the size
        icon_content.style.cursor = "pointer"; 

        // create the marker with the icon
        markers[name] = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: { lat: lat, lng: lng },
            title: title,
            content: icon_content // add the icon to the marker
        });

        // Content for the infoWindow
        let contentString = `<div class="infoWindow">
                        <img src="./images/Hamilton_logo.png"
                                    alt="Bootstrap"
                                    width="132"
                                    height="30"
                        class="d-inline-block align-text-top" />
                        <h2>${name}</h2>
                        <p>Located in the beautiful community of ${community}, ${name} is a picturesque ${type} within the ${Cluster_area} cluster area. 
                        Standing at a height of ${Height_In_M} meters and a width of ${Width_In_M} meter, this waterfall is one of the many beautiful waterfalls that this community holds in itself.</p>
                        <p>Ranked as a ${Ranking}-level waterfall, ${name} is publicly accessible (${Ownership} ownership) and can be reached via ${Access_From}. 
                        Whether you're exploring the natural beauty of the area or just passing by, this cascade is a delightful spot to visit.</p>
                        <button onclick="getRouteToMarker(${lat}, ${lng})" type="button" class="btn btn-dark btn-sm">Get Directions</button>
                    </div>`;

        // Add click event to open infoWindow
        markers[name].addListener("click", () => {
            clearDirections();
            infoWindow.close(); // Close previously opened infowindow
            infoWindow.setContent(contentString);
            infoWindow.open(map,markers[name]);
            map.panTo({ lat: lat, lng: lng }); // Pan to the marker when clicked
            map.setZoom(12); // Zoom in when marker is clicked
        });
    }

    markerStack.push(name); // Add the marker name to the stack
}


// Function to load Stoney Creek waterfalls
function loadStoneyC() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Stoney Creek") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/S.png";

            addWaterfallMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon,
                waterfall.properties.TYPE,
                waterfall.properties.CLUSTER_AREA,
                waterfall.properties.HEIGHT_IN_M,
                waterfall.properties.WIDTH_IN_M,
                waterfall.properties.RANKING,
                waterfall.properties.OWNERSHIP,
                waterfall.properties.ACCESS_FROM
            );
        }
    }
    map.setZoom(11);
}


// Function to load Hamilton waterfalls
function loadHamilton() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Hamilton") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/H.png";

            addWaterfallMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon,
                waterfall.properties.TYPE,
                waterfall.properties.CLUSTER_AREA,
                waterfall.properties.HEIGHT_IN_M,
                waterfall.properties.WIDTH_IN_M,
                waterfall.properties.RANKING,
                waterfall.properties.OWNERSHIP,
                waterfall.properties.ACCESS_FROM
            );
        }
    }
    map.setZoom(11);

}

// Function to load Flamborough waterfalls
function loadFlamborough() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Flamborough") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/F.png";

            addWaterfallMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon,
                waterfall.properties.TYPE,
                waterfall.properties.CLUSTER_AREA,
                waterfall.properties.HEIGHT_IN_M,
                waterfall.properties.WIDTH_IN_M,
                waterfall.properties.RANKING,
                waterfall.properties.OWNERSHIP,
                waterfall.properties.ACCESS_FROM
            );
        }
    }
    map.setZoom(11);

}

// Function to load Glanbrook waterfalls
function loadBurlington() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Burlington") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/B.png";

            addWaterfallMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon,
                waterfall.properties.TYPE,
                waterfall.properties.CLUSTER_AREA,
                waterfall.properties.HEIGHT_IN_M,
                waterfall.properties.WIDTH_IN_M,
                waterfall.properties.RANKING,
                waterfall.properties.OWNERSHIP,
                waterfall.properties.ACCESS_FROM
            );
        }
    }
    map.setZoom(11);

}

// Function to load Ancaster waterfalls
function loadAncaster() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Ancaster") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/A.png";

            addWaterfallMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon,
                waterfall.properties.TYPE,
                waterfall.properties.CLUSTER_AREA,
                waterfall.properties.HEIGHT_IN_M,
                waterfall.properties.WIDTH_IN_M,
                waterfall.properties.RANKING,
                waterfall.properties.OWNERSHIP,
                waterfall.properties.ACCESS_FROM
            );
        }
    }
    map.setZoom(11);

}

// Function to load Dundas waterfalls
function loadDundas() {
    for (let i = 0; i < waterfalls.length; i++) {
        let waterfall = waterfalls[i];

        if (waterfall.properties.COMMUNITY == "Dundas") {
            let new_icon = "http://maps.google.com/mapfiles/kml/paddle/D.png";

            addWaterfallMarker(
                waterfall.properties.NAME,
                waterfall.geometry.coordinates[1],
                waterfall.geometry.coordinates[0],
                waterfall.properties.NAME,
                waterfall.properties.COMMUNITY,
                new_icon,
                waterfall.properties.TYPE,
                waterfall.properties.CLUSTER_AREA,
                waterfall.properties.HEIGHT_IN_M,
                waterfall.properties.WIDTH_IN_M,
                waterfall.properties.RANKING,
                waterfall.properties.OWNERSHIP,
                waterfall.properties.ACCESS_FROM
            );
        }
    }
    map.setZoom(11);

}

// Address Finder Function
function getAddress(address, icon, iconName) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      let lat = results[0].geometry.location.lat();
      let lng = results[0].geometry.location.lng();  
      if (status == 'OK') {
        // put a marker on the map at the given position
        addColourMarker(address, lat, lng, "Search Result", icon, "Search Result");
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    let addressLatlng = new google.maps.LatLng(lat, lng);
    map.setZoom(11);
    map.setCenter(addressLatlng);
    });
    
    iconStack.push(iconName);
}

// Function to remove a marker to the map
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
    map.setZoom(11);
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
        geocoder.geocode({ location: { lat: lat, lng: lng } }, (results, status) => { 
            if (status === "OK" && results[0]) {
                let distance = getDistance(mohawkLocation.lat,mohawkLocation.lng,lat,lng)
                let address = results[0].formatted_address;
                let addressContent = `<div class="infoWindow">
                                        <h2>${address}</h2>
                                        <p>Currently located at: ${lat}, ${lng}</p>
                                        <p>You are approximately ${distance} km away from Hamilton (Mohawk College Fennel Campus)</p>
                                      </div>`;
                let midPoint = getMidpoint(mohawkLocation.lat,mohawkLocation.lng,lat,lng)
                
                // Center and zoom map
                map.setCenter(midPoint);
                map.setZoom(9);

                // Display location information
                document.getElementById("geo_locate").innerHTML =
                    `Latitude: ${lat} Longitude: ${lng} <br> Your Location: ${address}`;

                // Add a marker
                let icon = "https://maps.google.com/mapfiles/kml/shapes/man.png";
                addColourMarker(address, lat, lng, "Your Location", icon, addressContent);
            } else {
                console.error("Geocode was not successful: " + status);
            }
        });
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

// Midpoint function
function getMidpoint(lat1, lng1, lat2, lng2) {
    let midLat = (lat1 + lat2) / 2;
    let midLng = (lng1 + lng2) / 2;
    return { lat: midLat, lng: midLng };
}

// Function to calculate distance in KM
function getDistance(lat1, lng1, lat2, lng2) {
    var origin = new google.maps.LatLng(lat1, lng1);
    var destination = new google.maps.LatLng(lat2, lng2);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
    return Math.round((distance / 1000) * 100) / 100;
}

// Clears the directions on the map
function clearDirections() {
    directionsRenderer.setDirections({ routes: [] }); 
  }

// Example button event listeners
document.getElementById("add_Hamilton").addEventListener("click", loadHamilton);
document.getElementById("add_Dundas").addEventListener("click", loadDundas);
document.getElementById("add_Ancaster").addEventListener("click", loadAncaster);
document.getElementById("add_StoneyCreek").addEventListener("click", loadStoneyC);
document.getElementById("add_Burlington").addEventListener("click", loadBurlington);
document.getElementById("add_Flamborough").addEventListener("click", loadFlamborough);
document.getElementById("locate_me").addEventListener("click", showPosition);

// Store the selected first dropdown item
document.querySelectorAll('#firstDropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        firstDropdown = this.id;  // Save the selected dropdown item's ID
    });
});

// Store the selected second dropdown item
document.querySelectorAll('#secondDropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        secondDropdown = this.id;  
    });
});

// Add event listener to the form
document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission to handle it manually
    isSubmitted = true;

    let address = document.getElementById('address').value; 

    if (firstDropdown == "green_house") {
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
        } else if (firstDropdown == "green_car") {
        if(iconStack.at(-1) == "green_house" || iconStack.at(-1) == "gree_arrow") {
            removeMarker("Search Result");
            let new_icon = "https://maps.google.com/mapfiles/kml/pal4/icon62.png";
            getAddress(address, new_icon, "green_car");
        }
        else {
            let new_icon = "https://maps.google.com/mapfiles/kml/pal4/icon62.png";
            getAddress(address, new_icon, "green_car");
        }
        } else if (firstDropdown == "green_arrow") {
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
    clearDirections();
});

// Remove last added marker
document.getElementById("remove_last").addEventListener("click", removeLastMarker);




