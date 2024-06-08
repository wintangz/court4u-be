import {
  subOptionMonth,
  subOptionTime,
  subscriptionOption,
  SubscriptionOptionStatus,
  SubscriptionType,
} from '@prisma/client';
import { ISubscriptionRepository } from './iSubscription.repository';
import prisma from '../lib/prisma';

export class SubscriptionRepository implements ISubscriptionRepository {
  private static Instance: SubscriptionRepository;
  public static getInstance(): SubscriptionRepository {
    if (!this.Instance) {
      this.Instance = new SubscriptionRepository();
    }
    return this.Instance;
  }
  public async searchSubscriptions({
    options,
  }: {
    options: any;
  }): Promise<subscriptionOption[] | null> {
    return await prisma.subscriptionOption.findMany(options);
  }

  public async findSubscriptionOptionMonth({
    options,
  }: {
    options: any;
  }): Promise<subOptionMonth | null> {
    return await prisma.subOptionMonth.findFirst(options);
  }
  public async createSubscription({
    id,
    clubId,
    name,
    price,
    startDate,
    endDate,
    status,
    type,
    detail,
  }: {
    id: string;
    clubId: string;
    name: string;
    price: number;
    startDate: Date;
    endDate: Date;
    status: SubscriptionOptionStatus;
    type: SubscriptionType;
    detail: Record<string, any>;
  }): Promise<subscriptionOption> {
    return await prisma.subscriptionOption.create({
      data: {
        id: id,
        clubId,
        name,
        price,
        endDate,
        startDate,
        status,
        type,
        detail,
      },
    });
  }

  public async createSubscriptionMonth({
    clubId,
    usesPerDay,
    playTime,
  }: {
    clubId: string;
    usesPerDay: number;
    playTime: number;
  }): Promise<subOptionMonth> {
    return await prisma.subOptionMonth.create({
      data: {
        clubId,
        playTime,
        usesPerDay,
      },
    });
  }
  public async createSubscriptionTime({
    clubId,
    totalTime,
  }: {
    clubId: string;
    totalTime: number;
  }): Promise<subOptionTime> {
    return await prisma.subOptionTime.create({
      data: {
        clubId,
        totalTime,
        timeRemain: totalTime,
      },
    });
  }

  public async findSubscriptionOptionTime({
    options,
  }: {
    options: any;
  }): Promise<subOptionTime | null> {
    return await prisma.subOptionTime.findFirst(options);
  }
}