import MpesaServices from "../services/mpesa";
import MpesaHelper from "../helpers/mpesa";
import createError from 'http-errors';

export default class MpesaController{
   /**
    * use use this function to get access token
    * @param {Request} req 
    * @param {Response} res 
    * @param {Next} next 
    */
    static async getAccessToken(req, res, next){
        try {
            const access = await MpesaServices.getAcessToken();
            return res.status(200).send(access)
        } catch (error) {
            console.log(error)
            next({
                data: createError(
                    error.status,
                    error.message
                )
            });
        }
    }

    static async lipaNaMpesa( req, res, next){
        const { body:{ amount, phone, transactionDesc }} = req;
        try {
            const result = await MpesaHelper.initiatePayment(amount, phone, phone, transactionDesc )
            return res.status(result.status).send(result.data)
        } catch (error) {
           return res.status(400).send(error.message)
        }
    }

    static async mpesaCallBack(req,res,next){
    const {
        body:{
            Body: {
                stkCallback: {
                MerchantRequestID,
                CheckoutRequestID,
                ResultCode,
                ResultDesc,
                CallbackMetadata
                }
            }
        }
    } = req
    console.log(req.body)

    if(ResultCode === 0){
        console.log("Controller => ", CallbackMetadata)
        const result = await MpesaHelper.completeSuccessfulTransaction(CheckoutRequestID,ResultCode,ResultDesc,CallbackMetadata)
        return res.status(200).send(result)
    }
    else{
        const result = await MpesaHelper.completeUnSuccessfulTransaction(CheckoutRequestID,ResultCode,ResultDesc)
        return res.status(200).send(result)
    }

    }
}