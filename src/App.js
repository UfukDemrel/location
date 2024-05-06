import React, { useState, useEffect } from 'react';
import './App.css';
import marker from './images/marker.png';

function App() {
  const [map, setMap] = useState(null);
  const [curMarker, setCurMarker] = useState(null);
  const [first, setFirst] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const newMap = new window.google.maps.Map(document.getElementById('map_canva'), myOptions);
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

  const locations = [
    { lat: 41.9786, lng: -87.9047, title: "Starbucks & Özal", description: "Flights n' stuff", image: "https://wallpapers.com/images/featured/starbucks-ack1avygrxnhaxjq.jpg" },
    { lat: 41.927118, lng: -87.697621, title: "Soulmate & Özal", description: "World-class Italian", image: "https://media.licdn.com/dms/image/C4E1BAQHAKEiwPMIU4Q/company-background_10000/0/1584569238156/soulmate_coffee_cover?e=2147483647&v=beta&t=cizh77FzwyGUAleLp5HfYpbnMLZODcAj4ZSMwW-Amgw" },
    { lat: 41.921735, lng: -87.664688, title: "Kahve Dünyası & Özal", description: "Unique pan-style pizza", image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/9bfe3e79592869.5cdeb80750008.jpg" },
    { lat: 41.927568, lng: -87.705201, title: "Chocolabs", description: "Nice bar", image: "https://images.alphacoders.com/133/1330494.png" },
  ];

  return (
    <div className='w-full container'>
      <div id="map_canva" className='h-full'></div>
      <div className='flex justify-center items-center'>
        <ul id="locations" className='absolute bottom-0 p-2 w-11/12 rounded-xl shadow-lg'>
          {locations.map((location, index) => (
            <li key={index} className="p-3 w-4/5 background" onMouseEnter={() => handleMouseEnter(location.lat, location.lng, location.title, location.description)}>
              <img src={location.image} className='rounded-t-xl w-full h-2/5' alt='alt'/>
              <div className='p-3 div bg-white rounded-b-xl'>
                <h1 className='font-semibold title mb-1'>{location.title}</h1>
                <p className='title text-sm'>{location.title}</p>
                <div className='flex justify-center items-center button mt-3'>
                  <button className='title'>Show The Menu</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

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
