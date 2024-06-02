import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import markerImage from './images/marker.png';
import './App.css';
import './App.scss';
import LocationModal from './components/LocationModal';
import PrevArrow from './components/PrevArrow';
import NextArrow from './components/NextArrow';

function App() {
  const [map, setMap] = useState(null);
  const [curMarker, setCurMarker] = useState(null);
  const [first, setFirst] = useState(true);
  const [coffee, setCoffee] = useState([]);
  const [modal, setModal] = useState(false);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [showPrev, setShowPrev] = useState(false);

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
  };

  const setting = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow showPrev={showPrev} />,
    nextArrow: <NextArrow setShowPrev={setShowPrev} />,
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

        const coffeeColors = data.map(location => location.color);
        console.log("Colors: ", coffeeColors); // This will log the array of colors to the console

      })
      .catch(err => console.error(err));
  }, []);

  const handleMenuClick = (id) => {
    const clickedLocation = coffee.find(location => location.id === id);
    setClickedLocation(clickedLocation);
    setMenuId(clickedLocation.menu.id);
    setModal(true);
  };

  return (
    <div className='mx-auto flex flex-col md:flex-row'>
      <div className='w-full md:w-3/5 h-96 md:h-screen overflow-y-auto'>
        <div id="map_canva" className='h-full'></div>
      </div>

      <div className='w-full md:w-2/5 flex flex-col'>
        <Slider {...setting}>
          {coffee.map((location, index) => (
            <div key={index} className="background block m-auto" onMouseEnter={() => handleMouseEnter(location.lat, location.lng, location.title, location.description)}>
              <img src={location.image} className='rounded-t-2xl w-full h-40 md:h-60 object-cover' alt='location' />
              <div className='p-3 div bg-white rounded-b-2xl'>
                <h1 className='font-semibold title mb-1'>{location.title}</h1>
                <p className='text-sm title'>{location.description}</p>
                <div className='flex justify-center items-center mt-3'>
                  <button id={location.id} onClick={() => handleMenuClick(location.id)} className='button title w-full font-semibold text-sm'>Show the menu</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {modal && clickedLocation && (
        <div className='w-full fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center'>
          <div className="w-4/5 bg-white rounded-2xl">
            <div className='flex justify-end text-right absolute p-2 cursor-pointer' style={{ width: 'inherit' }} onClick={() => setModal(false)}>
              <svg fill="white" width="2rem" height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.707,12.293a1,1,0,1,1-1.414,1.414L12,13.414,9.707,15.707a1,1,0,0,1-1.414-1.414L10.586,12,8.293,9.707A1,1,0,0,1,9.707,8.293L12,10.586l2.293-2.293a1,1,0,0,1,1.414,1.414L13.414,12Z" /></svg>
            </div>
            <LocationModal
              closeModal={() => setModal(false)}
              clickedLocation={clickedLocation}
              color={clickedLocation.color}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
