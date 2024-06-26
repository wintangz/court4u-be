import { memberSubscription } from '@prisma/client';

export interface IMemberSubscriptionService {
  buySubscription({
    subscriptionId,
    memberId,
  }: {
    subscriptionId: string;
    memberId: string;
  }): Promise<any>;

  paymentCallBack(args: any): Promise<any>;
  searchSubscription(id: string): Promise<memberSubscription | null>;
  updateMonthSubscription(id: string): Promise<memberSubscription>;
  updateTimeSubscription(id: string, time: number): Promise<memberSubscription>;
}
