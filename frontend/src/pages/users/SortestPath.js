import { useState, useEffect } from 'react';

const YOUR_API_KEY = "AIzaSyD4j0TwyOoZTpLmAjJ8j8zlf7jA2ya31MA";

let directionsService; // Declare directionsService outside the function

const getDistance = (coordinate1, coordinate2, apiKey = YOUR_API_KEY) => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        directionsService = new window.google.maps.DirectionsService();
        resolve(calculateDistance(coordinate1, coordinate2));
      };
      script.onerror = reject;
      document.head.appendChild(script);
    } else {
      directionsService = new window.google.maps.DirectionsService();
      resolve(calculateDistance(coordinate1, coordinate2));
    }
  });
};

const calculateDistance = (coordinate1, coordinate2) => {
  return new Promise((resolve, reject) => {
    directionsService.route(
      {
        origin: coordinate1,
        destination: coordinate2,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          const route = response.routes[0];
          let totalDistance = 0;
          route.legs.forEach((leg) => {
            totalDistance += leg.distance.value;
          });
          resolve(totalDistance / 1000); // Converting distance from meters to kilometers
        } else {
          // reject('Directions service is not available');
          alert("Directions service is not available");
        }
      }
    );
  });
};

export default getDistance;
