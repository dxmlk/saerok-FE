// src/pages/SearchBirdPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleHeader from "components/common/SimpleHeader";
import SearchBar from "components/common/textfield/SearchBar";
import { useSaerokForm } from "states/useSaerokForm";
import {
  autocompleteApi,
  fetchBookmarkListApi,
  fetchBookmarkStatusApi,
  getBirdInfoByNameApi,
  BirdInfo,
  toggleBookmarkApi,
} from "services/api/birds";
import { ReactComponent as ScrapIcon } from "assets/icons/button/scrap.svg";
import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";

const SearchBirdPage = () => {
  const navigate = useNavigate();
  const { setBirdName, setBirdId } = useSaerokForm();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<BirdInfo[]>([]);
  const [bookmarkStatuses, setBookmarkStatuses] = useState<Record<number, boolean>>({});

  // 항목 클릭 시
  const handleSelect = (info: BirdInfo) => {
    setBirdName(info.koreanName);
    setBirdId(info.birdId);
    navigate("/add-saerok");
  };

  // 1) 검색어가 없으면 북마크한 새 목록, 있으면 자동완성 결과를 BirdInfo 로 변환
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
          if (!canceled) {
            // null 필터링
            setSuggestions(infos.filter((x): x is BirdInfo => x !== null));
          }
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

  useEffect(() => {
    suggestions.forEach((info) => {
      const id = info.birdId;
      if (bookmarkStatuses[id] === undefined) {
        fetchBookmarkStatusApi(id)
          .then((res) => setBookmarkStatuses((prev) => ({ ...prev, [id]: Boolean(res.data.bookmarked) })))
          .catch(() => setBookmarkStatuses((prev) => ({ ...prev, [id]: false })));
      }
    });
  }, [suggestions, bookmarkStatuses]);

  const toggleBookmark = async (birdId: number) => {
    try {
      await toggleBookmarkApi(birdId);
      // 북마크 성공 시 로컬 상태도 반전
      setBookmarkStatuses((prev) => ({
        ...prev,
        [birdId]: !prev[birdId],
      }));
    } catch (err) {
      console.error("북마크 토글 실패:", err);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background-whitegray ">
      <SimpleHeader title="이름 찾기" />

      <div className="px-24 bg-white pt-10 pb-20 ">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => {}}
          placeholder="새 이름을 입력해주세요"
        />
      </div>

      <div className="flex flex-col pb-120">
        {suggestions.map((info) => {
          const isBookmarked = !!bookmarkStatuses[info.birdId];
          return (
            <div
              key={info.birdId}
              onClick={() => handleSelect(info)}
              className="px-24 border-t bg-white border-background-whitegray flex h-68 justify-between items-center cursor-pointer"
            >
              <div className="flex items-center gap-18">
                <button
                  onClick={(e) => {
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
    </div>
  );
};

export default SearchBirdPage;
