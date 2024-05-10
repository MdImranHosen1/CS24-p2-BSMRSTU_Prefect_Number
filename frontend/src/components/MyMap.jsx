import React from 'react';

function MyMap({ coordinate }) {
  // Split the coordinate string into latitude and longitude
  const [latitude, longitude] = coordinate.split(',').map(coord => parseFloat(coord.trim()));

  // Construct the map source URL with the latitude and longitude
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU2JzIyLjkiTiA5MMKwMjEnNDguNiJF!5e0!3m2!1sen!2sus!4v1615530358914!5m2!1sen!2sus`;

  return (
    <>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={mapSrc}
          className="absolute top-0 left-0 w-full h-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}

export default MyMap;
