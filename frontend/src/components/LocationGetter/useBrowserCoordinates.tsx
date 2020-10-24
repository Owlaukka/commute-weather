import { useEffect, useState } from 'react';

// TODO: share this with other places that require coordinates. DRY
export type CoordinatesType = {
  latitude: number;
  longitude: number;
};

const useBrowserCoordinates = () => {
  const [coordinates, setCoordinates] = useState({} as CoordinatesType);

  const coordsExist =
    (coordinates.latitude && coordinates.longitude) ||
    (coordinates.latitude === 0 && coordinates.longitude === 0);

  useEffect(() => {
    if (coordsExist) return;
    navigator?.geolocation.getCurrentPosition(
      ({ coords }) => setCoordinates(coords),
      (error) => console.error(`Error Code: ${error.code} - ${error.message}`)
    );
  }, [setCoordinates, coordsExist]);

  return coordinates;
};

export default useBrowserCoordinates;
