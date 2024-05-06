import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '600px'
};

const center = {
  lat: -34.397,
  lng: 150.644
};

function MyMap() {
  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      />
  );
}

export default MyMap;
