import React, { useEffect, useState } from 'react';
const YOUR_API_KEY = "AIzaSyD4j0TwyOoZTpLmAjJ8j8zlf7jA2ya31MA";
const SortestPath = ({ coordinate1, coordinate2, apiKey=YOUR_API_KEY }) => {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  useEffect(() => {
    if (map && directionsService && coordinate1 && coordinate2) {
      calculateAndDisplayRoute();
    }
  }, [map, directionsService, coordinate1, coordinate2]);

  const initializeMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: parseFloat(coordinate1.split(',')[0]), lng: parseFloat(coordinate1.split(',')[1]) },
      zoom: 10,
    });
    setMap(map);
    setDirectionsService(new window.google.maps.DirectionsService());
    setDirectionsRenderer(new window.google.maps.DirectionsRenderer());
  };

  const calculateAndDisplayRoute = () => {
    directionsService.route(
      {
        origin: coordinate1,
        destination: coordinate2,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          directionsRenderer.setMap(map);
          const route = response.routes[0];
          let totalDistance = 0;
          route.legs.forEach((leg) => {
            totalDistance += leg.distance.value;
          });
          setDistance(totalDistance / 1000); // Converting distance from meters to kilometers
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  };

  return distance;
};

export default SortestPath;
