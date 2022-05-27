import MpesaServices from "../services/mpesa";
const MpesaTransaction = require("../sequelize/models").MpesaTransactions


export default class MpesaHelper{

    /**
     * 
     * @param {inte} Amount 
     * @param {*} PartyA 
     * @param {*} PartyB 
     * @param {*} TransactionDesc 
     */
    static async initiatePayment (Amount, PartyA, PartyB, TransactionDesc){
        try {
            const response = await MpesaServices.lipaNaMpesa(Amount, PartyA, PartyB, TransactionDesc)

            const {
                data: {
                    MerchantRequestID,
                    CheckoutRequestID,
                  
                }
            } = response
            console.log(response.data)
            if(response.status === 200){
                await MpesaTransaction.create({
                    Amount: Amount,
                    phone: PartyA,
                    Transaction: TransactionDesc,
                    MerchantRequestId: MerchantRequestID,
                    CheckoutRequestId: CheckoutRequestID,
                    PaymentStatus: "PENDING"
                })
            }
            return response
        } catch (error) {
            throw error
        }

        
    }
    static async completeSuccessfulTransaction(  CheckoutRequestId, ResultCode, ResultDec,CallbackMetadata ){
        const {Item } = CallbackMetadata
        try {
            return await MpesaTransaction.update({
                ResultCode:ResultCode,
                ResultDec:ResultDec,
                MpesaReceiptNumber:Item[1].Value,
                TransactionData:Item[2].Value,
                PaymentStatus:"SUCCESS"
            },
            {
                where: {
                    CheckoutRequestId: CheckoutRequestId
                }
            }
            )
        } catch (error) {
           console.log(error) 
        }
    }

    static async  completeUnSuccessfulTransaction(CheckoutRequestId, ResultCode, ResultDec){
        try {
            return await MpesaTransaction.update({
                ResultCode:ResultCode,
                ResultDec:ResultDec,
                PaymentStatus:"CANCELLED"
            },
            {
                where: {
                    CheckoutRequestId: CheckoutRequestId
                }
            }
            )
        } catch (error) {
           console.log(error) 
        }

    }
    
}
