import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchCollectionDetail, CollectionDetail } from "services/api/collections/index";
import SaerokInfo from "features/saerok/components/saerok/SaerokInfo";
import SaerokDetailHeader from "features/saerok/components/saerok/SaerokDetailHeader";
import { SaerokInfoSkeleton } from "components/common/SkeletonItem";
import { useAuth } from "hooks/useAuth";
import LoadingScreen from "components/common/LoadingScreen";

const SaerokDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<CollectionDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchCollectionDetail(Number(id));
        setItem(res);
      } catch (err) {
        // console.error("상세 정보 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const isMine = item?.user.nickname === user?.nickname;

  if (!item) return <LoadingScreen />;

  return (
    <div className="min-h-[100vh]">
      <SaerokDetailHeader birdId={item.bird.birdId} collectionId={item.collectionId} isMine={isMine} />

      {loading ? (
        <SaerokInfoSkeleton />
      ) : (
        <SaerokInfo
          collectionId={item.collectionId}
          img={item.imageUrl}
          date={item.discoveredDate}
          address={item.address}
          locationAlias={item.locationAlias}
          note={item.note}
          birdInfo={item.bird}
          user={item.user}
          isMine={isMine}
        />
      )}
    </div>
  );
};

export default SaerokDetailPage;
