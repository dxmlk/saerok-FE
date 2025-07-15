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

import { ReactComponent as Trapzoid } from "assets/polygon/trapzoid.svg";
import { ReactComponent as DexIcon } from "assets/icons/button/dex.svg";
import { ReactComponent as EditIcon } from "assets/icons/button/edit.svg";
import { ReactComponent as SortIcon } from "assets/icons/button/sort.svg";
import { ReactComponent as HeartIcon } from "assets/icons/button/heart.svg";
import { ReactComponent as CommentIcon } from "assets/icons/button/comment.svg";
import { ReactComponent as MapIcon } from "assets/icons/nav/map.svg";
import { ReactComponent as UserIcon } from "assets/icons/icon/user.svg";
import { ReactComponent as TimeIcon } from "assets/icons/icon/time.svg";

export const SaerokInfoSkeleton = () => (
  <div className="w-full min-h-screen bg-background-whitegray pb-120 animate-pulse">
    {/* 이미지 영역 */}
    <div className="w-full h-240 bg-gray-200 rounded-b-20" />

    <div className="mx-24 -mt-25">
      {/* 상단 타이틀 + 버튼 그룹 */}
      <div className="relative -mb-19 h-60">
        {/* 새 이름(타이틀) 스켈레톤 */}
        <div className="absolute left-0 top-0 z-20 px-17 py-19 bg-gray-100 rounded-20 w-80 h-30" />

        {/* Trapzoid + 버튼 그룹 */}
        <div className="absolute right-0 top-0 z-5 flex items-center h-60 w-127">
          <Trapzoid className="absolute top-0 right-0 h-60 w-full z-0 opacity-30" />
          <div className="absolute top-0 right-0 w-full h-full z-10 flex flex-row pl-27 pr-11 pt-11 pb-9 gap-9">
            <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center" />
            <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center" />
          </div>
        </div>
      </div>

      {/* 노트 및 좋아요/댓글 */}
      <div className="bg-background-white rounded-b-20">
        <div className="pt-38 pb-19 px-26">
          <div className="h-28 w-5/6 bg-gray-200 rounded mb-2" />
          <div className="h-28 w-4/6 bg-gray-100 rounded" />
        </div>
        <div className="flex flex-row justify-around font-pretendard divide-x-1 divide-background-whitegray">
          <div className="py-16 pl-14 pr-21 w-full flex justify-between items-center">
            <HeartIcon className="stroke-font-whitegray" />
            <div className="h-20 w-18 bg-gray-100 rounded" />
          </div>
          <div className="py-16 pl-15 pr-19 w-full flex justify-between items-center">
            <CommentIcon className="stroke-font-whitegray" />
            <div className="h-20 w-18 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>

    {/* 위치, 날짜, 유저 */}
    <div className="mt-10 mx-24 bg-background-white rounded-20 py-15 px-16 flex flex-col gap-20 font-pretendard">
      {/* 위치 */}
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row items-start gap-5">
          <MapIcon className="w-17 h-17 text-font-pointYellow opacity-40" />
          <div className="flex flex-col justify-start gap-5">
            <div className="h-16 w-36 bg-gray-200 rounded mb-1" />
            <div className="h-12 w-64 bg-gray-100 rounded" />
          </div>
        </div>
        <BracketIcon className="w-17 h-17 text-font-whitegrayDark opacity-40" />
      </div>
      {/* 날짜 */}
      <div className="flex flex-row justify-start items-center gap-5">
        <TimeIcon className="w-17 h-17 text-font-pointYellow opacity-40" />
        <div className="h-16 w-32 bg-gray-200 rounded" />
      </div>
      {/* 작성자 */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <UserIcon className="w-17 h-17 fill-font-pointYellow opacity-40" />
          <div className="h-16 w-24 bg-gray-200 rounded" />
        </div>
        <BracketIcon className="w-17 h-17 text-font-whitegrayDark opacity-40" />
      </div>
    </div>
  </div>
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

      {/* 상단 태그들*/}
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
