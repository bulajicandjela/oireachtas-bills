export type Bill = {
  id: string;
  billNo: string;
  billYear: string;
  billType: string;
  billStatus: string;
  sponsor: string;
  titleEn: string;
  titleGa: string;
  favourited?: boolean;
};

export type BillsResponse = {
  bills: Bill[];
  total: number;
};
