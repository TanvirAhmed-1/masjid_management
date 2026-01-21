export interface Doner {
  id: string;
  serialNumber: string;
  name: string;
  iftarDate: string;
  dayName: string;
  ifterListId: string;
}

export interface RamadhanYear {
  id: string;
  ramadanYear: string;
  titleName: string;
}

export interface IftarListResponse {
  id: string;
  ramadanyearId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  ramadanyear: RamadhanYear | null;
  doners: Doner[];
}