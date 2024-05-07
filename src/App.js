import React, { useState, useEffect } from 'react';
import markerImage from './images/marker.png';
import './App.css';
import './App.scss';

function App() {
  const [map, setMap] = useState(null);
  const [curMarker, setCurMarker] = useState(null);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://maps.google.com/maps/api/js?sensor=true';
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
      icon: markerImage,
    });

    newMarker.addListener('click', handleMarkerClick);

    setCurMarker(newMarker);
    setFirst(false);

    document.getElementById('more-info-title').innerHTML = title;
    document.getElementById('more-info-description').innerHTML = description;
  };

  const locations = [
    { lat: 41.9786, lng: -87.9047, title: "Starbucks & Özal", description: "Relaxing hours", image: "https://wallpapers.com/images/featured/starbucks-ack1avygrxnhaxjq.jpg" },
    { lat: 41.927118, lng: -87.697621, title: "Soulmate & Özal", description: "Views and coffee", image: "https://media.licdn.com/dms/image/C4E1BAQHAKEiwPMIU4Q/company-background_10000/0/1584569238156/soulmate_coffee_cover?e=2147483647&v=beta&t=cizh77FzwyGUAleLp5HfYpbnMLZODcAj4ZSMwW-Amgw" },
    { lat: 41.921735, lng: -87.664688, title: "Kahve Dünyası & Özal", description: "Coffee journey", image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/9bfe3e79592869.5cdeb80750008.jpg" },
    { lat: 41.927568, lng: -87.705201, title: "Chocolabs", description: "Chocolate waterfall", image: "https://images.alphacoders.com/133/1330494.png" },
  ];

  return (
    <div className='mx-auto flex flex-col md:flex-row'>
      <div className='w-full md:w-3/5 h-96 md:h-screen overflow-y-auto'>
        <div id="map_canva" className='h-full'></div>
      </div>

      <div className='w-full md:w-2/5 flex flex-col'>
        <ul id="locations" className='flex-1 md:w-11/12 overflow-y-auto absolute bottom-0 p-2 w-11/12 rounded-xl'>
          {locations.map((location, index) => (
            <li key={index} className="p-3 mb-3 background w-4/5 shadow" onMouseEnter={() => handleMouseEnter(location.lat, location.lng, location.title, location.description)}>
              <img src={location.image} className='rounded-t-xl w-full h-40 md:h-60 object-cover' alt='location'/>
              <div className='p-3 div bg-white rounded-b-xl'>
                <h1 className='font-semibold title mb-1'>{location.title}</h1>
                <p className='text-sm title'>{location.description}</p>
                <div className='flex justify-center items-center mt-3'>
                  <button className='button title w-full font-semibold text-sm'>Show the menu</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div id="more-info" className='w-full'>
        <div>
          <h2 id="more-info-title">More Info</h2>
          <p id="more-info-description">Hover over location on the left. (JavaScript must be enabled)</p>
        </div>
      </div>
    </div>
  );
}

export default App;
