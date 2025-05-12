import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { KakaoPlace } from "types/kakao";
import SearchBar from "components/common/SearchBar";

const SearchLocationPage = () => {
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<KakaoPlace[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const fromKey = location.state?.from ?? "unknown";
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Kakao 지도 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=dc335daaa855430ce5fea5f0b5b018ad&autoload=false&libraries=services";
    script.async = true;
    script.onload = () => {
      const kakao = (window as any).kakao;
      kakao.maps.load(() => {
        const map = new kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        });
        mapInstance.current = map;
        setIsKakaoReady(true);
      });
    };
    document.head.appendChild(script);
  }, []);

  // 검색 실행
  const searchPlaces = () => {
    const kakao = (window as any).kakao;
    if (!isKakaoReady || !kakao?.maps?.services) return;

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data: KakaoPlace[], status: string) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);
        showMarkers(data);
      } else {
        setPlaces([]);
      }
    });
  };

  // 마커 표시
  const showMarkers = (results: KakaoPlace[]) => {
    const kakao = (window as any).kakao;
    const map = mapInstance.current;
    const bounds = new kakao.maps.LatLngBounds();

    // 기존 마커 제거
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    results.forEach((place) => {
      const position = new kakao.maps.LatLng(Number(place.y), Number(place.x));
      const marker = new kakao.maps.Marker({ position });
      marker.setMap(map);
      markersRef.current.push(marker);
      bounds.extend(position);
    });

    if (results.length > 0) map.setBounds(bounds);
  };

  // 장소 선택 → 이전 페이지로 이동하며 값 전달
  const handleSelect = (place: KakaoPlace) => {
    navigate("/add-collection", {
      state: {
        selectedPlace: place,
        selectedPlaceKey: fromKey,
      },
    });
  };

  const getBorderColor = (field: string) => {
    return focusedField === field ? "#51BEA6" : "#d9d9d9";
  };

  return (
    <div className="flex flex-col h-screen bg-[#d9d9d9]">
      <div className="px-[24px] py-[12px] bg-white">
        <SearchBar
          showBackButton={false}
          searchTerm={keyword}
          setSearchTerm={setKeyword}
          onSearch={searchPlaces}
          placeholder="장소를 검색하세요"
          borderColor={getBorderColor("search")}
          onFocus={() => setFocusedField("search")}
          onBlur={() => setFocusedField(null)}
        />
      </div>

      {/* 지도 */}
      <div ref={mapRef} className="w-full h-[300px]" />

      {/* 결과 리스트 */}
      <ul className="overflow-y-auto p-4 flex-grow space-y-2 bg-white">
        {places.map((place) => (
          <li
            key={place.id}
            onClick={() => handleSelect(place)}
            className="p-3 border rounded cursor-pointer hover:bg-gray-50"
          >
            <div className="font-semibold">{place.place_name}</div>
            <div className="text-sm text-gray-500">{place.road_address_name || place.address_name}</div>
          </li>
        ))}
        {places.length === 0 && <li className="text-center text-sm text-gray-400 mt-8">검색 결과가 없습니다.</li>}
      </ul>
    </div>
  );
};

export default SearchLocationPage;
