'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MpesaTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MpesaTransactions.init({
    Amount: DataTypes.FLOAT,
    phone: DataTypes.STRING,
    Transaction: DataTypes.STRING,
    MerchantRequestId: DataTypes.STRING,
    CheckoutRequestId: DataTypes.STRING,
    ResultCode: DataTypes.INTEGER,
    ResultDec: DataTypes.STRING,
    MpesaReceiptNumber: DataTypes.STRING,
    TransactionData: DataTypes.DATE,
    PaymentStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MpesaTransactions',
  });
  return MpesaTransactions;
};