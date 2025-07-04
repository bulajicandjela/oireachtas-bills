// NOTE: These values are hardcoded for now, but in a real production environment,
// this list should ideally be fetched from the backend to ensure consistency with the source of truth.
//Using enum would also be a good option, but for simplicity, we are using a record here.
export const BillStatuses: Record<string, string> = {
  Current: 'Current',
  Enacted: 'Enacted',
  Rejected: 'Rejected',
  Defeated: 'Defeated',
  Lapsed: 'Lapsed',
  Withdrawn: 'Withdrawn',
};
