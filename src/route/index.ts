import express from 'express';
const router = express.Router();

router.use('/v1/api/user', require('./user'));
router.use('/v1/api/auth', require('./auth'));
router.use('/v1/api/clubs', require('./club'));
router.use('/v1/api/court', require('./court'));
router.use('/v1/api/subscriptionForClub', require('./subscriptionForClub'));
router.use('/v1/api/clubSubscription', require('./clubSubscription'));
router.use('/v1/api/subscription', require('./subscription'));
router.use('/v1/api/memberSubscription', require('./memberSubscription'));
router.use('/v1/api/payment', require('./payment'));
router.use('/v1/api/review', require('./review'));
router.use('/v1/api/slots', require('./slot'));
router.use('/v1/api/staffProfile', require('./staffProfile'));
// router.use('/v1/api/pricing', require('./pricing'));
router.use('/v1/api/clubImage', require('./clubImage'));
router.use('/v1/api/bookSlot', require('./bookSlot'));
module.exports = router;
