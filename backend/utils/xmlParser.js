const xml2js = require("xml2js");

const parseXmlToReport = async (xmlContent) => {
  const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });
  const result = await parser.parseStringPromise(xmlContent);

  const data = result.INProfileResponse;


  const applicant =
    data.Current_Application.Current_Application_Details.Current_Applicant_Details;
  const firstName = applicant.First_Name || "";
  const lastName = applicant.Last_Name || "";
  const mobile = applicant.MobilePhoneNumber || "";

  const firstAccount = data.CAIS_Account.CAIS_Account_DETAILS[0];
  const pan =
    firstAccount.CAIS_Holder_ID_Details?.Income_TAX_PAN ||
    firstAccount.CAIS_Holder_Details?.Income_TAX_PAN ||
    "";

  const creditScore = Number(data.SCORE.BureauScore || 0);


  const summary = data.CAIS_Account.CAIS_Summary;
  const creditAccount = summary.Credit_Account;
  const balanceSummary = summary.Total_Outstanding_Balance;

  const reportSummary = {
    totalAccounts: Number(creditAccount.CreditAccountTotal),
    activeAccounts: Number(creditAccount.CreditAccountActive),
    closedAccounts: Number(creditAccount.CreditAccountClosed),
    currentBalanceAmount: Number(balanceSummary.Outstanding_Balance_All),
    securedAccountsAmount: Number(balanceSummary.Outstanding_Balance_Secured),
    unsecuredAccountsAmount: Number(balanceSummary.Outstanding_Balance_UnSecured),
    last7DaysCreditEnquiries: Number(data.TotalCAPS_Summary.TotalCAPSLast7Days),
  };


  let accounts = data.CAIS_Account.CAIS_Account_DETAILS;
  if (!Array.isArray(accounts)) accounts = [accounts];

  const creditAccounts = accounts.map((acc) => {
    const address = acc.CAIS_Holder_Address_Details;
    const addressString = [
      address.First_Line_Of_Address_non_normalized,
      address.Second_Line_Of_Address_non_normalized,
      address.Third_Line_Of_Address_non_normalized,
      address.City_non_normalized,
      address.ZIP_Postal_Code_non_normalized
    ]
      .filter(Boolean)
      .join(", ");

    return {
      bankName: acc.Subscriber_Name?.trim(),
      accountNumber: acc.Account_Number,
      portfolioType: acc.Portfolio_Type,
      currentBalance: Number(acc.Current_Balance || 0),
      amountOverdue: Number(acc.Amount_Past_Due || 0),
      address: addressString,
    };
  });


  const finalData = {
    basicDetails: {
      name: `${firstName} ${lastName}`.trim(),
      mobile,
      pan,
      creditScore,
    },
    reportSummary,
    creditAccounts,
  };

  return finalData;
};

module.exports = parseXmlToReport;