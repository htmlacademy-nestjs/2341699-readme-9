export interface User {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  createAt: Date;
  publicationsCount: number;
  subscribersCount: number;
  subscribers?: string[];
  subscriptions?: string[];
}
