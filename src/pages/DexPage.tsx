import DexHeader from "features/dex/components/DexHeader";
import DexList from "features/dex/components/DexList";
import { dexItems } from "features/dex/mock/dexItems";

const DexPage = () => {


    return (
      <>
        <DexHeader />
        <div className='p-[24px]'>
            <DexList dexItems={dexItems} />
        </div>
      </>
    );
  };
  
  export default DexPage;

  
