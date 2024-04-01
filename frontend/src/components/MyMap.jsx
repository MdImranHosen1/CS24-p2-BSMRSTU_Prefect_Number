import React from 'react';

function MyMap({mapSrc=null}) {
  const src = mapSrc!=null?mapSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d555922.6822372738!2d90.05212914801903!3d23.742534003458847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5be8aa4402d%3A0xd7f95d6797735e6!2sBoro%20Bari%20Landfill!5e0!3m2!1sen!2sbd!4v1711697053151!5m2!1sen!2sbd';

  return (
    <>
  
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe src={src} className="absolute top-0 left-0 w-full h-full" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </>
  );
}

export default MyMap;
