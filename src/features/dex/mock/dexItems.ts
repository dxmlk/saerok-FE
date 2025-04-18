export interface DexItemsType {
    id:number;
    korean_name: string;
    scientific_name: string;
    order_kor: string;
    family_kor: string;
    genus_kor: string;
    description: string;
    body_length_cm: number;
    habitats: string;
    image_urls: string;
}

export const dexItems: DexItemsType[] =  [
    {
        id: 1,
        korean_name: "붉은배지느러미발도요",
        scientific_name: "Phalaropus fulicarius",
        order_kor: "도요목",
        family_kor: "도요과",
        genus_kor: "지느러미발도요속",
        description: "유럽에서는 주로 엷은 회색인 겨울깃에, 아랫부분은 흰색이고, 부리는 어두운 색이며, 눈 주위에 검은색의 두꺼운 줄무늬가 있는 것을 볼 수 있다. 등에 줄무늬가 없는 것과 부리가 짧고 두꺼운 것으로 붉은목깝작도요(red-necked phalaropes)와 구분할 수 있다. 여름에 성체는 목 주위를 제외하고는 몸 아랫면이 붉은색이고, 머리는 검은색과 흰색의 줄무늬가 있으며, 부리는 주로 노란색이다. 겨울에는 바다에서 월동한다. 날씨가 좋지 않을 때에는 해안가에서 발견된다. 아이슬란드 서부와 시베리아에서 번식하고 아프리카와 남아메리카에서 월동한다. 유럽은 통과지이다.",
        body_length_cm: 21.5,
        habitats: "해양",
        image_urls: "https://upload.wikimedia.org/wikipedia/commons/1/17/Phalaropus_fulicarius_98755138_%28cropped%29.jpg"
    },
    {
        id: 2,
        korean_name: "제비물떼새",
        scientific_name: "Glareola maldivarum",
        order_kor: "도요목",
        family_kor: "제비물떼새과",
        genus_kor: "제비물떼새속",
        description: "도요목 제비물떼새과의 조류로 국내에는 봄과 가을에 매우 적은 수가 통과하는 나그네새이다. 몸길이 26.5cm. 날개는 폭이 좁으며 길어 접었을 때 꼬리 뒤로 돌출된다. 몸 윗면은 어두운 회갈색이며 날개는 검은색이다. 날 때 허리가 백색으로 보인다. 부리는 검은색이며 기부는 붉은색이다. 가슴과 배는 크림색 아랫배는 흰색이다. 멱은 흐린 황백색이며 가장자리에 검은색 선이 있다. 날 때 아랫날개덮깃이 적갈색이다. 작은 무리를 이루어 행동하며 날면서 파리나, 벌목의 곤충들을 잡아먹는다. 경쾌하고 빠르게 날아가는 모습이 제비와 유사하다. 둥지는 만들지 않고 땅 위에 그대로 산란한다. 산란기는 3~6월이며, 산란 개수는 2~3개이다. 시베리아 동북부, 몽골 북동부, 중국 동북부, 인도차이나반도, 인도, 필리핀, 대만에서 번식하고, 겨울에는 동남아시아에서 호주까지 월동한다. 국내에는 해안가의 풀밭, 하천, 농경지에서 관찰된다.",
        body_length_cm:26.5 ,
        habitats: "경작지/들판, 하천/호수, 해양",
        image_urls: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001754/BIMGAV0000376248_20210615182418294022.jpeg"
    },
    {
        id: 4,
        korean_name: "갈매기기",
        scientific_name: "Larus canus",
        order_kor: "도요목",
        family_kor: "갈매기과",
        genus_kor: "갈매기속",
        description: "도요목 갈매기과에 속하는 조류이다. 날개 길이는 34-38cm이다. 여름깃은 머리가 흰색이고, 목과 배 및 꼬리는 흰색이다. 등은 연한 흰색, 꼬리는 흰색이고, 부리는 초록색을 띤 회색 또는 연두색이며 끝부분이 노란색이다. 겨울깃은 머리가 흰색에 어두운색의 세로무늬가 있다. 바닷가의 간사지, 암초, 바다 위 또는 강어귀, 어장에 살며 흔한 겨울새이다. 둥지는 해안의 작은 언덕이나 풀밭, 작은 섬 등에 떼를 지어 짓는다. 동해안, 남해안, 낙동강 하구, 한강 등지에 월동하고 세계적으로는 구북구 및 신북구 동부, 주로 북위 48-68도 사이에 분포한다.",
        body_length_cm: 43,
        habitats: "갯벌, 기타, 하천/호수, 해양",
        image_urls: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001758/BIMGAV0000376125_20210615152412083845.jpeg"
    },
    {
        id: 5,
        korean_name: "수리갈매기",
        scientific_name: "Larus glaucescens",
        order_kor: "도요목",
        family_kor: "갈매기과",
        genus_kor: "갈매기속",
        description: "도요목 갈매기과의 새이다. 몸길이는 60~68cm이며, 날개 편 길이는 약 137mm이다. 수컷이 암컷보다 크다. 성체는 엷은 회흑색과 함께 흰색이다. 날개는 엷은 회색이며 작은 한 부분은 흰색이다. 부리는 크고 무거우며, 빨간 점이 있는 노란색이다. 눈 주위는 자줏빛이 도는 분홍색이다. 알은 담황색이다. 주로 해안의 염수 지역 및 만(灣), 강어귀, 섬, 바닷가, 개펄에서 서식한다. 알래스카에서는 큰 둥지를 틀며, 남쪽의 다른 지역에서는 그보다 작은 둥지를 튼다. 5월 말~7월에 2~3개의 알을 낳는다. 부화 기간은 26~28일이다. 부화 후 35~54일 지나면 날 수 있을 만큼 자란다. 완전한 성체가 되기까지는 4년이 걸린다. 수명은 20년이다. 북태평양 지역(알래스카~워싱턴 주)에 분포한다.",
        body_length_cm: 64,
        habitats: "갯벌, 기타, 해양",
        image_urls: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001759/BIMGAV0000376222_20210615172441037509.jpeg"
    },
    {
        id: 6,
        korean_name: "흰갈매기",
        scientific_name: "Larus hyperboreus",
        order_kor: "도요목",
        family_kor: "갈매기과",
        genus_kor: "갈매기속",
        description: "도요목 갈매기과에 속하는 조류이다. 전체 길이는 70cm 정도로 등은 엷은 회색이며, 흰색의 첫째날개깃을 가진 대형갈매기이다. 부리는 황색이고 붉은 점이 있으며, 다리는 분홍색이다. 알은 밝은 갈색에 진한 갈색 무늬가 있다. 호수나 강가, 해안 등지에 살며 절벽에 이끼나 풀로 엮어 둥지를 만들며 알을 3개 정도 낳는다. 낙동강 하구에 서식하고 세계적으로는 알래스카, 캐나다 극지방·아극지방, 미국 북부지방에 분포한다.",
        body_length_cm: 70,
        habitats: "하천/호수, 해양",
        image_urls: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001760/BIMGAV0000376302_20210617132422107753.jpeg"
    },
    {
        id: 7,
        korean_name: "작은흰갈매기",
        scientific_name: "Larus glaucoides",
        order_kor: "도요목",
        family_kor: "갈매기과",
        genus_kor: "갈매기속",
        description: "도요목 갈매기과의 새이다. 몸의 크기는 흰갈매기보다 뚜렷하게 작다. 부리는 짧고 부리 위와 아래의 꺾어진 각도도 작다. 부리 끝의 검은색은 기부로 갈수록 서서히 엷어지며 살구색으로 바뀐다. 흰갈매기는 부리 끝의 검은색 부분이 좁으며 기부의 살구색과 경계가 뚜렷하므로 구별된다. 머리 윗부분은 둥근 형태로 흰갈매기의 평평한 형태와 차이가 있다. 홍채의 색도 암갈색을 띠고 있다. 날개를 접고 있을 때 첫째날개깃의 끝은 꽁지 끝보다 뒤로 나온 것이 뚜렷하다. 흰갈매기는 꽁지 끝보다 약간 더 긴 편이다. 다리도 흰갈매기보다 짧아서 앉아 있을 때 키의 차이가 뚜렷하게 나타난다. 유럽 북서부, 북미 북동부에 분포한다.",
        body_length_cm: 57,
        habitats: "기타, 해양",
        image_urls: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Larus_glaucoides_IthacaNY.jpg"
    },
    {
        id: 8,
        korean_name: "옅은재갈매기",
        scientific_name: "Larus smithsonianus",
        order_kor: "도요목",
        family_kor: "갈매기과",
        genus_kor: "갈매기속",
        description: "옅은재갈매기는 북아메리카에서 번식하는 대형 갈매기입니다. 성체는 흰색 몸에 회색 등과 날개를 가지며, 검은 날개 끝과 하얀 반점이 특징입니다. 어린 새는 회갈색으로 유럽재갈매기보다 진한 색을 띱니다. 다양한 서식지에서 발견되며, 해안, 호수, 강, 주차장, 쓰레기 처리장 등에서 생활합니다.  먹이는 무척추동물, 물고기, 심지어 다른 새의 알까지 포함한 폭넓은 종류를 섭취합니다. 주로 물 근처에 집단으로 둥지를 짓고 세 개의 알을 땅 위에 낳습니다.  성체는 몸길이 53~66cm 정도이며, 날개 길이는 120~155cm입니다. 다리는 주로 분홍색이나 때때로 청색이나 노란빛을 띠기도 합니다. 부리는 노란색이고 아래턱에 빨간 점이 있습니다.  옅은재갈매기의 번식지는 북미 대부분에 걸쳐 있으며, 겨울에는 멕시코나 중미, 카리브해까지 남하하기도 합니다. 다양한 울음소리를 가지고 있으며, 위험을 알리거나 짝을 부르기 위한 소리를 냅니다.  19세기에는 사냥으로 인해 개체수가 감소했으나, 이후 보호 조치와 먹이 자원의 증가로 인해 개체수가 빠르게 회복되었습니다. DDT 사용의 영향으로 난각이 얇아지는 문제를 겪기도 했습니다. 지금은 일부 지역에서 개체수가 감소하기도 합니다.",
        body_length_cm: 59.5,
        habitats: "인공시설, 하천/호수, 해양",
        image_urls: "https://upload.wikimedia.org/wikipedia/commons/8/86/Herring_gull_%2816221%29.jpg"
    },
    {
        id: 9,
        korean_name: "줄무늬노랑발갈매기",
        scientific_name: "Larus heuglinis",
        order_kor: "도요목",
        family_kor: "갈매기과",
        genus_kor: "갈매기속",
        description: "도요목 갈매기과의 새이다. 등판이 재갈매기나 한국재갈매기에 비해 진한 특징이 있다. 등 무늬는 괭이갈매기보다도 더 진하다. 발이 노란 특징을 보이는데, 번식기에 가까워지면서 발이 아주 노란 개체가 더 많이 보인다. 덩치의 경우, 재갈매기에 비해 아주 작은 개체가 있다. 특히 작은 것도 있는데, 대부분 눈이 작고 머리형이 날렵하다. 아래 부리의 붉은 점도 재갈매기에 비해 큰 것이 특징이다. 한국재갈매기와는 달리 민물은 선호하지 않고 대부분 바닷물에서 특히 갯벌에서 많이 보인다. 상당히 늦게 번식깃으로 갈아입는다. 한국재갈매기보다 한 달 이상 늦게 번식한다. 시베리아 최북단에서 번식하고 우리나라 제주도 차귀도~서해안, 동해안 묵호 등지에서 월동한다.",
        body_length_cm: 61.5,
        habitats: "갯벌, 해양",
        image_urls: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001766/BIMGAV0000376252_20210615182423194922.jpeg"
    },
    {
        id: 10,
        korean_name: "큰재갈매기",
        scientific_name: "Larus schistisagus",
        order_kor: "도요목",
        family_kor: "갈매기과",
        genus_kor: "갈매기속",
        description: "도요목 갈매기과의 새로 몸길이 61~66cm가량이다. 재갈매기와 거의 비슷하나 윗등이 흰색이 아니고 어두운 석판색인 점에서 쉽게 구별된다. 날개깃은 검은색이고 바깥쪽 첫째날개깃의 끝부분에는 흰색의 무늬가 있으며 날개에는 회갈색의 띠가 있다. 어린 새는 몸의 윗면이 연한 갈색이고 거무스름한 세로무늬가 있으며 몸의 아랫면은 회색, 턱 밑은 흰색이다. 꽁지는 갈색이고 끝부분은 흰색이며 기부에는 어두운 갈색의 대리석 모양의 무늬가 있다. 흔하지 않은 겨울새이다. 떼 지어 먹이를 찾는다. 둥지는 섬이나 바닷가 부근의 벼랑 위, 해안의 암초 위, 호반의 땅 위, 방파제, 평탄한 땅 위, 모래밭, 풀밭 등에 집단적으로 짓고 산란한다. 알은 5월하순~7월에 3~4개를 낳는다. 개, 고양이, 새 등의 시체, 물오리나 바닷새의 알, 죽은 물고기 등을 먹으며 갑각류, 연체동물, 환형동물, 곤충류 등도 먹는다. 북태평양 서부, 오호츠크 해안, 캄차카, 사할린 등지에 분포한다. 우리나라, 중국, 일본 등지에서 월동한다.",
        body_length_cm:63.5 ,
        habitats: "갯벌, 습지, 하천/호수, 해양",
        image_urls: "https://upload.wikimedia.org/wikipedia/commons/7/71/Ivory_Gull_Portrait.jpg"
    },
    {
        id: 11,
        korean_name: "북극흰갈매기",
        scientific_name: "Pagophila eburnea",
        order_kor: "도요목",
        family_kor: "갈매기과",
        genus_kor: "갈매기속",
        description: "몸 크기는 다른 괭이갈매기에 비해 작은 편이다. 몸은 전체적으로 흰색이며, 부리 끝은 노란색, 부리 기부는 검은색을 띠며, 눈 앞 부분은 검은색이다. 등과 날개 윗면에는 검은색 반점이 산재해 있다. 첫째날개깃에도 검은색 반점이 있다. 유라시아 대륙, 북미 북극권에 분포한다.",
        body_length_cm: 41.5,
        habitats: "기타",
        image_urls: "https://upload.wikimedia.org/wikipedia/commons/7/71/Ivory_Gull_Portrait.jpg"
    },
    {
        id: 12,
        korean_name: "목테갈매기",
        scientific_name: "Xema sabini",
        order_kor: "도요목",
        family_kor: "갈매기과",
        genus_kor: "북극흰갈매기속",
        description: "우리나라에서는 미조이다. 몸길이는 33~36cm이다. 여름깃은 머리가 잿빛이며 아랫목 흰색 부위와의 경계에 검은색 목테가 있다. 겨울깃의 이마는 흰색이고 머리의 나머지 부분은 거무스름하다. 윗목에 가로띠가 있다. 첫째날개깃은 검은색이고 둘째날개깃에 흰색의 넓은 삼각형 띠가 있다. 날개 앞가장자리는 검은색이다. 부리는 검은색, 부리 끝은 노란색, 다리는 잿빛이다. 꽁지는 제비꽁지 모양이다. 5월하순~7월상순에 한배에 알 2~3개를 낳는다. 먹이는 주로 곤충을 잡아먹고 연체동물과 물고기도 먹는다. 번식기에는 습한 툰드라에 서식하며, 비번식기에는 대개 트인 바다에서 생활한다. 겨울에는 열대에서 생활한다.",
        body_length_cm:34.5 ,
        habitats: "습지, 해양",
        image_urls: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Xema_sabini_-Iceland_-swimming-8_%281%29.jpg"
    },
    {
        id: 13,
        korean_name: "세가락갈매기",
        scientific_name: "Rissa tridactyla",
        order_kor: "도요목",
        family_kor: "갈매기과",
        genus_kor: "목테갈매기속",
        description: "흔하지 않은 겨울새이나 강원도 동해안에 큰 무리가 해마다 찾아와 월동한다. 몸길이는 41cm이다. 날개 끝과 다리는 검은 갈색이다. 뒷발가락이 흔적만 남아 있는 점이 큰 특징이다. 부리는 노란색이고 등은 회색, 아랫면은 흰색이다. 섬 해안 또는 암초의 절벽이나 벼랑에 집단으로 둥지를 튼다. 산란기는 5~6월로 한배에 알을 1~3개 낳는다. 알래스카, 캄차카, 사할린, 쿠릴 열도, 알류샨 열도 등지에서 번식하고 한국, 일본에서 월동한다.",
        body_length_cm: 41,
        habitats: "기타, 해양",
        image_urls: "https://species.nibr.go.kr/UPLOAD/digital/species/12000000/120000001779/BIMGAV0000376203_2021061517243017122.jpeg"
    }
  ]
  

