import DexDetailHeader from "features/dex/components/DexDetailHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";

interface TaxonomyType {
  orderKor: string;
  familyKor: string;
  genusKor: string;
}

interface BirdDetail {
  id: number;
  koreanName: string;
  scientificName: string;
  description: string;
  imageUrls: string[];
  habitats: string[];
  taxonomy: TaxonomyType;
}

const DexDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [bird, setBird] = useState<BirdDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBird = async () => {
      try {
        const res = await axios.get(`/api/v1/birds/${id}`);
        setBird(res.data);
      } catch (err) {
        setError("존재하지 않는 새입니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchBird();
  }, [id]);

  if (loading) return <div className="text-center mt-10"> 로딩 중... </div>;
  if (error || !bird) return <div className="text-center mt-10">{error}</div>;

  return (
    <div className="min-h-[100vh] bg-white">
      <DexDetailHeader item={bird} />
      <div className="flex flex-col mt-[11px] mx-[24px]">
        <img src={bird.imageUrls[0]} alt={bird.koreanName} className="w-full rounded-[10px] object-cover" />

        {/* 계절 데이터 안 가져와서 일단 서식지만 */}
        <div className="flex mx-[7px] mt-[16px] gap-[5px]">
          {bird.habitats.map((habitat, idx) => (
            <div
              key={idx}
              className="inline-flex justify-center items-center h-[33px] py-[7px] px-[13px] font-pretendard text-[#fefefe] text-[15px] font-700  rounded-[100px] bg-green"
            >
              {habitat}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-[29px] mx-[25px]">
        <span className="font-pretendard font-600 text-[20px] text-black">분류</span>
        <span className="mt-[12px] font-pretendard font-400 text-[13px] text-[#6d6d6d] ">
          {bird.taxonomy.orderKor} <BracketIcon className="inline-block" /> {bird.taxonomy.familyKor}{" "}
          <BracketIcon className="inline-block" /> {bird.taxonomy.genusKor}{" "}
        </span>
      </div>
      <div className="flex flex-col mt-[27px] mx-[25px]">
        <span className="font-pretendard font-600 text-[20px] text-black">상세 설명</span>
        <span className="mt-[14px] font-pretendard font-400 text-[15px] text-black ">{bird.description} </span>
      </div>
    </div>
  );
};

export default DexDetailPage;
