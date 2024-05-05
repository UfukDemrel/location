import React, { useState, useEffect } from 'react';
import './App.css';
import marker from '../src/images/marker.png';

function App() {
  const [map, setMap] = useState(null);
  const [curMarker, setCurMarker] = useState(null);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://maps.google.com/maps/api/js?sensor=true';
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const chicago = new window.google.maps.LatLng(41.924832, -87.697456);
    const myOptions = {
      zoom: 10,
      center: chicago,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    };
    const newMap = new window.google.maps.Map(document.getElementById('map_canvas'), myOptions);
    setMap(newMap);
  };

  const handleMarkerClick = () => {
    if (map) map.setZoom(14);
  };

  const handleMouseEnter = (lat, lng, title, description) => {
    if (!first) {
      if (curMarker) curMarker.setMap(null);
      if (map) map.setZoom(10);
    }

    const pointToMoveTo = new window.google.maps.LatLng(lat, lng);
    if (map) map.panTo(pointToMoveTo);

    const newMarker = new window.google.maps.Marker({
      position: pointToMoveTo,
      map: map,
      icon: {marker},
    });

    newMarker.addListener('click', handleMarkerClick);

    setCurMarker(newMarker);
    setFirst(false);

    document.getElementById('more-info-title').innerHTML = title;
    document.getElementById('more-info-description').innerHTML = description;
  };

  return (
    <div id="page-wrap">
      <ul id="locations">
        <li onMouseEnter={() => handleMouseEnter(41.9786, -87.9047, "O'Hare Airport", "Flights n' stuff")}>
          <h3>O'Hare Airport</h3>
          <p>Flights n' stuff</p>
        </li>
        <li onMouseEnter={() => handleMouseEnter(41.927118, -87.697621, "Bueno Terra", "World-class Italian")}>
          <h3>Bueno Terra</h3>
          <p>World-class Italian</p>
        </li>
        <li onMouseEnter={() => handleMouseEnter(41.921735, -87.664688, "Pequod's Pizza", "Unique pan-style pizza")}>
          <h3>Pequod's Pizza</h3>
          <p>Unique pan-style pizza</p>
        </li>
        <li onMouseEnter={() => handleMouseEnter(41.927568, -87.705201, "The Rocking Horse", "Nice bar")}>
          <h3>The Rocking Horse</h3>
          <p>Nice bar</p>
        </li>
      </ul>

      <div id="map_canvas"></div>

      <div id="more-info">
        <div>
          <h2 id="more-info-title">More Info</h2>
          <p id="more-info-description">Hover over location on the left. (JavaScript must be enabled)</p>
        </div>
      </div>
    </div>
  );
}

export default App;
