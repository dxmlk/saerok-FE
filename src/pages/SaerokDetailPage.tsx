import CollectionDetailHeader from "features/saerok/components/saerok/SaerokDetailHeader";
import SaerokInfo from "features/saerok/components/saerok/SaerokInfo";
import ImgCarousel from "features/saerok/components/saerok/ImgCarousel";
import { collectionItems } from "features/saerok/mock/collectionItems";
import { useParams } from "react-router-dom";

const SaerokDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const item = collectionItems.find((item) => item.collectionId === Number(id));

  if (!item) {
    return <div>존재하지 않는 컬렉션입니다.</div>;
  }

  return (
    <div className="min-h-[100vh] bg-white">
      {/* <CollectionDetailHeader item={item} /> */}
      {/* <ImgCarousel imgUrls={item.img_urls} /> */}
      <img src={item.imageUrl} alt="birdImage" className="w-full h-auto object-cover" />
      <SaerokInfo
        date={item.discoveredDate}
        lat={item.latitude}
        long={item.longitude}
        locationAlias={item.locationAlias}
        note={item.note}
        birdInfo={item.bird}
      />
    </div>
  );
};
export default SaerokDetailPage;
