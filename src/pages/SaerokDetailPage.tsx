import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchCollectionDetail, CollectionDetail } from "services/api/collections";
import SaerokInfo from "features/saerok/components/saerok/SaerokInfo";
import SaerokDetailHeader from "features/saerok/components/saerok/SaerokDetailHeader";
import { SaerokInfoSkeleton } from "components/common/SkeletonItem";

const SaerokDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<CollectionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchCollectionDetail(Number(id));
        setItem(res);
      } catch (err) {
        console.error("상세 정보 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (!item) return <div className="p-24">존재하지 않는 컬렉션입니다.</div>;

  return (
    <div className="min-h-[100vh] mb-120 bg-white ">
      <SaerokDetailHeader birdId={item.bird.birdId} />

      {loading ? (
        <SaerokInfoSkeleton />
      ) : (
        <SaerokInfo
          img={item.imageUrl}
          date={item.discoveredDate}
          address={item.address}
          locationAlias={item.locationAlias}
          note={item.note}
          birdInfo={item.bird}
          user={item.user}
        />
      )}
    </div>
  );
};

export default SaerokDetailPage;
