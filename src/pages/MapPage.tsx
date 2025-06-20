import NaverMap from "features/map/components/NaverMap";
import SearchPlaceSelector from "features/map/components/SearchPlaceSelector";
import CurrentLocationButton from "features/map/components/CurrentLocationButton";
import useGeolocation from "hooks/useGeolocation";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNearbyCollections, NearbyCollectionItem } from "services/api/collections";
import ToggleMapMode from "features/map/components/ToggleMapMode";

const MapPage = () => {
  const { currentMyLocation, getCurPosition } = useGeolocation();
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [markers, setMarkers] = useState<NearbyCollectionItem[]>([]);
  const [isMineOnly, setIsMineOnly] = useState(false);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();

  // 지도 중심 기준 주변 컬렉션 조회
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

  // 지도 중심 변경 콜백
  const handleMapCenterChanged = (centerLat: number, centerLng: number) => {
    setCenter({ lat: centerLat, lng: centerLng });
  };

  // 최초 렌더/내 위치 이동 시 지도 중심 갱신
  useEffect(() => {
    if (currentMyLocation) {
      setCenter({ lat: currentMyLocation.lat, lng: currentMyLocation.lng });
    }
  }, [currentMyLocation]);

  // 중심좌표, isMineOnly 변경시 주변 컬렉션 다시 조회
  useEffect(() => {
    if (center) {
      fetchAndSetNearbyCollections(center.lat, center.lng);
      if (mapRef.current) {
        mapRef.current.setCenter(new window.naver.maps.LatLng(center.lat, center.lng));
      }
    }
    // eslint-disable-next-line
  }, [center, isMineOnly]);

  // 현재 위치로 이동
  const moveToCurrentLocation = () => {
    getCurPosition();
    if (mapRef.current && currentMyLocation) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng));
    }
  };

  // 장소 검색 → 해당 위치로 중심 이동
  const handlePlaceSelected = ({ lat, lng }: { lat: number; lng: number }) => {
    setCenter({ lat, lng });
    if (mapRef.current) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(lat, lng));
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

      {/* 상단 장소 검색 */}
      <div className="absolute top-20 w-[89%] left-1/2 -translate-x-1/2 z-10">
        <SearchPlaceSelector onSelect={handlePlaceSelected} placeholder="원하는 장소 검색" />
      </div>

      <CurrentLocationButton onClick={moveToCurrentLocation} />
      <ToggleMapMode isMineOnly={isMineOnly} onToggle={setIsMineOnly} />
    </div>
  );
};

export default MapPage;
