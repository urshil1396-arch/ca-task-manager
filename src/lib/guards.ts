import { UserProfile } from './types';

export function isOwner(u?: UserProfile | null) {
  return u?.role === 'owner';
}
export function isEmployee(u?: UserProfile | null) {
  return u?.role === 'employee';
}
