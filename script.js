let map, geocoder;
let markers = {}; 
let markerStack = [];

function initMap() {
    let mohawkLocation = { lat: 43.2387, lng: -79.8881 };
    let mohawkIcon = "https://maps.google.com/mapfiles/kml/paddle/orange-stars.png";

    map = new google.maps.Map(document.getElementById("map"), {
        center: mohawkLocation,
        zoom: 12,
        mapId: "MAP_ID_GOES_HERE"
    });

    addColourMarker("Mohawk College Fennell Campus", 43.2387, -79.8881, "Mohawk College", mohawkIcon);
    //put markers on the map for all the schools in waterfalls.js 
for (let i = 0; i < waterfalls.length; i++) {
    let waterfall = waterfalls[i];
    // create a new icon for the marker
    if (waterfall.properties.COMMUNITY == "Dundas"){
    let new_icon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
    addColourMarker(
        waterfall.properties.NAME,
        waterfall.geometry.coordinates[1],
        waterfall.geometry.coordinates[0],
        waterfall.properties.NAME,
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




// put markers on the map for all the schools in education.js 
// for (i = 0; i < waterfalls.length; i++)
//     {
//       // set the icon based on the category of the school
//       if (waterfalls[i].properties.COMMUNITY == "Dundas")
//         new_icon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
    

//       // create the icon element
//       const icon_content = document.createElement("img");
//       icon_content.src = new_icon;

//       // create the marker based on the array in the education.js file
//       new_marker = new google.maps.marker.AdvancedMarkerElement({
//         map: map,
//         position: {lat: waterfalls[i].geometry.coordinates[1],  
//                    lng: waterfalls[i].geometry.coordinates[0]
//                   },
//         title: waterfalls[i].properties.NAME, 
//         content: icon_content
//       });

//       // store the name of the school as a property of the marker object
//       new_marker.NAME = waterfalls[i].properties.NAME;
      
//       // have the info window open when the marker is clicked...
//       new_marker.addListener('click', marker_clicked);

//     }

// put markers on the map for all the schools in education.js 

// console.log('Title:',  waterfalls[0].properties.NAME, 'Type:', typeof waterfalls[0].properties.NAME);    // Check title
// console.log('Latitude:', waterfalls[0].geometry.coordinates[1], 'Type:', typeof waterfalls[0].geometry.coordinates[1]);     // Check latitude
// console.log('Longitude:', waterfalls[0].geometry.coordinates[0], 'Type:', typeof waterfalls[0].geometry.coordinates[0]);     // Check longitude


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



