/***
 * Mpesa services to interact with endpoints
 */

import axios from "axios";

export default class MpesaServices {
    /***
     * get access token
        */
    static async getAcessToken(){
        try {
            const response  = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",{
                auth:{
                    username:"bfVmY94xNpJODE4GSGS1h4KafkiSXm2t",
                    password:"3R4SSBaqblnidpp7"
                }
            });
            if(response.status===200){
                return response.data;
            }
        } catch (error) {
            throw error;
        }

    }

    /**
     * Sorting date values
     * @param {*} n 
     * @returns 
     */
     static pad2(n){
        return n < 10 ? '0' + n : n
    }

    /**
     * this method generates lipa na mpesa password
     * @returns {object} { BusinessShortCode, Password, Timestamp }
     */
    static async generateTimestamp(){
        const date = new Date();
        const BusinessShortCode = "174379";
        const PassKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
        const Timestamp = date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2( date.getDate()) + this.pad2( date.getHours() ) + this.pad2( date.getMinutes() ) + this.pad2( date.getSeconds() )
        
        const Password = Buffer.from(BusinessShortCode+PassKey+Timestamp).toString('base64');

        return { BusinessShortCode, Password, Timestamp }
    }

    /**
     * This function is used to tricker stk push
     * @param {integer} Amount 
     * @param {string} PartyA 
     * @param {string} PartyB 
     * @param {string} TransactionDesc 
     */
    static async lipaNaMpesa( Amount, PartyA, PartyB, TransactionDesc){
        try {
            const { access_token, expires_in } = await this.getAcessToken()

            const { BusinessShortCode, Password, Timestamp } = await this.generateTimestamp()
            
            const body = {
                "BusinessShortCode": BusinessShortCode,
                "Password": Password,
                "Timestamp": Timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": Amount,
                "PartyA": PartyA,
                "PartyB": BusinessShortCode,
                "PhoneNumber": PartyA,
                "CallBackURL": "https://ecfb-197-248-42-157.ngrok.io/mpesa/mpesa_call_back",
                "AccountReference": "CompanyXLTD",
                "TransactionDesc": TransactionDesc
            }
            const config = {
                headers: { Authorization: `Bearer ${access_token}` },
            };
            const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', body, config)
            return response
            
        } catch (error) {
            return error.response  
        }
    }
  
}