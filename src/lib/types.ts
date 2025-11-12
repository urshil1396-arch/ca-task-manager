export type Role = 'owner' | 'employee';

export type Client = {
  id: string;
  displayName: string;
  isOneOff?: boolean; // default false
  services: {
    Accounting?: boolean;
    GST_Monthly?: boolean;
    GST_Quarterly?: boolean;
    Income_Tax?: boolean;
    TDS?: boolean;
    MCA?: boolean;
  };
  tags?: string[];
};

export type Task = {
  id: string;
  clientId?: string | null;
  clientFreeText?: string;
  title: string;
  dueDate?: any; // Firestore Timestamp
  status: 'todo' | 'done';
  paidStatus: 'paid' | 'unpaid' | 'na';
  priority: 'P1' | 'P2' | 'P3';
  risk?: boolean;
  assignedToUserId?: string | null;
  createdByUserId?: string;
  completedAt?: any | null;
  completedByUserId?: string | null;
  source: 'manual' | 'generated' | 'imported';
  fyLabel: string;
  softDeletedAt?: any | null;
  genKey?: string | null;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: Role;
  active?: boolean;
};

export type FYPeriod = {
  id: string;
  fyLabel: string;
  startDate: any;
  endDate: any;
  isCurrent: boolean;
};
