import express from "express";
const router = express.Router()
import MpesaController from "../controllers/mpesaController";


router.get('/get_access_token', MpesaController.getAccessToken)
router.post('/lipa_na_mpesa', MpesaController.lipaNaMpesa)
router.post('/mpesa_call_back',MpesaController.mpesaCallBack)

export default router