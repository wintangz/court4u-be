import { subscriptionDetail, subscriptionOption } from '@prisma/client';

export interface ISubscriptionService {
  createSubscription(type: string, payload: any): Promise<any>;
  updateSubscription({
    type,
    subscriptionId,
    payload,
  }: {
    type: string;
    subscriptionId: string;
    payload: string;
  }): Promise<any>;
  searchSubscriptionByClubId({
    keySearch,
  }: {
    keySearch: string;
  }): Promise<subscriptionOption[] | null>;

  findSubscriptionById({
    keySearch,
  }: {
    keySearch: string;
  }): Promise<subscriptionOption | null>;

  findDetailById({
    keySearch,
  }: {
    keySearch: string;
  }): Promise<subscriptionDetail | null>;
}
