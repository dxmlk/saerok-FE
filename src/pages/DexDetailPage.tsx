import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";
import { ReactComponent as ArrowLeftIcon } from "assets/icons/button/arrow-left.svg";
import { ReactComponent as ScrapIcon } from "assets/icons/button/scrap.svg";
import addSaerokPng from "assets/icons/button/add-saerok.png";
import { ReactComponent as SeasonIcon } from "assets/icons/icon/season.svg";
import { ReactComponent as HabitatIcon } from "assets/icons/icon/habitat.svg";
import { ReactComponent as SizeIcon } from "assets/icons/icon/size.svg";
import ScrollToTopButton from "components/common/button/ScrollToTopButton.js";
import { fetchBookmarkStatusApi, fetchDexDetailApi, toggleBookmarkApi } from "services/api/birds/index.js";
import { DexDetailSkeleton } from "components/common/SkeletonItem.js";

const seasonMap: Record<string, string> = {
  SPRING: "봄",
  SUMMER: "여름",
  AUTUMN: "가을",
  WINTER: "겨울",
};

const habitatMap: Record<string, string> = {
  MUDFLAT: "갯벌",
  FARMLAND: "경작지/들판",
  FOREST: "산림/계곡",
  MARINE: "해양",
  RESIDENTAIL: "거주지역",
  PLAINS_FOREST: "평지숲",
  RIVER_LAKE: "하천/호수",
  ARTIFICIAL: "인공시설",
  CAVE: "동굴",
  WETLAND: "습지",
  OTHERS: "기타",
};

const joinWithSeparator = (items: string[], map: Record<string, string>, separator: string): string => {
  return items.map((item) => map[item] || item).join(`${separator}`);
};

interface TaxonomyType {
  orderKor: string;
  familyKor: string;
  genusKor: string;
}

interface seasonsWithRarityType {
  season: string;
  rarity: string;
  priority: number;
}

interface BirdDetail {
  id: number;
  koreanName: string;
  scientificName: string;
  taxonomy: TaxonomyType;
  description: string;
  imageUrls: string[];
  sizeCategory: string;
  habitats: string[];
  seasonsWithRarity: seasonsWithRarityType[];
}

const DexDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [bird, setBird] = useState<BirdDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean | null>(null);

  const navigate = useNavigate();

  // 상세 정보 조회
  useEffect(() => {
    const fetchBird = async () => {
      if (!id) return;
      const numericId = parseInt(id, 10);
      try {
        const res = await fetchDexDetailApi(numericId);
        setBird(res.data);
      } catch (err) {
        setError("존재하지 않는 새입니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchBird();
  }, [id]);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!id) return;
      const numericId = parseInt(id, 10);
      try {
        const res = await fetchBookmarkStatusApi(numericId);
        setBookmarked(res.data.bookmarked);
      } catch (err) {
        console.error("북마크 상태 조회 실패:", err);
      }
    };
    fetchStatus();
  }, [id]);

  const habitatText = bird ? joinWithSeparator(bird.habitats, habitatMap, "•") : "";
  const seasonText = bird
    ? joinWithSeparator(
        bird.seasonsWithRarity.map((s) => s.season),
        seasonMap,
        "•"
      )
    : "";

  const toggleBookmark = async (birdId: number) => {
    try {
      await toggleBookmarkApi(birdId);
      // 북마크 성공 시 로컬 상태도 반전
      setBookmarked((prev) => (prev === null ? true : !prev));
    } catch (err) {
      console.error("북마크 토글 실패:", err);
    }
  };

  const handleAddSaerok = () => {
    if (!bird) return;
    navigate("/add-saerok", {
      state: {
        birdId: bird.id,
        birdName: bird.koreanName,
      },
    });
  };

  if (loading) return <DexDetailSkeleton />;
  if (error || !bird) return <div className="text-center mt-10">{error}</div>;

  return (
    <div className="min-h-[100vh] bg-white mb-120">
      <div className="flex flex-col mt-36 px-16">
        <div className="relative">
          <img src={bird.imageUrls[0]} alt={bird.koreanName} className="w-full rounded-20 object-cover" />
          <button
            onClick={() => navigate(-1)}
            className="flex justify-center items-center w-40 h-40 absolute top-8 left-8 rounded-full bg-glassmorphism z-10 cursor-pointer"
          >
            <ArrowLeftIcon className="flex justify-center items-center fill-black w-17 h-17 " />
          </button>
          <button
            onClick={() => {
              if (bird) toggleBookmark(bird.id);
            }}
            className="flex justify-center items-center w-40 h-40 absolute bottom-8 right-56 rounded-full bg-glassmorphism z-10 cursor-pointer"
          >
            <ScrapIcon
              className={`flex justify-center items-center w-24 h-24 stroke-[2px]  ${bookmarked ? "fill-font-pointYellow stroke-font-pointYellow" : " stroke-black fill-none"}`}
            />
          </button>
          <button
            onClick={() => handleAddSaerok()}
            className="flex justify-center items-center w-40 h-40 absolute bottom-8 right-8 rounded-full bg-glassmorphism z-10 cursor-pointer"
          >
            <img src={addSaerokPng} alt="새록 추가" className="w-24 h-24 object-contain" />
          </button>
        </div>

        <div className="flex flex-row flex-wrap justify-start gap-7 px-8 mt-18 font-pretendard">
          {/* 계절 */}
          {seasonText && (
            <div className="w-fit px-12  h-33 flex flex-row justify-center items-center gap-5  bg-mainBlueLight rounded-100 stroke-background-white text-background-white text-body-1 ">
              <SeasonIcon className="w-17 h-17" />
              <div>{seasonText}</div>
            </div>
          )}

          {/* 서식지 */}
          {habitatText && (
            <div className="w-fit px-12  h-33 flex flex-row justify-center items-center gap-5  bg-mainBlueLight rounded-100 stroke-background-white text-background-white text-body-1 ">
              <HabitatIcon className="w-17 h-17" />
              <div>{habitatText}</div>
            </div>
          )}

          {/* 크기 */}
          {bird.sizeCategory && (
            <div className="w-fit px-12 h-33 flex flex-row justify-center items-center gap-5  bg-mainBlueLight rounded-100  text-background-white text-body-1 ">
              <SizeIcon className="w-17 h-17 fill-white" />
              <div>{bird.sizeCategory}</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-40 flex flex-col justify-center text-center gap-0 ">
        <div className="font-moneygraphy text-subtitle-1 text-font-black">{bird.koreanName}</div>
        <div className="font-pretendard text-body-2 text-font-whitegrayDark">{bird.scientificName}</div>
      </div>

      <div className="flex flex-col mt-40 px-24 gap-14">
        <span className="font-moneygraphy text-subtitle-2 text-font-black">분류</span>
        <span className="font-pretendard text-caption-1 text-font-darkgray items-center">
          {bird.taxonomy.orderKor} <BracketIcon className="inline-block fill-font-whitegrayLight" />{" "}
          {bird.taxonomy.familyKor} <BracketIcon className="inline-block fill-font-whitegrayLight" />{" "}
          {bird.taxonomy.genusKor}{" "}
        </span>
      </div>

      <div className="flex flex-col mt-28 px-24 gap-14">
        <span className="font-moneygraphy text-subtitle-2 text-font-black">상세 설명</span>
        <span className="font-pretendard text-body-4 text-font-black">{bird.description} </span>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default DexDetailPage;
