import DexHeader from "features/dex/components/DexHeader";
import DexList from "features/dex/components/DexList";

const DexPage = () => {
    return (
      <>
        <DexHeader/>
        <div className='p-[24px]'>
            <DexList dexItems={dexItems} />
        </div>
      </>
    );
  };
  
  export default DexPage;

  
// MOCK 데이터
  const dexItems = [
    {
        id: 1,
        nameKor: "붉은배지느러미발도요",
        nameEng: "Phalaropus fulicarius",
        birdImg: "https://upload.wikimedia.org/wikipedia/commons/1/17/Phalaropus_fulicarius_98755138_%28cropped%29.jpg"
    },
    {
        id: 2,
        nameKor: "제비물떼새",
        nameEng: "Glareola maldivarum",
        birdImg: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001754/BIMGAV0000376248_20210615182418294022.jpeg"
    },
    {
        id: 3,
        nameKor: "갈매기",
        nameEng: "Larus canus",
        birdImg: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001758/BIMGAV0000376125_20210615152412083845.jpeg"
    },
    {
        id: 4,
        nameKor: "수리갈매기",
        nameEng: "Larus glaucescens",
        birdImg: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001759/BIMGAV0000376222_20210615172441037509.jpeg"
    },
    {
        id: 5,
        nameKor: "흰갈매기",
        nameEng: "Larus hyperboreus",
        birdImg: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001760/BIMGAV0000376302_20210617132422107753.jpeg"
    },
    {
        id: 6,
        nameKor: "작은흰갈매기",
        nameEng: "Larus glaucoides",
        birdImg: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Larus_glaucoides_IthacaNY.jpg"
    },
    {
        id: 7,
        nameKor: "옅은재갈매기",
        nameEng: "Larus smithsonianus",
        birdImg: "https://upload.wikimedia.org/wikipedia/commons/8/86/Herring_gull_%2816221%29.jpg"
    },
    {
        id: 8,
        nameKor: "줄무늬노랑발갈매기",
        nameEng: "Larus heuglinis",
        birdImg: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001766/BIMGAV0000376252_20210615182423194922.jpeg"
    },
    {
        id: 9,
        nameKor: "큰재갈매기",
        nameEng: "Larus schistisagus",
        birdImg: "https://upload.wikimedia.org/wikipedia/commons/7/71/Ivory_Gull_Portrait.jpg"
    },
    {
        id: 10,
        nameKor: "북극흰갈매기",
        nameEng: "Pagophila eburnea",
        birdImg: "https://upload.wikimedia.org/wikipedia/commons/7/71/Ivory_Gull_Portrait.jpg"
    },
    {
        id: 11,
        nameKor: "목테갈매기",
        nameEng: "Xema sabini",
        birdImg: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Xema_sabini_-Iceland_-swimming-8_%281%29.jpg"
    },
    {
        id: 12,
        nameKor: "세가락갈매기",
        nameEng: "Rissa tridactyla",
        birdImg: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001779/BIMGAV0000376203_2021061517243017122.jpeg"
    }
  ]
  

