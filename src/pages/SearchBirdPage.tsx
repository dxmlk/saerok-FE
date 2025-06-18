import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SimpleHeader from "components/common/SimpleHeader";
import SearchBar from "components/common/textfield/SearchBar";
import { useSaerokForm } from "states/useSaerokForm";
import { getBirdIdByNameApi } from "services/api/birds";

const SearchBirdPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { setBirdName, setBirdId } = useSaerokForm();

  const handleSearch = (keyword: string) => {
    console.log("검색 실행:", keyword);
  };

  const handleSelectSuggestion = async (koreanName: string) => {
    const birdId = await getBirdIdByNameApi(koreanName);
    if (!birdId) {
      alert("해당 이름의 새를 찾을 수 없습니다.");
      return;
    }

    setBirdName(koreanName);
    setBirdId(birdId);
    navigate("/add-saerok");
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get("/api/v1/birds/autocomplete", {
          params: { q: searchTerm },
        });
        setSuggestions(res.data.suggestions || []);
      } catch (e) {
        console.error("자동완성 api 호출 실패", e);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="min-h-[100dvh] bg-background-whitegray">
      <SimpleHeader title="이름 찾기" />
      <div className="px-24 bg-white pt-10 pb-20">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          placeholder="새 이름을 입력해주세요"
        />
      </div>
      <div className="px-24 mt-4">
        {suggestions.length > 0 && (
          <ul className="bg-white border rounded-lg shadow-md">
            {suggestions.map((item) => (
              <li
                key={item}
                onClick={() => handleSelectSuggestion(item)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBirdPage;
