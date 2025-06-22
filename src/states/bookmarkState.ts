// states/bookmarkState.ts
import { atom, useSetRecoilState } from "recoil";
import { fetchBookmarksApi, toggleBookmarkApi } from "services/api/birds";

export const bookmarkedBirdIdsState = atom<number[]>({
  key: "bookmarkedBirdIdsState",
  default: [],
});

// 북마크 목록 동기화 (서버 fetch → birdId만 배열로 저장)
export function useSyncBookmarks() {
  const set = useSetRecoilState(bookmarkedBirdIdsState);
  return async () => {
    const res = await fetchBookmarksApi();
    const ids = (res.data.items || []).map((item: any) => item.birdId);
    set(ids);
  };
}

// 북마크 토글 후 항상 전체 목록 다시 fetch
export function useToggleBookmarkAndSync() {
  const sync = useSyncBookmarks();
  return async (birdId: number) => {
    await toggleBookmarkApi(birdId);
    await sync(); // 무조건 서버에서 재동기화
  };
}
