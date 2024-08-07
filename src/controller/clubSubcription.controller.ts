import { Request, Response } from 'express';
import { IClubSubscriptionService } from '../service/interface/iClubSubcription.service';
import { ClubSubscriptionService } from '../service/clubSubscription.service';
const { SuccessResponse } = require('../handleResponse/success.response');

export class ClubSubscriptionController {
  private static readonly clubSubscriptionService: IClubSubscriptionService =
    ClubSubscriptionService.getInstance();
  private static Instance: ClubSubscriptionController;
  public static getInstance(): ClubSubscriptionController {
    if (!this.Instance) {
      this.Instance = new ClubSubscriptionController();
    }
    return this.Instance;
  }

  public async clubBuySubscription(req: Request, res: Response) {
    new SuccessResponse({
      message: 'Payment redirect',
      metaData:
        await ClubSubscriptionController.clubSubscriptionService.buySubscription(
          {
            clubId: req.clubId,
            ...req.body,
          }
        ),
    }).send(res);
  }

  public async paymentCallBack(req: Request, res: Response) {
    await ClubSubscriptionController.clubSubscriptionService.paymentCallBack({
      ...req.query,
    }),
      res.redirect(`https://court4u-fe.vercel.app/thanks`);
  }

  public async clubBuySubscriptionFirstTime(req: Request, res: Response) {
    new SuccessResponse({
      message: 'Payment redirect',
      metaData:
        await ClubSubscriptionController.clubSubscriptionService.buySubscriptionFirstTime(
          {
            ...req.body,
          }
        ),
    }).send(res);
  }

  public async paymentCallBackFirstTime(req: Request, res: Response) {
    await ClubSubscriptionController.clubSubscriptionService.paymentCallBackFirstTime(
      {
        ...req.query,
      }
    ),
      res.redirect(`https://court4u-fe.vercel.app/thanks`);
  }

  public async findClubSubsByClubId(req: Request, res: Response) {
    new SuccessResponse({
      message: 'Find club subscription',
      metaData:
        await ClubSubscriptionController.clubSubscriptionService.findClubSubsByClubId(
          req.clubId
        ),
    }).send(res);
  }

  public async getAll(req: Request, res: Response) {
    new SuccessResponse({
      message: 'Find club subscription',
      metaData:
        await ClubSubscriptionController.clubSubscriptionService.getAll(),
    }).send(res);
  }

  public async deleteClubSubscription(req: Request, res: Response) {
    new SuccessResponse({
      message: 'Find club subscription',
      metaData:
        await ClubSubscriptionController.clubSubscriptionService.deleteClubSubscription(
          req.params.id
        ),
    }).send(res);
  }
}
