import {
  $Enums,
  Prisma,
  subscriptionDetail,
  subscriptionOption,
  SubscriptionOptionStatus,
  SubscriptionType,
} from '@prisma/client';
import {
  BadRequestError,
  NotImplementError,
} from '../handleResponse/error.response';
import { ISubscriptionRepository } from '../repository/interface/iSubscription.repository';
import { SubscriptionRepository } from '../repository/subscription.repository';
import { ISubscriptionService } from './interface/iSubscription.service';
import { IPaymentService } from './interface/iPayment.service';
import { PaymentService } from './payment.service';

type SubscriptionConstructor = new (...args: any[]) => any;

export class SubscriptionFactory implements ISubscriptionService {
  private static Instance: SubscriptionFactory;
  public static getInstance(): ISubscriptionService {
    if (!this.Instance) {
      this.Instance = new SubscriptionFactory();
    }
    return this.Instance;
  }
  private static readonly _subscriptionRepository: ISubscriptionRepository =
    SubscriptionRepository.getInstance();
  private static subsRegistry: { [type: string]: SubscriptionConstructor } = {};
  constructor() {}
  public registerSubscriptionType(type: string, classRef: any): void {
    SubscriptionFactory.subsRegistry[type] = classRef;
  }
  public createSubscription(type: string, payload: any): Promise<any> {
    const subscriptionClass = SubscriptionFactory.subsRegistry[type];
    if (!subscriptionClass) throw new BadRequestError('Subscription not found');
    return new subscriptionClass(payload).createSubscription();
  }

  public async updateSubscription({
    type,
    subscriptionId,
    payload,
  }: {
    type: string;
    subscriptionId: string;
    payload: string;
  }): Promise<any> {
    const subscriptionClass = SubscriptionFactory.subsRegistry[type];
    if (!subscriptionClass) throw new BadRequestError('Subscription not found');
    return new subscriptionClass(payload).updateSubscription({
      subscriptionId,
    });
  }

  public async searchSubscriptionByClubId({
    keySearch,
  }: {
    keySearch: string;
  }): Promise<subscriptionOption[] | null> {
    const options = {
      where: {
        clubId: keySearch,
      },
    };
    return await SubscriptionFactory._subscriptionRepository.searchSubscriptions(
      { options }
    );
  }

  public async findSubscriptionById({
    keySearch,
  }: {
    keySearch: string;
  }): Promise<subscriptionOption | null> {
    const options = {
      where: {
        id: keySearch,
      },
    };
    return await SubscriptionFactory._subscriptionRepository.findSubscriptionOption(
      {
        options,
      }
    );
  }

  public async findDetailById({
    keySearch,
  }: {
    keySearch: string;
  }): Promise<subscriptionDetail | null> {
    return await SubscriptionFactory._subscriptionRepository.findSubscriptionDetail(
      {
        options: {
          where: {
            id: keySearch,
          },
        },
      }
    );
  }
}

class Subscription {
  clubId: string;
  name: string;
  price: number;
  totalDate: number;
  status: SubscriptionOptionStatus;
  type: SubscriptionType;
  detail: any;
  _subscriptionRepository!: ISubscriptionRepository;
  _paymentService: IPaymentService;
  constructor({
    clubId,
    name,
    price,
    totalDate,
    type,
    status = 'disable',
    detail,
  }: {
    clubId: string;
    name: string;
    price: number;
    totalDate: number;
    type: SubscriptionType;
    status: SubscriptionOptionStatus;
    detail: any;
  }) {
    this.clubId = clubId;
    this.name = name;
    this.price = price;
    this.totalDate = totalDate;
    this.status = status;
    this.type = type;
    this._subscriptionRepository = SubscriptionRepository.getInstance();
    this._paymentService = new PaymentService();
    this.detail = detail;
  }

  async createSubscription(subscriptionId: string) {
    const newSubscription =
      await this._subscriptionRepository.createSubscription({
        id: subscriptionId,
        clubId: this.clubId,
        name: this.name,
        totalDate: this.totalDate,
        price: this.price,
        status: this.status,
        type: this.type,
      });
    return newSubscription;
  }
}

class SubscriptionOptionMonth extends Subscription {
  async createSubscription(): Promise<any> {
    const options = {
      where: {
        clubId: this.clubId,
      },
    };
    const newSubsOptionMonth =
      await this._subscriptionRepository.createSubscriptionMonth({
        clubId: this.clubId,
        ...this.detail,
      });
    if (!newSubsOptionMonth) throw new BadRequestError('Fail to create detail');

    const newSubscription = await super.createSubscription(
      newSubsOptionMonth.id
    );

    return {
      newSubscription,
    };
  }
}

class SubscriptionOptionTime extends Subscription {
  async createSubscription(): Promise<any> {
    const options = {
      where: {
        clubId: this.clubId,
      },
    };
    const newSubsOptionTime =
      await this._subscriptionRepository.createSubscriptionTime({
        clubId: this.clubId,
        ...this.detail,
      });
    if (!newSubsOptionTime)
      throw new NotImplementError('Club already buy this subscription');
    const newSubscription = await super.createSubscription(
      newSubsOptionTime.id
    );

    return {
      newSubscription,
    };
  }
}

const factory = new SubscriptionFactory();
factory.registerSubscriptionType('Month', SubscriptionOptionMonth);
factory.registerSubscriptionType('Time', SubscriptionOptionTime);
