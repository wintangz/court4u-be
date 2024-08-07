import { Request, Response } from 'express';
import { ISlotService } from '../service/interface/iSlot.service';
import { SlotService } from '../service/slot.service';
import { ISlotOnCourtService } from '../service/interface/ISlotOnCourt.service';
import { SlotOnCourtService } from '../service/slotOnCourt.service';
const { SuccessResponse } = require('../handleResponse/success.response');

export class SlotController {
  private static readonly slotService: ISlotService = SlotService.getInstance();
  private static readonly slotOnCourtService: ISlotOnCourtService =
    SlotOnCourtService.getInstance();
  private static Instance: SlotController;
  public static getInstacnce(): SlotController {
    if (!this.Instance) {
      this.Instance = new SlotController();
    }
    return this.Instance;
  }
  /**
   * @description tạo slot mới
   * @param req {clubId, startTime, endTime, dateOfWeek}
   * @param res {slot}
   */
  public async addSlot(req: Request, res: Response) {
    new SuccessResponse({
      message: 'create new slot',
      metaData: await SlotController.slotService.addSlot({
        clubId: req.clubId,
        ...req.body,
      }),
    }).send(res);
  }

  /**
   * @description Thêm sân vào slot
   * @param req {slotId, courtId, status?}
   * @param res {slotOnCourt}
   */
  public async addCourtOnSlot(req: Request, res: Response) {
    new SuccessResponse({
      message: 'Add slot to court',
      metaData: await SlotController.slotOnCourtService.addCourtOnSlot({
        slotId: req.params.id,
        ...req.body,
      }),
    }).send(res);
  }

  public async getAllCourtsBySlotId(req: Request, res: Response) {
    new SuccessResponse({
      message: 'get court by slot id',
      metaData: await SlotController.slotOnCourtService.getAllCourtBySlotId(
        req.params.id
      ),
    }).send(res);
  }
  public async getRemainCourt(req: Request, res: Response) {
    new SuccessResponse({
      message: 'get court remain court',
      metaData: await SlotController.slotOnCourtService.getRemainCourt({
        ...req.body,
      }),
    }).send(res);
  }

  public async getClubWithDateTime(req: Request, res: Response) {
    new SuccessResponse({
      message: 'get court remain court',
      metaData: await SlotController.slotService.getClubWithDateTime(
        new Date(req.query.date as string),
        new Date(req.query.time as string)
      ),
    }).send(res);
  }

  public async getSlotInfo(req: Request, res: Response) {
    new SuccessResponse({
      message: 'get court remain court',
      metaData: await SlotController.slotService.getSlotInfo({
        clubId: req.params.clubId as string,
        startDate: new Date(req.query.startDate as string),
      }),
    }).send(res);
  }

  public async deleteSlot(req: Request, res: Response) {
    new SuccessResponse({
      message: 'delete slot success',
      metaData: await SlotController.slotService.deleteSlot({
        clubId: req.clubId,
        slotId: req.params.id,
      }),
    }).send(res);
  }

  public async test(req: Request, res: Response) {
    new SuccessResponse({
      message: 'get exsited',
      metaData: await SlotController.slotService.test({ ...req.body }),
    }).send(res);
  }
}
