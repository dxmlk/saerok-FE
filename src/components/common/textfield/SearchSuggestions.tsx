// components/common/textfield/SearchSuggestions.tsx
import { BirdInfo } from "services/api/birds/index.js";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ScrapIcon } from "assets/icons/button/scrap.svg";
import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";
import { useRecoilValue } from "recoil";
import { bookmarkedBirdIdsState, useToggleBookmarkAndSync } from "states/bookmarkState.js";

interface SearchSuggestionsProps {
  visible: boolean;
  suggestions: BirdInfo[];
  onSelect: (info: BirdInfo) => void;
}

const SearchSuggestions = ({ visible, suggestions, onSelect }: SearchSuggestionsProps) => {
  const navigate = useNavigate();

  // 전역 북마크 상태/토글 훅
  const bookmarkedBirdIds = useRecoilValue(bookmarkedBirdIdsState);
  const toggleBookmark = useToggleBookmarkAndSync();

  if (!visible || !suggestions.length) return null;

  return (
    <div
      className="search-suggestions-list absolute left-0 right-0 bg-white border border-font-whitegrayLight z-40"
      tabIndex={-1}
    >
      {suggestions.map((info) => {
        const isBookmarked = bookmarkedBirdIds.includes(info.birdId);
        return (
          <div
            key={info.birdId}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).tagName === "BUTTON") {
                return;
              }
              onSelect(info);
            }}
            className="px-24 border-t bg-white border-background-whitegray flex h-68 justify-between items-center cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center gap-18">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  toggleBookmark(info.birdId);
                }}
              >
                <ScrapIcon
                  className={`w-24 h-24 stroke-[2px] ${
                    isBookmarked
                      ? "fill-font-pointYellow stroke-font-pointYellow"
                      : "stroke-font-whitegrayDark fill-none"
                  }`}
                />
              </button>
              <div className="flex flex-col gap-1">
                <div className="text-body-3 font-moneygraphy text-font-black">{info.koreanName}</div>
                <div className="text-caption-1 font-pretendard text-font-whitegrayDark">{info.scientificName}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/dex-detail/${info.birdId}`);
              }}
            >
              <BracketIcon className="w-17 h-17" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SearchSuggestions;
