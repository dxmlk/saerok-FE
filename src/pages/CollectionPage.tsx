import CollectionHeader from "features/collection/components/collection/CollectionHeader";
import CollectionList from "features/collection/components/collection/CollectionList";

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