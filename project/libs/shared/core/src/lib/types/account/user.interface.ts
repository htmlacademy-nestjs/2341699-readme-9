import { UserSubscriber } from './user-subscriber.interface';

export interface User {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar?: string | null;
  createdAt: Date;
  publicationsCount: number;
  subscribersCount: number;
  //subscribers?: UserSubscriber[];
  //subscriptions?: UserSubscriber[];
}
