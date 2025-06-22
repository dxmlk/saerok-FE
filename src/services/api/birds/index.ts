import qs from "qs";
import axiosPublic from "../axiosPublic";
import axiosPrivate from "../axiosPrivate";

// 도감 api
export const fetchDexItemsApi = (params: any) => {
  return axiosPublic.get("/birds/", {
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  });
};

export const fetchDexDetailApi = (birdId: number) => {
  return axiosPublic.get(`/birds/${birdId}`);
};

export const autocompleteApi = (q: string) => {
  return axiosPublic.get("/birds/autocomplete", {
    params: { q },
  });
};

// 북마크 api
export const fetchBookmarksApi = () => {
  return axiosPrivate.get("/birds/bookmarks/");
};

export const fetchBookmarkStatusApi = (birdId: number) => {
  return axiosPrivate.get(`/birds/bookmarks/${birdId}/status`);
};

export const fetchBookmarkListApi = () => {
  return axiosPrivate.get("/birds/bookmarks/items");
};

export const toggleBookmarkApi = (birdId: number) => {
  return axiosPrivate.post(`/birds/bookmarks/${birdId}/toggle`);
};

export interface BirdInfo {
  birdId: number;
  koreanName: string;
  scientificName: string;
}

export const getBirdInfoByNameApi = async (koreanName: string): Promise<BirdInfo | null> => {
  try {
    const res = await axiosPublic.get("/birds/", {
      params: { q: koreanName, page: 1, size: 20 },
      paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
    });
    const birds: any[] = res.data.birds || [];
    if (birds.length === 0) return null;

    // 정확히 일치하는 것 우선, 없으면 첫 번째
    const match = birds.find((b) => b.koreanName === koreanName) ?? birds[0];
    return {
      birdId: match.id,
      koreanName: match.koreanName,
      scientificName: match.scientificName,
    };
  } catch (e) {
    console.error("조류 정보 조회 실패:", e);
    return null;
  }
};
