export interface CollectionItemsType {
  collectionId: number;
  imageUrl: string;
  discoveredDate: string;
  latitude: number;
  longitude: number;
  locationAlias: string;
  note: string;
  bird: {
    birdId: number;
    koreanName: string;
  };
  user: {
    userId: number;
    nickname: string;
  };
}

export const collectionItems: CollectionItemsType[] = [
  {
    collectionId: 1,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29_2.jpg/640px-Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29_2.jpg",
    discoveredDate: "2025-05-20",
    latitude: 37.5665,
    longitude: 126.978,
    locationAlias: "서울 한강공원",
    note: "도심 속에서 우연히 발견한 참새 떼",
    bird: {
      birdId: 1,
      koreanName: "참새",
    },
    user: {
      userId: 301,
      nickname: "birdWatcherJ",
    },
  },
  {
    collectionId: 2,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29_2.jpg/640px-Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29_2.jpg",
    discoveredDate: "2025-05-21",
    latitude: 35.1796,
    longitude: 129.0756,
    locationAlias: "부산 해운대",
    note: "해변가에서 날아다니는 갈매기 무리",
    bird: {
      birdId: 2,
      koreanName: "갈매기",
    },
    user: {
      userId: 302,
      nickname: "seasideBirder",
    },
  },
  {
    collectionId: 3,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29_2.jpg/640px-Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29_2.jpg",
    discoveredDate: "2025-05-22",
    latitude: 37.4563,
    longitude: 126.7052,
    locationAlias: "경기도 남양주",
    note: "숲속에서 울음소리가 인상적인 딱따구리",
    bird: {
      birdId: 3,
      koreanName: "딱따구리",
    },
    user: {
      userId: 303,
      nickname: "forestSeeker",
    },
  },
  {
    collectionId: 4,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29_2.jpg/640px-Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29_2.jpg",
    discoveredDate: "2025-05-23",
    latitude: 36.3504,
    longitude: 127.3845,
    locationAlias: "대전 엑스포공원",
    note: "호수 근처에서 우아하게 헤엄치는 오리 떼",
    bird: {
      birdId: 4,
      koreanName: "청둥오리",
    },
    user: {
      userId: 304,
      nickname: "duckLover",
    },
  },
  {
    collectionId: 5,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29_2.jpg/640px-Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29_2.jpg",
    discoveredDate: "2025-05-24",
    latitude: 35.9078,
    longitude: 127.7669,
    locationAlias: "전라북도 무주",
    note: "산골짜기에서 조용히 발견한 솔새",
    bird: {
      birdId: 5,
      koreanName: "솔새",
    },
    user: {
      userId: 305,
      nickname: "mountainBird",
    },
  },
];
