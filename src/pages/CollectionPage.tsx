import CollectionHeader from "features/collection/components/CollectionHeader";
import CollectionList from "features/collection/components/CollectionList";

const CollectionPage = () => {
    return (
        <>
            <CollectionHeader/>
            <div className='px-[24px]'>
                <CollectionList />
            </div>
        </>
    )
}

export default CollectionPage;