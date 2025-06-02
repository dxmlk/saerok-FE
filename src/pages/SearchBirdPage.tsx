import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";
import axios from "axios";
import SearchBar from "components/common/textfield/SearchBar";
import { useEffect, useState } from "react";

const SearchBirdPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedBirdIds, setBookmarkedBirdIds] = useState<number[]>([]);

  const handleSearch = (keyword: string) => {
    console.log("검색 실행:", keyword);
    // 여기에 API 호출 또는 페이지 이동 등을 구현
  };

  // 이거 api 수정 필요
  // 북마크한 조류 정보 상세 조회 api로
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get("/api/v1/birds/bookmarks/");
        const ids = res.data.map((b: { birdId: number }) => b.birdId);
        setBookmarkedBirdIds(ids);
      } catch (e) {
        console.error("북마크를 불러오는 데 실패했습니다.", e);
      }
    };

    fetchBookmarks();
  });

  return (
    <>
      <div className="min-h-[100dvh] bg-background-whitegray">
        <div className="relative px-24 w-full h-68 bg-white flex flex-row items-center justify-center">
          <div>
            <BracketIcon className="absolute left-24 bottom-26 w-17 h-17 scale-x-[-1] fill-black" />
          </div>
          <div className="font-moneygraphy text-subtitle-2 text-font-black">이름 찾기</div>
        </div>
        <div className="px-24 bg-white pt-10 pb-20 ">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            placeholder="새 이름을 입력해주세요"
          />
        </div>

        {/* 북마크한 종들 보이게 */}
        <div></div>
      </div>
    </>
  );
};

export default SearchBirdPage;
