"use client";

import ManageCollectionContainer from "@/src/components/ui/collection/manageCollection/ManageCollectionContainer";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params.id as string;


  return (
    <div>
        <ManageCollectionContainer id={id} />
      <h1>Others Collection Detail Page - ID: {id}</h1>
    </div>
  );
};

export default Page;
