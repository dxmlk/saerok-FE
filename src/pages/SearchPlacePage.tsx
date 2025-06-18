import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "components/common/textfield/SearchBar";
import { useSaerokForm } from "states/useSaerokForm";
import { KakaoPlace } from "types/kakao";

const SearchPlacePage = () => {
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<KakaoPlace[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const navigate = useNavigate();
  const { setPlaceNameDetails } = useSaerokForm();

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

  const showMarkers = (results: KakaoPlace[]) => {
    const kakao = (window as any).kakao;
    const map = mapInstance.current;
    const bounds = new kakao.maps.LatLngBounds();

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

  const handleSelect = (place: KakaoPlace) => {
    setPlaceNameDetails({
      placeName: place.place_name,
      address: place.road_address_name || place.address_name,
      locationAlias: place.place_name,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
    });
    navigate("/add-saerok");
  };

  return (
    <div className="flex flex-col h-screen bg-[#d9d9d9]">
      <div className="px-[24px] py-[12px] bg-white">
        <SearchBar
          searchTerm={keyword}
          setSearchTerm={setKeyword}
          onSearch={searchPlaces}
          placeholder="장소를 검색하세요"
        />
      </div>

      <div ref={mapRef} className="w-full h-[300px]" />

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

export default SearchPlacePage;
