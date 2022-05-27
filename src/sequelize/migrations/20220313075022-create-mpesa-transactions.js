'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MpesaTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Amount: {
        type: Sequelize.FLOAT
      },
      phone: {
        type: Sequelize.STRING
      },
      Transaction: {
        type: Sequelize.STRING
      },
      MerchantRequestId: {
        type: Sequelize.STRING
      },
      CheckoutRequestId: {
        type: Sequelize.STRING
      },
      ResultCode: {
        type: Sequelize.INTEGER
      },
      ResultDec: {
        type: Sequelize.STRING
      },
      MpesaReceiptNumber: {
        type: Sequelize.STRING
      },
      TransactionData: {
        type: Sequelize.DATE
      },
      PaymentStatus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MpesaTransactions');
  }
};