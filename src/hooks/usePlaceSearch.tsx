import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export interface PlaceResult {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

export const usePlaceSearch = (key: string) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);

  // 값 수신
  useEffect(() => {
    const state = location.state;
    if (state?.selectedPlaceKey === key && state.selectedPlace) {
      const place = state.selectedPlace;
      setSearchTerm(place.place_name);
      setSelectedPlace(place);
    }
  }, [location.state, key]);

  const goToSearchPage = () => {
    navigate("/search-location", {
      state: { from: key },
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedPlace,
    goToSearchPage,
  };
};
