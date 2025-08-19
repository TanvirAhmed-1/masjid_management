
import { AddFridayCollectionModal } from "@/src/components/ui/friday-collection/AddFridayCollectionModal";
import FridayCollectionRow from "@/src/components/ui/friday-collection/FridayCollectionRow";
import SearchFridayCollection from "@/src/components/ui/friday-collection/SearchFridayCollection";


export const metadata = {
  title: "Friday-Collection | My Website",
};

const page = () => {
  return (
    <div>
      <div>
        <h3 className="text-lg text-start text-black">Friday-Collection</h3>
        <AddFridayCollectionModal />
      </div>
      <div>
        <SearchFridayCollection />

        {/* table section */}
        <FridayCollectionRow />
      </div>
    </div>
  );
};

export default page;
