import { useState, useEffect } from "react";
import SearchBar from "components/common/textfield/SearchBar";
import { KakaoPlace } from "types/kakao";
import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";
import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";

const KAKAO_APP_KEY = "9f8230e848e24bb14fa14ff044819970";

interface SearchPlaceSelectorProps {
  onSelect: (place: { lat: number; lng: number; address: string; roadAddress?: string }) => void;
  placeholder?: string;
  onBack?: () => void;
}

export default function SearchPlaceSelector({ onSelect, placeholder, onBack }: SearchPlaceSelectorProps) {
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<KakaoPlace[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if ((window as any).kakao) return; // 이미 있으면 중복 로딩 방지
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      (window as any).kakao.maps.load(() => {});
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const searchPlaces = () => {
    if (!keyword.trim()) return;
    const kakao = (window as any).kakao;
    if (!kakao?.maps?.services) {
      alert("카카오 지도 서비스 준비 중");
      return;
    }
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data: KakaoPlace[], status: string) => {
      setSearchPerformed(true);
      setPlaces(status === kakao.maps.services.Status.OK ? data : []);
    });
  };

  const handleSelect = (place: KakaoPlace) => {
    onSelect({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      address: place.address_name,
      roadAddress: place.road_address_name,
    });
    setSearchPerformed(false);
  };

  return (
    <div className="w-full">
      <div className="px-24 ">
        <SearchBar
          searchTerm={keyword}
          setSearchTerm={setKeyword}
          onSearch={searchPlaces}
          placeholder={placeholder || "장소를 검색하세요"}
          onBack={onBack}
        />
      </div>
      {searchPerformed && (
        <div className="flex flex-col mt-24">
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
                <BracketIcon className="w-17 h-17 text-font-whitegrayDark" />
              </div>
            ))
          ) : (
            <div className="px-24 pt-20 text-center text-font-whitegrayDark">검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
