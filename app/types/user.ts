export interface UserCommunication {
  nmbr: string;
  type: 'email' | 'mobile' | 'phone';
}

export interface UserFeatures {
  self: boolean;
  hold: boolean;
  sort?: number;
  role?: string;
}

export interface UserOnboarding {
  obnm: boolean;
  obcr: boolean;
  oblc: boolean;
  obcm: boolean;
  obtr: boolean;
}

export interface UserMetadata {
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserAccount {
  item: string;
  meta: UserMetadata;
  avtr?: string;
  name: string
  coms: UserCommunication[];
  user: UserCommunication[];
  feat: UserFeatures;
  onbd: UserOnboarding;
  actv: boolean;
  role: 'user' | 'team';
  roletype?: string;
}

export interface TeamMembership {
  team: string;
  user: string;
  meta: UserMetadata;
  feat: UserFeatures;
}

export interface UserAccountListResponse {
  data: {
    list: UserAccount[];
  };
  memo: string;
  stat: boolean;
  trxn: string;
  srvc: string;
}

export interface UserAccountCreateResponse {
  data: UserAccount;
  memo: string;
  stat: boolean;
  trxn: string;
  srvc: string;
} 