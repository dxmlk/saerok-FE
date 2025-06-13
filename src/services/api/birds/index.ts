import qs from "qs";
import axiosPublic from "../axiosPublic";
import axiosPrivate from "../axiosPrivate";

export const fetchDexItemsApi = (params: any) => {
  return axiosPublic.get("/birds/", {
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  });
};

export const fetchBookmarksApi = () => {
  return axiosPrivate.get("/birds/bookmarks/");
};

export const toggleBookmarkApi = (birdId: number) => {
  return axiosPrivate.post(`/birds/bookmarks/${birdId}/toggle`);
};
