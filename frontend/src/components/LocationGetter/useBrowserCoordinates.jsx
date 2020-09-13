import { useEffect, useState } from 'react';

const useBrowserCoordinates = () => {
  const [coordinates, setCoordinates] = useState({});

  const coordsExist =
    (coordinates.latitude && coordinates.longitude) ||
    (coordinates.latitude === 0 && coordinates.longitude === 0);

  useEffect(() => {
    if (coordsExist) return;
    navigator?.geolocation.getCurrentPosition(
      ({ coords }) => setCoordinates(coords),
      // eslint-disable-next-line no-console
      (error) => console.error(`Error Code: ${error.code} - ${error.message}`)
    );
  }, [setCoordinates, coordsExist]);

  return coordinates;
};

export default useBrowserCoordinates;
