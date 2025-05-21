import CollectionDetailHeader from "features/saerok/components/saerok/SaerokDetailHeader";
import CollectionInfo from "features/saerok/components/saerok/SaerokInfo";
import ImgCarousel from "features/saerok/components/saerok/ImgCarousel";
import { collectionItems } from "features/saerok/mock/collectionItems";
import { useParams } from "react-router-dom";

const SaerokDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const item = collectionItems.find((item) => item.id === Number(id));

  if (!item) {
    return <div>존재하지 않는 컬렉션입니다.</div>;
  }

  return (
    <div className="min-h-[100vh] bg-white">
      <CollectionDetailHeader item={item} />
      <ImgCarousel imgUrls={item.img_urls} />
      <CollectionInfo date={item.date} location={item.location} comment={item.comment} />
    </div>
  );
};
export default SaerokDetailPage;
