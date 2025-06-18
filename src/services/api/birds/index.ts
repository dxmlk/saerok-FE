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

export const toggleBookmarkApi = (birdId: number) => {
  return axiosPrivate.post(`/birds/bookmarks/${birdId}/toggle`);
};

export const getBirdIdByNameApi = async (koreanName: string): Promise<number | null> => {
  try {
    const res = await axiosPublic.get("/birds/", {
      params: {
        page: 1,
        size: 20, // 충분한 범위에서 찾을 수 있도록
        q: koreanName,
        sort: "id",
        sortDir: "asc",
      },
    });

    const birds = res.data?.birds ?? [];

    // 정확히 이름이 일치하는 새를 찾음
    const exact = birds.find((b: any) => b.koreanName === koreanName);
    return exact?.id ?? null;
  } catch (e) {
    console.error("조류 ID 검색 실패", e);
    return null;
  }
};
