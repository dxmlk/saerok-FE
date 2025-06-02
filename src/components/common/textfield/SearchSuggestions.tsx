import axios from "axios";
import { useEffect, useState } from "react";

interface SearchSuggestionsProps {
  visible: boolean;
  searchTerm: string;
  onSearch: (keyword: string) => void;
  setSearchTerm: (value: string) => void;
}

const SearchSuggestions = ({ visible, searchTerm, onSearch, setSearchTerm }: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        const res = await axios.get("/api/v1/birds/autocomplete", {
          params: { q: searchTerm.trim() },
        });
        setSuggestions(res.data.suggestions || []);
      } catch (err) {
        console.error("자동완성 실패:", err);
      }
    }, 200);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="absolute top-[44px] left-0 right-0 bg-white border border-font-whitegrayLight z-40 rounded shadow-md">
      {suggestions.map((item, idx) => (
        <div
          key={idx}
          onMouseDown={(e) => {
            e.preventDefault();
            setSearchTerm(item);
            onSearch(item);
          }}
          className="px-12 py-8 text-sm cursor-pointer font-pretendard hover:bg-gray-100"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;
