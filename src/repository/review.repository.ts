import { review } from '@prisma/client';
import { IReviewRepository } from './interface/iReview.repository';
import prisma from '../lib/prisma';
import { getRedis } from '../lib/init.redis';
import { randomInt } from 'crypto';
const { instanceConnect: redisClient } = getRedis();

export class ReviewRepository implements IReviewRepository {
  private static Instance: ReviewRepository;
  public static getInstance(): IReviewRepository {
    if (!this.Instance) {
      this.Instance = new ReviewRepository();
    }
    return this.Instance;
  }

  public async foundReview({
    options,
  }: {
    options: any;
  }): Promise<review | null> {
    const result = await prisma.review.findFirst(options);
    return result;
  }

  public async updateManyReview({ options }: { options: any }): Promise<any> {
    return await prisma.review.updateMany(options);
  }

  public async createReview({
    reviewerId,
    clubId,
    content,
    parentId,
    commentLeft,
    commentRight,
  }: {
    reviewerId: string;
    clubId: string;
    content: string;
    parentId: string | null;
    commentLeft: number;
    commentRight: number;
  }): Promise<review> {
    return await prisma.review.create({
      data: {
        reviewerId,
        clubId,
        content,
        parentId,
        commentLeft,
        commentRight,
      },
    });
  }

  public async foundManyReview({
    options,
  }: {
    options: any;
  }): Promise<review[] | null> {
    return prisma.review.findMany(options);
  }

  public async deleteMany({ options }: { options: any }): Promise<any> {
    return await prisma.review.deleteMany(options);
  }
}
