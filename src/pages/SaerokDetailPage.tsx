import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchCollectionDetail, CollectionDetail } from "services/api/collections";
import SaerokInfo from "features/saerok/components/saerok/SaerokInfo";

const SaerokDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<CollectionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCollectionDetail(Number(id))
        .then((data) => setItem(data))
        .catch(() => setItem(null))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="p-24">불러오는 중...</div>;
  if (!item) return <div className="p-24">존재하지 않는 컬렉션입니다.</div>;

  return (
    <div className="min-h-[100vh] bg-white">
      {/* <CollectionDetailHeader item={item} /> */}
      <img
        src={item.imageUrl ?? "/src/assets/icons/image/image-placeholder.svg"}
        alt="birdImage"
        className="w-full h-auto object-cover"
      />
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
