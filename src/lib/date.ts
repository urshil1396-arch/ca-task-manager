import { DateTime } from 'luxon';

export const IST = 'Asia/Kolkata';

export function isoDateLocal(d: Date | string | number) {
  const dt = DateTime.fromJSDate(new Date(d), { zone: IST });
  return dt.toFormat('yyyy-LL-dd');
}
export function dCounter(due: Date) {
  const today = DateTime.now().setZone(IST).startOf('day');
  const dd = DateTime.fromJSDate(due).setZone(IST).startOf('day');
  const diff = dd.diff(today, 'days').days;
  if (diff < 0) return `Overdue ${Math.abs(Math.floor(diff))}d`;
  if (diff === 0) return 'Due today';
  return `D-${Math.floor(diff)}`;
}
