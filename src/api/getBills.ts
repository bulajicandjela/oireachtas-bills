import axios from 'axios';
import type { BillsResponse } from '../types/bill';

export const getBills = async (
  skip: number,
  limit: number,
  billStatus?: string
): Promise<BillsResponse> => {
  const statusParam = billStatus ? `&bill_status=${encodeURIComponent(billStatus)}` : '';
  const url = `https://api.oireachtas.ie/v1/legislation?limit=${limit}&skip=${skip}${statusParam}`;

  const response = await axios.get(url);
  const total = response.data.head?.counts?.billCount ?? 0;

  const bills = response.data.results.map((item: any) => {
    const bill = item.bill;

    return {
      id: bill.billNo + bill.billYear,
      billNo: bill.billNo,
      billYear: bill.billYear,
      billType: bill.billType,
      billStatus: bill.status,
      sponsor: bill.sponsors[0]?.sponsor.as.showAs || 'Unknown',
      shortTitleEn: bill.shortTitleEn,
      shortTitleGa: bill.shortTitleGa,
      titleEn: bill.shortTitleEn || '',
      titleGa: bill.shortTitleGa || '',
    };
  });

  return { bills, total };
};
