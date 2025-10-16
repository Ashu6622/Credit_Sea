const mongoose = require("mongoose");

const creditAccountSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  accountNumber: { type: String },
  portfolioType: { type: String },
  currentBalance: { type: Number },
  amountOverdue: { type: Number },
  address: { type: String },
});

const Report = new mongoose.Schema(
  {
    basicDetails: {
      name: { type: String, required: true },
      mobile: { type: String },
      pan: { type: String },
      creditScore: { type: Number },
    },
    reportSummary: {
      totalAccounts: { type: Number },
      activeAccounts: { type: Number },
      closedAccounts: { type: Number },
      currentBalanceAmount: { type: Number },
      securedAccountsAmount: { type: Number },
      unsecuredAccountsAmount: { type: Number },
      last7DaysCreditEnquiries: { type: Number },
    },
    creditAccounts: [creditAccountSchema], //there can be multiple credit accounts so use array
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", Report);
