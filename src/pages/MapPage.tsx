import NaverMap from "features/map/components/NaverMap";
import SearchBar from "components/common/textfield/SearchBar";
import CurrentLocationButton from "features/map/components/CurrentLocationButton";
import useGeolocation from "hooks/useGeolocation";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNearbyCollections, NearbyCollectionItem } from "services/api/collections";
import ToggleMapMode from "features/map/components/ToggleMapMode";

const MapPage = () => {
  const { currentMyLocation, getCurPosition } = useGeolocation();
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [markers, setMarkers] = useState<NearbyCollectionItem[]>([]);
  const [isMineOnly, setIsMineOnly] = useState(false);

  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();

  const handleSearch = () => {};

  // 현재 지도 중심 기준 주변 컬렉션 조회
  const fetchAndSetNearbyCollections = async (centerLat: number, centerLng: number, radiusMeters = 1000) => {
    try {
      const items = await fetchNearbyCollections({
        latitude: centerLat,
        longitude: centerLng,
        radiusMeters,
        isMineOnly,
      });
      setMarkers(items);
    } catch (err) {
      console.error("주변 컬렉션 불러오기 실패", err);
      setMarkers([]);
    }
  };

  // 지도 중심 변경(이동, 줌) 콜백
  const handleMapCenterChanged = (centerLat: number, centerLng: number) => {
    setCenter({ lat: centerLat, lng: centerLng });
  };

  // 최초 렌더링 시 또는 내 위치 이동 시 중심좌표 갱신
  useEffect(() => {
    if (currentMyLocation) {
      setCenter({ lat: currentMyLocation.lat, lng: currentMyLocation.lng });
    }
  }, [currentMyLocation]);

  // 중심좌표나 isMineOnly 변경 시 컬렉션 재조회
  useEffect(() => {
    if (center) {
      fetchAndSetNearbyCollections(center.lat, center.lng);
    }
  }, [center, isMineOnly]); // ← 중요! 둘 다 의존성

  const moveToCurrentLocation = () => {
    getCurPosition();
    if (mapRef.current) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng));
    }
  };

  return (
    <div className="relative w-screen h-screen z-0">
      <NaverMap
        mapRef={mapRef}
        markers={markers}
        onCenterChanged={handleMapCenterChanged}
        onOverlayClick={(id: number) => navigate(`/saerok-detail/${id}`)}
      />

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
      <ToggleMapMode isMineOnly={isMineOnly} onToggle={setIsMineOnly} />
    </div>
  );
};

export default MapPage;
