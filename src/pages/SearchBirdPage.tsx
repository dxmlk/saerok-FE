import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleHeader from "components/common/SimpleHeader";
import SearchBar from "components/common/textfield/SearchBar";
import { useSaerokForm } from "states/useSaerokForm";
import { autocompleteApi, fetchBookmarkListApi, getBirdInfoByNameApi, BirdInfo } from "services/api/birds/index";
import SearchSuggestions from "components/common/textfield/SearchSuggestions";

const SearchBirdPage = () => {
  const navigate = useNavigate();
  const { setBirdName, setBirdId } = useSaerokForm();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<BirdInfo[]>([]);

  //항목 클릭 시
  const handleSelect = (info: BirdInfo) => {
    setBirdName(info.koreanName);
    setBirdId(info.birdId);
    navigate("/add-saerok");
  };

  // 1) 검색어가 없으면 북마크한 새 목록, 있으면 자동완성 결과
  useEffect(() => {
    let canceled = false;
    const load = async () => {
      if (!searchTerm.trim()) {
        try {
          const res = await fetchBookmarkListApi();
          if (canceled) return;
          const list: BirdInfo[] = res.data.map((b: any) => ({
            birdId: b.birdId,
            koreanName: b.koreanName,
            scientificName: b.scientificName,
          }));
          setSuggestions(list);
        } catch {
          if (!canceled) setSuggestions([]);
        }
      } else {
        try {
          const { suggestions: names } = (await autocompleteApi(searchTerm)).data;
          const infos = await Promise.all((names || []).map((name: string) => getBirdInfoByNameApi(name)));
          if (!canceled) setSuggestions(infos.filter((x): x is BirdInfo => x !== null));
        } catch {
          if (!canceled) setSuggestions([]);
        }
      }
    };

    const timer = setTimeout(load, 300);
    return () => {
      canceled = true;
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <div className="min-h-[100dvh] bg-background-whitegray ">
      <SimpleHeader title="이름 찾기" />

      <div className="px-24 bg-white pt-10 pb-20 ">
        <SearchBar
          ref={inputRef}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => {}}
          placeholder="새 이름을 입력해주세요"
        />
      </div>

      <SearchSuggestions visible={true} suggestions={suggestions} onSelect={handleSelect} />
    </div>
  );
};

export default SearchBirdPage;
