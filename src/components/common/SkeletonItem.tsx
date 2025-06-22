export const DexItemSkeleton = () => (
  <div
    className="relative rounded-10 bg-background-white flex flex-col w-full h-198 animate-pulse overflow-visible"
    style={{ boxShadow: "0px 0px 5px rgba(13,13,13,0.1)" }}
  >
    <div className="absolute top-0 left-0 w-full h-170 rounded-10 bg-gray-200 " />
    <div className="absolute bottom-0 w-full h-52 px-14 py-10 flex flex-col gap-2">
      <div className="h-12 w-2/3 bg-gray-200 rounded mb-4" />
      <div className="h-8 w-1/2 bg-gray-100 rounded" />
    </div>
  </div>
);

export const SaerokItemSkeleton = () => (
  <div className="flex flex-col gap-0 w-full animate-pulse">
    <div className="rounded-10 w-full h-120 bg-gray-200 mb-8" />
    <div className="h-10 w-2/3 bg-gray-100 rounded" />
  </div>
);

import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";
import { ReactComponent as UserIcon } from "assets/icons/icon/user.svg";
import { ReactComponent as TimeIcon } from "assets/icons/icon/time.svg";

export const SaerokInfoSkeleton = () => (
  <>
    {/* 이미지 영역 */}
    <div className="relative w-full h-auto z-0 animate-pulse">
      <div className="w-full h-240 bg-gray-200 rounded-10" />
      {/* 하단 그라데이션 효과 */}
      <div className="bg-[linear-gradient(180deg,rgba(254,254,254,0)_0%,rgba(254,254,254,1)_100%)] absolute w-full h-84 bottom-0"></div>
    </div>

    {/* 본문 정보 */}
    <div className="font-pretendard px-24 flex flex-col animate-pulse">
      {/* 노트 */}
      <div className="w-full bg-background-whitegray rounded-10 px-26 pt-32 pb-20 mb-4">
        <div className="h-28 w-5/6 bg-gray-200 rounded mb-2" />
        <div className="h-28 w-4/6 bg-gray-100 rounded" />
      </div>
      {/* 위치 */}
      <div className="mt-28 flex flex-row gap-10 justify-start items-center">
        <MapIcon className="w-24 h-24 text-font-pointYellow" />
        <div className="flex flex-col gap-1">
          <div className="h-16 w-36 bg-gray-200 rounded mb-1" />
          <div className="h-12 w-64 bg-gray-100 rounded" />
        </div>
      </div>
      {/* 날짜 */}
      <div className="mt-20 flex flex-row gap-10 justify-start items-center">
        <TimeIcon className="w-24 h-24 text-font-pointYellow" />
        <div className="h-16 w-32 bg-gray-200 rounded" />
      </div>
      {/* 작성자 */}
      <div className="mt-28 flex flex-row gap-10 justify-start items-center">
        <UserIcon className="w-24 h-24 text-font-pointYellow" />
        <div className="h-16 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  </>
);

import { ReactComponent as SeasonIcon } from "assets/icons/icon/season.svg";
import { ReactComponent as HabitatIcon } from "assets/icons/icon/habitat.svg";
import { ReactComponent as SizeIcon } from "assets/icons/icon/size.svg";
import { ReactComponent as BracketIcon } from "assets/icons/bracket.svg";

export const DexDetailSkeleton = () => (
  <div className="min-h-[100vh] bg-white pb-120 animate-pulse">
    <div className="flex flex-col mt-36 px-16">
      {/* 이미지 영역 */}
      <div className="relative w-full">
        <div className="w-full h-200 rounded-20 bg-gray-200" />
        <div className="flex gap-4 absolute bottom-8 right-8 z-10">
          <div className="w-40 h-40 rounded-full bg-gray-100" />
          <div className="w-40 h-40 rounded-full bg-gray-100" />
        </div>
      </div>

      {/* 상단 태그들 */}
      <div className="flex flex-row flex-wrap justify-start gap-7 px-8 mt-18">
        <div className="w-fit px-12 h-33 flex flex-row items-center gap-5 bg-mainBlueLight rounded-100">
          <SeasonIcon className="w-17 h-17 opacity-40" />
          <div className="h-12 w-32 bg-gray-200 rounded" />
        </div>
        <div className="w-fit px-12 h-33 flex flex-row items-center gap-5 bg-mainBlueLight rounded-100">
          <HabitatIcon className="w-17 h-17 opacity-40" />
          <div className="h-12 w-32 bg-gray-200 rounded" />
        </div>
        <div className="w-fit px-12 h-33 flex flex-row items-center gap-5 bg-mainBlueLight rounded-100">
          <SizeIcon className="w-17 h-17 opacity-40" />
          <div className="h-12 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </div>

    {/* 새 이름/학명 */}
    <div className="mt-40 flex flex-col justify-center text-center gap-0">
      <div className="h-20 w-36 bg-gray-200 rounded mx-auto mb-4" />
      <div className="h-14 w-28 bg-gray-100 rounded mx-auto" />
    </div>

    {/* 분류 */}
    <div className="flex flex-col mt-40 px-24 gap-14">
      <span className="font-moneygraphy text-subtitle-2 text-font-black">분류</span>
      <span className="flex flex-row gap-2 items-center">
        <div className="h-12 w-18 bg-gray-200 rounded" />
        <BracketIcon className="inline-block fill-font-whitegrayLight" />
        <div className="h-12 w-18 bg-gray-200 rounded" />
        <BracketIcon className="inline-block fill-font-whitegrayLight" />
        <div className="h-12 w-18 bg-gray-200 rounded" />
      </span>
    </div>

    {/* 설명 */}
    <div className="flex flex-col mt-28 px-24 gap-14">
      <span className="font-moneygraphy text-subtitle-2 text-font-black">상세 설명</span>
      <div className="flex flex-col gap-2">
        <div className="h-20 w-full bg-gray-200 rounded mb-2" />
        <div className="h-20 w-2/3 bg-gray-100 rounded" />
      </div>
    </div>
  </div>
);
