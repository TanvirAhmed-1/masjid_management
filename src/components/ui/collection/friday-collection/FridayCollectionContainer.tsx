import { AddFridayCollectionModal } from "./AddFridayCollectionModal";
import FridayCollectionRow from "./FridayCollectionRow";
import SearchFridayCollection from "./SearchFridayCollection";

const FridayCollectionContainer = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg text-start text-black">
          {" "}
          All Friday-Collection
        </h3>
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

export default FridayCollectionContainer;
