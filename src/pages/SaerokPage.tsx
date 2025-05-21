import CollectionHeader from "features/saerok/components/saerok/SaerokHeader";
import CollectionList from "features/saerok/components/saerok/SaerokList";
import AddCollectionButton from "features/saerok/components/add-saerok/AddSaerokButton";

const SaerokPage = () => {
  return (
    <>
      <CollectionHeader />
      <div className="px-24">
        <CollectionList />
        <AddCollectionButton />
      </div>
    </>
  );
};

export default SaerokPage;
