import { useState, useEffect } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

const useGeolocation = () => {
  const [currentMyLocation, setCurrentMyLocation] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const [locationLoading, setLocationLoading] = useState<boolean>(false);

  const getCurPosition = () => {
    setLocationLoading(true);

    const success = (position: GeolocationPosition) => {
      setCurrentMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setLocationLoading(false);
    };

    const error = () => {
      setCurrentMyLocation({ lat: 37.5666103, lng: 126.9783882 });
      setLocationLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      error();
    }
  };

  useEffect(() => {
    getCurPosition();
  }, []);

  return { currentMyLocation, locationLoading, getCurPosition };
};

export default useGeolocation;
