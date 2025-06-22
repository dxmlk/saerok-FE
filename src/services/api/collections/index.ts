import axiosPrivate from "../axiosPrivate";

export interface CreateCollectionRequest {
  birdId: number | null;
  discoveredDate: string; // "YYYY-MM-DD"
  latitude: number;
  longitude: number;
  locationAlias: string;
  address: string;
  note: string;
  accessLevel?: "PUBLIC" | "PRIVATE"; // 생략 시 기본값 "PUBLIC"
}

export interface CreateCollectionResponse {
  collectionId: number;
}

export const createCollectionApi = async (data: CreateCollectionRequest) => {
  const response = await axiosPrivate.post<CreateCollectionResponse>("/collections/", data);
  return response.data;
};

export const getPresignedUrlApi = async (
  collectionId: number,
  contentType: string
): Promise<{ presignedUrl: string; objectKey: string }> => {
  const res = await axiosPrivate.post(`/collections/${collectionId}/images/presign`, {
    contentType,
  });
  return res.data;
};

export const registerImageMetaApi = async (
  collectionId: number,
  objectKey: string,
  contentType: string
): Promise<{ imageId: number; url: string }> => {
  const res = await axiosPrivate.post(`/collections/${collectionId}/images`, {
    objectKey,
    contentType,
  });
  return res.data;
};

export interface CollectionItem {
  collectionId: number;
  imageUrl: string;
  koreanName: string;
}

export const fetchMyCollections = async (): Promise<CollectionItem[]> => {
  const response = await axiosPrivate.get<{ items: CollectionItem[] }>("/collections/me");
  return response.data.items;
};

export interface CollectionDetail {
  collectionId: number;
  imageUrl: string | null;
  discoveredDate: string;
  latitude: number;
  longitude: number;
  locationAlias: string;
  address: string;
  note: string;
  accessLevel: string;
  bird: {
    birdId: number | null;
    koreanName: string | null;
    scientificName: string | null;
  };
  user: {
    userId: number;
    nickname: string;
  };
}

export const fetchCollectionDetail = async (collectionId: number): Promise<CollectionDetail> => {
  const response = await axiosPrivate.get<CollectionDetail>(`/collections/${collectionId}`);
  return response.data;
};

export interface NearbyCollectionItem {
  collectionId: number;
  imageUrl: string;
  koreanName: string;
  note: string;
  latitude: number;
  longitude: number;
  locationAlias: string;
  address: string;
}

export interface FetchNearbyCollectionsParams {
  latitude: number;
  longitude: number;
  radiusMeters: number;
  isMineOnly?: boolean;
}

export const fetchNearbyCollections = async ({
  latitude,
  longitude,
  radiusMeters,
  isMineOnly = false,
}: FetchNearbyCollectionsParams): Promise<NearbyCollectionItem[]> => {
  const response = await axiosPrivate.get<{ items: NearbyCollectionItem[] }>("/collections/nearby", {
    params: {
      latitude,
      longitude,
      radiusMeters,
      isMineOnly,
    },
  });
  return response.data.items;
};

/** 컬렉션 수정용 상세 정보 조회 (GET) */
export interface EditCollectionDetail {
  birdId: number | null;
  discoveredDate: string;
  longitude: number;
  latitude: number;
  locationAlias: string;
  address: string;
  note: string;
  accessLevel: "PUBLIC" | "PRIVATE";
  imageId: number | null;
  imageUrl: string | null;
}

/**
 * 컬렉션 수정용 상세 정보 조회
 * @param collectionId
 * @returns EditCollectionDetail
 */
export const fetchEditCollectionDetail = async (collectionId: number): Promise<EditCollectionDetail> => {
  const response = await axiosPrivate.get<EditCollectionDetail>(`/collections/${collectionId}/edit`);
  return response.data;
};

// 컬렉션 수정 요청 (PATCH)
export interface PatchCollectionRequest {
  isBirdIdUpdated?: boolean; // birdId를 수정하려면 반드시 포함
  birdId?: number | null;
  discoveredDate?: string;
  longitude?: number;
  latitude?: number;
  locationAlias?: string;
  address?: string;
  note?: string;
  accessLevel?: "PUBLIC" | "PRIVATE";
}

export interface PatchCollectionResponse {
  collectionId: number;
  birdId: number | null;
  discoveredDate: string;
  longitude: number;
  latitude: number;
  address: string;
  locationAlias: string;
  note: string;
  imageUrl: string | null;
  accessLevel: "PUBLIC" | "PRIVATE";
}

/**
 * 컬렉션 수정 (PATCH)
 * @param collectionId
 * @param data
 * @returns PatchCollectionResponse
 */
export const patchCollectionApi = async (
  collectionId: number,
  data: PatchCollectionRequest
): Promise<PatchCollectionResponse> => {
  const response = await axiosPrivate.patch<PatchCollectionResponse>(`/collections/${collectionId}/edit`, data);
  return response.data;
};

/**
 * 컬렉션 삭제 (DELETE)
 * @param collectionId
 * @returns void (204 No Content)
 */
export const deleteCollectionApi = async (collectionId: number): Promise<void> => {
  await axiosPrivate.delete(`/collections/${collectionId}`);
};

// 컬렉션 이미지 삭제 (DELETE)
export const deleteCollectionImageApi = async (collectionId: number, imageId: number): Promise<void> => {
  await axiosPrivate.delete(`/collections/${collectionId}/images/${imageId}`);
};
