import NaverMap from "features/map/components/NaverMap";
import SearchBar from "components/common/textfield/SearchBar";
import CurrentLocationButton from "features/map/components/CurrentLocationButton";
import useGeolocation from "hooks/useGeolocation";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNearbyCollections, NearbyCollectionItem } from "services/api/collections";

const MapPage = () => {
  const { currentMyLocation, getCurPosition } = useGeolocation();
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [markers, setMarkers] = useState<NearbyCollectionItem[]>([]);
  const navigate = useNavigate();

  const handleSearch = () => {};

  // 현재 지도 중심 기준 주변 컬렉션 조회
  const fetchAndSetNearbyCollections = async (centerLat: number, centerLng: number, radiusMeters = 1000) => {
    try {
      const items = await fetchNearbyCollections({
        latitude: centerLat,
        longitude: centerLng,
        radiusMeters,
        isMineOnly: false, // 이거 변경 필요
      });
      setMarkers(items);
    } catch (err) {
      console.error("주변 컬렉션 불러오기 실패", err);
      setMarkers([]);
    }
  };

  // 지도 이동/줌 변경 콜백: NaverMap에 props로 넘김
  const handleMapCenterChanged = (centerLat: number, centerLng: number) => {
    fetchAndSetNearbyCollections(centerLat, centerLng);
  };

  // 최초 렌더링 시(혹은 내 위치 이동) 지도 중심에서 한 번 호출
  useEffect(() => {
    if (currentMyLocation) {
      fetchAndSetNearbyCollections(currentMyLocation.lat, currentMyLocation.lng);
    }
  }, [currentMyLocation]);

  const moveToCurrentLocation = () => {
    getCurPosition();
    if (mapRef.current) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng));
    }
  };

  return (
    <div className="relative w-screen h-screen z-0">
      <NaverMap mapRef={mapRef} markers={markers} onCenterChanged={handleMapCenterChanged} />

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
