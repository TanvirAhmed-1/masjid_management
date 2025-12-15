"use client";

import ManageCollectionContainer from "@/src/components/ui/collection/manageCollection/ManageCollectionContainer";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <div>
      <ManageCollectionContainer id={id} />
    </div>
  );
};

export default Page;
