// Initialize and add the map
let map;

async function initMap() {
// the latitude and longitude of mohawk college fennell campus
let mohawkloc = { lat: 43.2387, lng: -79.8881 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Mohawk College
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: mohawkloc,
    mapId: "DEMO_MAP_ID",
  });

 // The marker, positioned at Mohawk College
mohawkMarker = new AdvancedMarkerElement({
    map: map,
    position: mohawkloc,
    title: "Mohawk College",
  });
}

initMap();