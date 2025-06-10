import NaverMap from "features/map/components/NaverMap";
import SearchBar from "components/common/textfield/SearchBar";
import CurrentLocationButton from "features/map/components/CurrentLocationButton";
import useGeolocation from "hooks/useGeolocation";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mapItems } from "features/map/mock/mapItem";

const MapPage = () => {
  const { currentMyLocation, getCurPosition } = useGeolocation();
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {};

  const moveToCurrentLocation = () => {
    getCurPosition();
    if (mapRef.current) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng));
    }
  };

  return (
    <div className="relative w-screen h-screen z-0">
      <NaverMap mapRef={mapRef} markers={mapItems} />

      <div className="absolute top-20 w-[89%] left-1/2 -translate-x-1/2 z-10  ">
        <div onClick={() => navigate("/search/place")}>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            placeholder="원하는 장소 검색"
          />
        </div>
      </div>

      <CurrentLocationButton onClick={moveToCurrentLocation} />
    </div>
  );
};

export default MapPage;
