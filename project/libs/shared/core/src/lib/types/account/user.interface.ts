export interface User {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  createdAt: Date;
  publicationsCount: number;
  subscribersCount: number;
  subscribers?: string[];
  subscriptions?: string[];
}
