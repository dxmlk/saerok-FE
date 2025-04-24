import SearchBar from "components/common/SearchBar";
import AddImage from "features/collection/components/AddImage";
import { useState } from "react";

const AddCollectionPage = () => {
    const [searchName, setSearchName] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [review, setReview] = useState("");
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSearchName = (keyword: string) => {
    }
    const handleSearchLocation = (keyword: string) => {
    }

    function handleDatePicker(): void {
        throw new Error("Function not implemented.");
    }

    const getBorderColor = (field: string) => {
        return focusedField === field ? "#51BEA6" : "#d9d9d9";
    }
    

    return (
        
        <div className='px-[24px]  bg-white h-[100vh] font-pretendard'>
            <AddImage/>
            <div className='mt-[29px]'>
                <div className='ml-[13px] mb-[7px] text-[13px] font-400 text-black'>새 이름</div>
                <SearchBar  showBackButton={false} searchTerm={searchName} setSearchTerm={setSearchName} 
                            onSearch={handleSearchName} placeholder='새 이름을 입력해주세요' borderColor={`${getBorderColor("name")}`}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}/>
            </div>
            <div className='mt-[20px]'>
                <div className='ml-[13px] mb-[7px] text-[13px] font-400 text-black'>발견 일시</div>
                <button className='  border-[#d9d9d9] h-[44px] w-full flex border rounded-[10px] border-[2px] items-center' 
                        onClick={() => handleDatePicker()}
                        onFocus={() => setFocusedField("date")}
                        onBlur={() => setFocusedField(null)}
                        style={{borderColor: `${getBorderColor("date")}`}}>
                    <span className='items-center justify-start flex text-[#979797] w-full h-full text-[15px] font-400 ml-[20px] mr-[26px] '>발견 일시를 입력해주세요</span>
                </button>
            </div>
            <div className='mt-[20px]'>
                <div className='ml-[13px] mb-[7px] text-[13px] font-400 text-black'>발견 장소</div>
                <SearchBar  showBackButton={false} searchTerm={searchLocation} setSearchTerm={setSearchLocation} 
                            onSearch={handleSearchLocation} placeholder='발견 장소를 입력해주세요' borderColor={`${getBorderColor("location")}`}
                            onFocus={() => setFocusedField("location")}
                            onBlur={() => setFocusedField(null)}/>
            </div>
            <div className='mt-[20px]'>
                <div className='ml-[13px] mb-[7px] text-[13px] font-400 text-black'>한 줄 평</div>
                <div className=' h-[44px] w-full flex border rounded-[10px] border-[2px] items-center'
                    style={{borderColor: `${getBorderColor("review")}`}}>
                    <input  className='outline-none w-full h-full items-center text-[15px] font-400 ml-[20px] mr-[26px] text-black ' 
                            placeholder="한 줄 평을 입력해주세요" 
                            value={review}
                            onFocus={() => setFocusedField("review")}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => {
                                if (e.target.value.length <= 100) {
                                    setReview(e.target.value);
                                }
                            }}
                    />
                </div>
                <div className='mt-[5px] text-right text-[#979797] font-400 text-[13px]'>({review.length}/100)</div>
            </div>
        </div>
        
    )
} 

export default AddCollectionPage;