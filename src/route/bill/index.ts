import express from 'express';
import { asyncHandler } from '../../helper/asyncHandler';
import { authentication, CheckApiKey } from '../../auth/authUtils';
import { BillController } from '../../controller/bill.controller';
const router = express.Router();
router.use(authentication);
router.use(CheckApiKey);
router.get('/:id', asyncHandler(BillController.getInstance().getBillById));
router.get('/', asyncHandler(BillController.getInstance().getAllBill));

module.exports = router;
