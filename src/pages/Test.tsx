import React from "react";
import axiosPrivate from "services/api/axiosPrivate"; // 토큰 붙는 인스턴스

const Test = () => {
  const collectionId = 318; // 테스트용 컬렉션 ID
  const imageId = 265; // 테스트용 이미지 ID

  const testPatchCollection = async () => {
    try {
      const response = await axiosPrivate.patch(`/collections/${collectionId}/edit`, {
        isBirdIdUpdated: true,
        birdId: 161,
        discoveredDate: "2024-05-15",
        longitude: 126.484480056159,
        latitude: 33.5124867330564,
        locationAlias: "스타벅스 제주용담DT점",
        address: "제주특별자치도 제주시 서해안로 380",
        note: "진짜 새처럼 안 생겼네요",
        accessLevel: "PUBLIC",
      });
      console.log("✅ PATCH 성공", response);
    } catch (error) {
      console.error("❌ PATCH 실패", error);
    }
  };

  const testDeleteCollection = async () => {
    try {
      const response = await axiosPrivate.delete(`/collections/${collectionId}`);
      console.log("✅ DELETE 컬렉션 성공", response);
    } catch (error) {
      console.error("❌ DELETE 컬렉션 실패", error);
    }
  };

  const testDeleteImage = async () => {
    try {
      const response = await axiosPrivate.delete(`/collections/${collectionId}/images/${imageId}`);
      console.log("✅ DELETE 이미지 성공", response);
    } catch (error) {
      console.error("❌ DELETE 이미지 실패", error);
    }
  };

  return (
    <div className="p-10 flex flex-col gap-4 font-pretendard">
      <h1 className="text-xl font-bold mb-4">🧪 Saerok API 테스트</h1>

      <button onClick={testPatchCollection} className="px-4 py-2 bg-blue-600 text-white rounded">
        PATCH 컬렉션 수정 요청
      </button>

      <button onClick={testDeleteCollection} className="px-4 py-2 bg-red-600 text-white rounded">
        DELETE 컬렉션 삭제 요청
      </button>

      <button onClick={testDeleteImage} className="px-4 py-2 bg-yellow-400 text-black rounded">
        DELETE 이미지 삭제 요청
      </button>
    </div>
  );
};

export default Test;
