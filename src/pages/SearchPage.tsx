import SearchBar from "components/common/textfield/SearchBar";
import { ReactComponent as XIcon } from "assets/icons/x.svg";
import { useState } from "react";

interface SearchRecord {
  keyword: string;
  date: string;
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>([]);

  const handleSearch = (keyword: string) => {
    if (!keyword) return;
    const now = new Date();
    const formattedDate = `${String(now.getMonth() + 1).padStart(2, "0")}. ${String(now.getDate()).padStart(2, "0")}.`;
    const newRecord: SearchRecord = {
      keyword,
      date: formattedDate,
    };

    setSearchHistory((prev) => [...prev, newRecord]);
    setSearchTerm("");
  };

  const handleDeleteHistory = (index: number) => {
    setSearchHistory((prev) => prev.filter((_, idx) => idx !== index)); // 선택한 기록 삭제
  };

  return (
    <div className="min-h-[100vh] bg-white font-pretendard ">
      <div className="mx-[24px] my-[12px]">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="원하는 장소를 검색해보세요"
          onSearch={handleSearch}
        />
      </div>
      {/* <FilterHeader activeFilters={} handleFilterClick={}/> */}
      <div className="flex flex-col ">
        {searchHistory.length === 0 ? (
          <span className="items-center justify-center flex text-[14px] text-[#979797]">검색 기록이 없습니다.</span>
        ) : (
          searchHistory.map((history, index) => (
            <div key={index} className="border-t border-[#d9d9d9] flex h-[55px] justify-between items-center">
              <span className="ml-[25px] text-[15px] font-400 text-[#455154]">{history.keyword}</span>
              <div className="flex gap-[7px]">
                <span className=" text-[13px] font-400 text-[#979797]">{history.date}</span>
                <button onClick={() => handleDeleteHistory(index)} className="mr-[25px] ">
                  <XIcon className="w-[10px] h-[10px]" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
