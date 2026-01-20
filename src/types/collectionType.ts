export type Donor = {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
};

export type OtherCollectionName = {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type OtherCollectionType = {
  id: string;
  donors: Donor[];
  date: string | null;
  otherCollectionNameId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  otherCollectionName: OtherCollectionName;
};

//manage collection type

export type CollectionType = {
  id: string;
  donors: Donor[];
  date: string | null;
  otherCollectionNameId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  otherCollectionName: OtherCollectionName;
};
