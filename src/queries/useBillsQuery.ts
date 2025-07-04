import { useQuery } from '@tanstack/react-query';
import { getBills } from '../api/getBills';

export const useBillsQuery = (
  skip: number,
  limit: number,
  status?: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ['bills', skip, limit, status],
    queryFn: () => getBills(skip, limit, status),
    ...options,
  });
};
