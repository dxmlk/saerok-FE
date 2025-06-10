export interface MapItemsType {
  collectionId: number;
  imageUrl: string;
  birdName: string;
  latitude: number;
  longitude: number;
  note: string;
}

export const mapItems: MapItemsType[] = [
  {
    collectionId: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Phalaropus_fulicarius_98755138_%28cropped%29.jpg",
    birdName: "까치",
    latitude: 37.58939182281775,
    longitude: 127.02990237554194,
    note: "드디어 까치! 서울 한복판에서 보다니 두 줄이 넘어가면 잘 처리되나 테스트하기 위해 글자를 늘리는 중 이 정도면 넘어갔겠지",
  },
  {
    collectionId: 2,
    imageUrl:
      "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001754/BIMGAV0000376248_20210615182418294022.jpeg",
    birdName: "참새",
    latitude: 37.5796,
    longitude: 126.977,
    note: "경복궁 근처 나무에 앉아 있었음",
  },
  {
    collectionId: 3,
    imageUrl:
      "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001758/BIMGAV0000376125_20210615152412083845.jpeg",
    birdName: "비둘기",
    latitude: 37.551,
    longitude: 126.9882,
    note: "남산타워 근처에 아주 많음",
  },
  {
    collectionId: 4,
    imageUrl:
      "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001759/BIMGAV0000376222_20210615172441037509.jpeg",
    birdName: "직박구리",
    latitude: 37.5199,
    longitude: 126.9404,
    note: "한강공원에서 시끄럽게 울던 새",
  },
  {
    collectionId: 5,
    imageUrl:
      "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001760/BIMGAV0000376302_20210617132422107753.jpeg",
    birdName: "물총새",
    latitude: 37.571,
    longitude: 126.9768,
    note: "청계천 근처 물가에서 반짝이는 깃털 발견!",
  },
  {
    collectionId: 6,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Larus_glaucoides_IthacaNY.jpg",
    birdName: "제비",
    latitude: 37.5025,
    longitude: 127.0246,
    note: "강남역 근처 하늘을 휘젓고 다님",
  },
  {
    collectionId: 7,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/86/Herring_gull_%2816221%29.jpg",
    birdName: "딱따구리",
    latitude: 37.6433,
    longitude: 127.0139,
    note: "북한산 자락에서 나무 두드리는 소리 들림",
  },
  {
    collectionId: 8,
    imageUrl:
      "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001766/BIMGAV0000376252_20210615182423194922.jpeg",
    birdName: "꿩",
    latitude: 37.4815,
    longitude: 126.9523,
    note: "관악산 등산 중에 갑자기 튀어나옴!",
  },
  {
    collectionId: 9,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/71/Ivory_Gull_Portrait.jpg",
    birdName: "흰눈썹황금새",
    latitude: 37.5744,
    longitude: 127.009,
    note: "서울숲에서 우연히 마주침. 작고 귀여움",
  },
  {
    collectionId: 10,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/71/Ivory_Gull_Portrait.jpg",
    birdName: "흰죽지",
    latitude: 37.52,
    longitude: 126.98,
    note: "여의도 샛강생태공원에서 관찰함. 희귀종!",
  },
];
