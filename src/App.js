import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import markerImage from './images/marker.png';
import './App.css';
import './App.scss';

function App() {
  const [map, setMap] = useState(null);
  const [curMarker, setCurMarker] = useState(null);
  const [first, setFirst] = useState(true);
  const [coffee, setCoffee] = useState([]);

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

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/ufukdemrel/mapdata/main/data.json")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setCoffee(data);
        console.log("Data: ", data);
      })
      .catch(err => console.error(err));
  }, []);
  
  
  return (
    <div className='mx-auto flex flex-col md:flex-row'>
      <div className='w-full md:w-3/5 h-96 md:h-screen overflow-y-auto'>
        <div id="map_canva" className='h-full'></div>
      </div>

      <div className='w-full md:w-2/5 flex flex-col'>
        <Slider {...settings}>
          {coffee.map((location, index) => (
            <div key={index} className="background block m-auto" onMouseEnter={() => handleMouseEnter(location.lat, location.lng, location.title, location.description)}>
              <img src={location.image} className='rounded-t-2xl w-full h-40 md:h-60 object-cover' alt='location'/>
              <div className='p-3 div bg-white rounded-b-2xl'>
                <h1 className='font-semibold title mb-1'>{location.title}</h1>
                <p className='text-sm title'>{location.description}</p>
                <div className='flex justify-center items-center mt-3'>
                  <button className='button title w-full font-semibold text-sm'>Show the menu</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* <div id="more-info" className='w-full'>
        <div>
          <h2 id="more-info-title">More Info</h2>
          <p id="more-info-description">Hover over location on the left. (JavaScript must be enabled)</p>
        </div>
      </div> */}
    </div>
  );
}

export default App;
