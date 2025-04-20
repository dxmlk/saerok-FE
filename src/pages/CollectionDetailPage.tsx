

import CollectionDetailHeader from "features/collection/components/CollectionDetailHeader";
import CollectionInfo from "features/collection/components/CollectionInfo";
import ImgCarousel from "features/collection/components/ImgCarousel";
import { collectionItems } from "features/collection/mock/collectionItems";
import { useParams } from "react-router-dom";

const CollectionDetailPage = () => {
    const { id } = useParams<{ id: string}>();

    const item = collectionItems.find((item) => item.id === Number(id));

    if (!item) {
        return <div>존재하지 않는 컬렉션입니다.</div>
    }
    
    return (
        <div className='min-h-[100vh] bg-white'>
            <CollectionDetailHeader item={item}/>
            <ImgCarousel imgUrls={item.img_urls} />
            <CollectionInfo date={item.date} location={item.location} comment={item.comment}/>
        </div>
    )
}
export default CollectionDetailPage;