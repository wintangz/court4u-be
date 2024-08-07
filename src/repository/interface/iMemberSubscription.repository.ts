import { memberSubscription } from '@prisma/client';

export interface IMemberSubscriptionRepository {
  createMemberSubscription({
    memberId,
    subscriptionId,
    billId,
    startDate,
    endDate,
    timeRemain,
    usesHistory,
  }: {
    memberId: string;
    subscriptionId: string;
    billId: string;
    startDate: Date;
    endDate: Date;
    timeRemain?: number;
    usesHistory?: [];
  }): Promise<memberSubscription>;

  foundMemberSubscription({
    options,
  }: {
    options: any;
  }): Promise<memberSubscription | null>;
  updateMemberSubscription({
    options,
  }: {
    options: any;
  }): Promise<memberSubscription>;
  findBySubscriptionId(id: string): Promise<memberSubscription[]>;
  getAll(): Promise<memberSubscription[]>;
  getByClubId(clubId: string): Promise<memberSubscription[]>;
  getByUserId(userId: string): Promise<memberSubscription[]>;
  findExisted({
    clubId,
    userId,
  }: {
    clubId: string;
    userId: string;
  }): Promise<memberSubscription[] | null>;
  findSubscriptionByIdAndUserId(
    subscriptionId: string,
    userId: string
  ): Promise<memberSubscription | null>;
}
