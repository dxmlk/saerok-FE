import NaverMap from "components/common/NaverMap";
import SearchBar from "components/common/textfield/SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {};

  return (
    <div className="relative w-screen h-screen z-0">
      <NaverMap />

      <div className="absolute top-20 w-[89%] left-1/2 -translate-x-1/2 z-10  ">
        <div onClick={() => navigate("/search-location")}>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            placeholder="원하는 장소 검색"
          />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
