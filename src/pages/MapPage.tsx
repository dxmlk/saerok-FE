import NaverMap from "features/map/components/NaverMap";
import SearchPlaceSelector from "features/map/components/SearchPlaceSelector";
import CurrentLocationButton from "features/map/components/CurrentLocationButton";
import useGeolocation from "hooks/useGeolocation";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNearbyCollections, NearbyCollectionItem } from "services/api/collections/index";
import ToggleMapMode from "features/map/components/ToggleMapMode";
import { ReactComponent as DeleteIcon } from "assets/icons/button/delete.svg";
import { ReactComponent as SearchIcon } from "assets/icons/button/search.svg";
import { ReactComponent as ReloadingIcon } from "assets/icons/icon/reloading.svg";
import LoadingScreen from "components/common/LoadingScreen";

const DEFAULT_CENTER = { lat: 37.58939182281775, lng: 127.02990237554194 };

const MapPage = () => {
  const { currentMyLocation, getCurPosition } = useGeolocation();
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [markers, setMarkers] = useState<NearbyCollectionItem[]>([]);
  const [isMineOnly, setIsMineOnly] = useState(false);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [pendingCenter, setPendingCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [locationReady, setLocationReady] = useState(false); // 위치 허용? 준비 여부
  const [centerInitialized, setCenterInitialized] = useState(false);
  const navigate = useNavigate();

  // center, currentMyLocation이 0,0이면 무시
  function isValidLatLng(obj?: { lat: number; lng: number } | null) {
    return !!obj && !(obj.lat === 0 && obj.lng === 0);
  }

  // 최초 내 위치 수신 시에만 center 세팅
  useEffect(() => {
    if (isValidLatLng(currentMyLocation) && !centerInitialized) {
      setCenter({ lat: currentMyLocation!.lat, lng: currentMyLocation!.lng });
      setLocationReady(true);
      setCenterInitialized(true);
    }
  }, [currentMyLocation, centerInitialized]);

  // 만약 일정 시간 동안 위치를 못 받으면 fallback (권한 거부, 에러 등)
  useEffect(() => {
    if (!locationReady && !centerInitialized) {
      const timeout = setTimeout(() => {
        setCenter(DEFAULT_CENTER);
        setLocationReady(true);
        setCenterInitialized(true);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [locationReady, centerInitialized]);

  // 지도 중심 기준 주변 컬렉션 조회
  const fetchAndSetNearbyCollections = async (centerLat: number, centerLng: number, radiusMeters = 500) => {
    try {
      const items = await fetchNearbyCollections({
        latitude: centerLat,
        longitude: centerLng,
        radiusMeters,
        isMineOnly,
      });
      setMarkers(items);
    } catch (err) {
      // console.error("주변 컬렉션 불러오기 실패", err);
      setMarkers([]);
    }
  };

  // 지도 중심 변경 콜백
  const handleMapCenterChanged = (centerLat: number, centerLng: number) => {
    setPendingCenter({ lat: centerLat, lng: centerLng });
  };

  const handleRelocate = () => {
    if (pendingCenter) {
      setCenter(pendingCenter); // 이때만 fetchAndSetNearbyCollections 작동
    }
  };

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

  //현재 위치로 이동
  const moveToCurrentLocation = () => {
    getCurPosition();
    if (mapRef.current && currentMyLocation) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng));
    }
  };

  // 장소 검색 → 해당 위치로 중심 이동
  const handlePlaceSelected = ({ lat, lng }: { lat: number; lng: number }) => {
    setCenter({ lat, lng });
    setIsSearching(false);
    -setIsSearching(false);
    if (mapRef.current) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(lat, lng));
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearching) {
      inputRef.current?.focus();
    }
  }, [isSearching]);

  return (
    <div className="relative w-full h-screen z-0">
      {!locationReady || !isValidLatLng(center) ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          <NaverMap
            mapRef={mapRef}
            markers={markers}
            center={center!}
            onCenterChanged={handleMapCenterChanged}
            onOverlayClick={(id: number) => navigate(`/saerok-detail/${id}`)}
          />

          {pendingCenter && center && (pendingCenter.lat !== center.lat || pendingCenter.lng !== center.lng) && (
            <div className="absolute left-1/2 top-80 z-30 -translate-x-1/2">
              <button
                onClick={handleRelocate}
                className="px-16 py-10 rounded-20 bg-background-white text-font-black font-regular text-15 font-pretendard"
                style={{ boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.5)" }}
              >
                <ReloadingIcon className="inline-block mr-8" />
                <span>이 지역 재검색하기</span>
              </button>
            </div>
          )}

          {/* 1. 검색 모드: 흰 배경 + 검색창(모든 클릭 차단) */}
          {isSearching && (
            <div className="fixed inset-0 max-w-480 left-1/2 -translate-x-[50%] bg-background-white z-50 flex flex-col">
              <div className="absolute top-20 left-0 right-0 flex-1 flex flex-col">
                <SearchPlaceSelector
                  ref={inputRef}
                  onSelect={(place) => {
                    handlePlaceSelected(place);
                    setIsSearching(false);
                  }}
                  placeholder="원하는 장소 검색"
                  onBack={() => setIsSearching(false)}
                />
              </div>
            </div>
          )}

          {/* 2. 검색 모드 아닐 때: 상단 고정 검색 버튼만 (기존 디자인 그대로) */}
          {!isSearching && (
            <div className="absolute top-20 left-24 right-24">
              <div
                onClick={() => setIsSearching(true)}
                className="font-pretendard relative h-44 w-full flex flex-row rounded-10 border-2 items-center bg-white border-mainBlue justify-between"
              >
                <SearchIcon className="w-22 h-22 ml-14 text-font-whitegrayLight" />

                <input
                  value={""}
                  placeholder={"원하는 장소 검색"}
                  className="outline-none flex w-full items-center text-body-2 placeholder-font-whitegrayLight mx-10 "
                />
                <DeleteIcon className="w-20 h-20 mr-16" />
              </div>
            </div>
          )}

          <CurrentLocationButton onClick={moveToCurrentLocation} />
          <ToggleMapMode isMineOnly={isMineOnly} onToggle={setIsMineOnly} />
        </>
      )}
    </div>
  );
};

export default MapPage;
