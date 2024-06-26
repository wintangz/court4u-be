import { Request, Response } from 'express';
import { IMemberSubscriptionService } from '../service/interface/iMemberSubscription.service';
import { MemberSubscriptionService } from '../service/memberSubscription.service';
const { SuccessResponse } = require('../handleResponse/success.response');

export class MemberSubscriptionController {
  private static readonly memberSubscriptionService: IMemberSubscriptionService =
    MemberSubscriptionService.getInstance();
  private static Instance: MemberSubscriptionController;
  public static getInstance(): MemberSubscriptionController {
    if (!this.Instance) {
      this.Instance = new MemberSubscriptionController();
    }
    return this.Instance;
  }

  public async buyMemberSubscription(req: Request, res: Response) {
    new SuccessResponse({
      message: 'Direct Payment',
      metaData:
        await MemberSubscriptionController.memberSubscriptionService.buySubscription(
          {
            memberId: req.user.userId,
            ...req.body,
          }
        ),
    }).send(res);
  }

  public async paymentCallBack(req: Request, res: Response) {
    new SuccessResponse({
      message: 'Direct Payment',
      metaData:
        await MemberSubscriptionController.memberSubscriptionService.paymentCallBack(
          {
            ...req.query,
          }
        ),
    }).send(res);
    // res.status(200).json(req.query);
    // console.log(req.query);
  }
}
