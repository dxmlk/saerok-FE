import CollectionHeader from "features/collection/components/collection/CollectionHeader";
import CollectionList from "features/collection/components/collection/CollectionList";
import AddCollectionButton from "features/collection/components/add-collection/AddCollectionButton";

const CollectionPage = () => {
  return (
    <>
      <CollectionHeader />
      <div className="px-[24px]">
        <CollectionList />
        <AddCollectionButton />
      </div>
    </>
  );
};

export default CollectionPage;
