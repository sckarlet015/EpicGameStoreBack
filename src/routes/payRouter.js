const { Router } = require('express');
const { getPay, postPay, getFeedPay } = require('../handlers/activityPay');
const payRouter = Router();

payRouter.get("/", getPay)
payRouter.post("/create_preference", postPay)
payRouter.get("/feedback", getFeedPay)

module.exports = payRouter;