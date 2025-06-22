import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "components/common/textfield/SearchBar.js";
import SimpleHeader from "components/common/SimpleHeader.js";
import EditFooter from "features/saerok/components/add-saerok/EditFooter.js";
import PlaceBottomSheet from "features/saerok/components/add-saerok/PlaceBottomSheet.js";
import useBottomSheet from "hooks/useBottomSheet.js";
import { useSaerokForm } from "states/useSaerokForm.js";
import { KakaoPlace } from "types/kakao.js";
import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";
import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";
import { reverseGeocode, ReverseGeocodeResult } from "features/saerok/utils/reverseGeocode.js";

const HEADER_HEIGHT = 68;
const SEARCHBAR_HEIGHT = 70;

const KAKAO_APP_KEY = "9f8230e848e24bb14fa14ff044819970";
const NAVER_CLIENT_ID = "yj17bib8ok";

export default function SearchPlacePage() {
  const [kakaoReady, setKakaoReady] = useState(false);

  const navigate = useNavigate();
  const { setAddressDetails } = useSaerokForm();
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();

  // 검색, 선택된 장소, 마커 위치, 별칭 상태
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<KakaoPlace[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null);
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number } | null>(null);
  const [alias, setAlias] = useState("");
  const [draggedAddress, setDraggedAddress] = useState<{ road?: string; jibun?: string }>({});

  // 지도 레퍼런스
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markerInstance = useRef<naver.maps.Marker | null>(null);

  // 1) Kakao & Naver SDK 로드 (한 번만)
  useEffect(() => {
    // Kakao SDK
    const kakaos = document.createElement("script");
    kakaos.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=services`;
    kakaos.async = true;
    kakaos.onload = () => {
      (window as any).kakao.maps.load(() => {
        setKakaoReady(true);
      });
    };
    document.head.appendChild(kakaos);

    // Naver SDK
    const navers = document.createElement("script");
    navers.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID}&submodules=geocoder`;
    navers.async = true;
    navers.onload = () => {
      if (mapRef.current && !mapInstance.current) {
        mapInstance.current = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(37.5665, 126.978),
          zoom: 16,
        });
      }
    };
    document.head.appendChild(navers);

    return () => {
      document.head.removeChild(kakaos);
      document.head.removeChild(navers);
    };
  }, []);

  // 2) Kakao 장소 검색
  const searchPlaces = () => {
    if (!kakaoReady) {
      alert("지도 불러오는 중");
      return;
    }
    if (!keyword.trim()) return;

    const kakao = (window as any).kakao;
    if (!kakao?.maps?.services) {
      alert("카카오 지도 서비스 준비 중");
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data: KakaoPlace[], status: string) => {
      setSearchPerformed(true);
      setSelectedPlace(null);
      setPlaces(status === kakao.maps.services.Status.OK ? data : []);
    });
  };

  // 1. handleSelect는 상태만 갱신
  const handleSelect = (place: KakaoPlace) => {
    setSelectedPlace(place);
    const lat = parseFloat(place.y);
    const lng = parseFloat(place.x);
    setMarkerPos({ lat, lng });
    setDraggedAddress({ road: place.road_address_name, jibun: place.address_name });
  };

  // 2. 마커 생성, dragend 리스너 등록은 여기서만!
  useEffect(() => {
    if (!mapInstance.current || !selectedPlace) return;

    const lat = parseFloat(selectedPlace.y);
    const lng = parseFloat(selectedPlace.x);

    // 기존 마커 제거
    if (markerInstance.current) {
      markerInstance.current.setMap(null);
      markerInstance.current = null;
    }

    // 마커 생성
    const marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map: mapInstance.current,
      draggable: true,
      icon: {
        url: "/src/assets/icons/marker.svg",
        size: new window.naver.maps.Size(51, 66),
        anchor: new window.naver.maps.Point(25.5, 66),
      },
    });
    markerInstance.current = marker;

    // dragend 리스너
    const dragListener = window.naver.maps.Event.addListener(marker, "dragend", async (e: any) => {
      const dLat = e.coord.lat();
      const dLng = e.coord.lng();
      setMarkerPos({ lat: dLat, lng: dLng });

      try {
        const addr: ReverseGeocodeResult = await reverseGeocode(dLat, dLng);
        setDraggedAddress({
          road: addr.roadAddress,
          jibun: addr.jibunAddress,
        });
        console.log("드래그 주소 갱신", addr);
      } catch {
        console.log("역지오코딩 실패");
      }
    });

    // 최초 한 번 상태 초기화
    setMarkerPos({ lat, lng });
    setDraggedAddress({ road: selectedPlace.road_address_name, jibun: selectedPlace.address_name });

    // 지도 센터 이동, 패닝
    const center = new window.naver.maps.LatLng(lat, lng);
    mapInstance.current.setCenter(center);
    (mapInstance.current as any).panBy(0, -window.innerHeight * 0.5);

    // cleanup
    return () => {
      if (markerInstance.current) {
        markerInstance.current.setMap(null);
        markerInstance.current = null;
      }
      window.naver.maps.Event.removeListener(dragListener);
    };
  }, [selectedPlace, mapInstance.current]);

  useEffect(() => {
    console.log("마커 좌표 변경됨:", markerPos);
  }, [markerPos]);
  useEffect(() => {
    console.log("드래그 주소 변경됨:", draggedAddress);
  }, [draggedAddress]);

  // 5) 바텀시트 열기 (별칭 입력)
  const handleConfirm = () => {
    if (!selectedPlace || !markerPos) return;
    setAlias(""); // 초기화
    openBottomSheet(); // 바텀시트 열기
  };

  // 6) 바텀시트에서 발견 장소 등록 또는 건너뛰기 눌렀을 때
  const handleApply = () => {
    setAddressDetails({
      address:
        draggedAddress.road || draggedAddress.jibun || selectedPlace!.road_address_name || selectedPlace!.address_name,
      locationAlias: alias.trim(), // 별칭
      latitude: markerPos!.lat,
      longitude: markerPos!.lng,
    });
    closeBottomSheet();
    navigate("/add-saerok");
  };

  const mapHeight = `calc(100vh - ${HEADER_HEIGHT + SEARCHBAR_HEIGHT}px)`;

  return (
    <div className="relative min-h-[100vh] bg-background-whitegray">
      <SimpleHeader title="장소 찾기" />
      <div className="px-24 bg-white pt-10 pb-20">
        <SearchBar
          searchTerm={keyword}
          setSearchTerm={setKeyword}
          onSearch={searchPlaces}
          placeholder="장소를 검색하세요"
        />
      </div>

      {/* 검색 결과 리스트 */}
      {!selectedPlace && searchPerformed && (
        <div className="flex flex-col">
          {places.length > 0 ? (
            places.map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelect(p)}
                className="px-24 border-t bg-white border-background-whitegray flex h-68 items-center justify-between cursor-pointer"
              >
                <div className="flex flex-row items-center gap-18">
                  <MapIcon className="w-24 h-24 text-font-whitegrayLight" />
                  <div className="flex flex-col gap-1">
                    <div className="text-body-3 font-haru text-font-black">{p.place_name}</div>
                    <div className="text-caption-1 font-pretendard text-font-whitegrayDark">
                      {p.road_address_name || p.address_name}
                    </div>
                  </div>
                </div>
                <BracketIcon className="w-17 h-17" />
              </div>
            ))
          ) : (
            <div className="px-24 pt-20 text-center text-font-whitegrayDark">검색 결과가 없습니다.</div>
          )}
        </div>
      )}

      {/* 네이버 지도: absolute bottom */}
      <div
        ref={mapRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: selectedPlace ? mapHeight : 0,
          transition: "height 0.3s ease",
          zIndex: 0,
        }}
      />

      {/* 확정 버튼 */}
      {selectedPlace && <EditFooter text="선택하기" onClick={handleConfirm} />}

      {/* 장소 별칭 입력용 BottomSheet */}
      <PlaceBottomSheet
        ref={bottomSheetRef}
        close={closeBottomSheet}
        apply={handleApply}
        address={draggedAddress.road || draggedAddress.jibun || selectedPlace?.road_address_name || ""}
        alias={alias}
        onAliasChange={(e) => setAlias(e.target.value)}
      />
    </div>
  );
}
