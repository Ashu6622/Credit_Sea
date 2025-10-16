import {useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect, useCallback} from 'react';
import {toast} from 'react-toastify';
import './DetailFile.css';


function DetailFile(){

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate();

    async function fetchData(){

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/report/get-single/${id}`);

            if(!response.ok){
                throw new Error('Failed to Fetch Try Again');
            }
            const result = await response.json();
            
            if(!result.success){
                throw new Error('Failed to Fetch Try Again');
            }

            setLoading(false);
            // console.log(result);
            setData(result.data)
        }
        catch(error){
            toast.error(error.message);
            navigate('/', {replace:true});

        }
        
    }

    useEffect(()=>{
        fetchData()
    },[])


    if(loading){
        return <div className="loading">Loading...</div>
    }

    return(
        <div className="detail-container">
            <button className="back-btn" onClick={() => navigate('/', {replace:true})}>← Back to Home</button>
            
            <div className="detail-header">
                <h1 className="detail-title">Credit Report Details</h1>
            </div>

            <div className="content-grid">
                <div className="section-card">
                    <h2 className="section-title">Basic Details</h2>
                    <div className="info-row">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{data?.basicDetails?.name}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Mobile:</span>
                        <span className="info-value">{data?.basicDetails?.mobile}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">PAN:</span>
                        <span className="info-value">{data?.basicDetails?.pan}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Credit Score:</span>
                        <span className="info-value credit-score">{data?.basicDetails?.creditScore}</span>
                    </div>
                </div>

                <div className="section-card">
                    <h2 className="section-title">Report Summary</h2>
                    <div className="info-row">
                        <span className="info-label">Total Accounts:</span>
                        <span className="info-value">{data?.reportSummary?.totalAccounts}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Active Accounts:</span>
                        <span className="info-value">{data?.reportSummary?.activeAccounts}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Closed Accounts:</span>
                        <span className="info-value">{data?.reportSummary?.closedAccounts}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Current Balance:</span>
                        <span className="info-value">₹{data?.reportSummary?.currentBalanceAmount?.toLocaleString()}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Secured Amount:</span>
                        <span className="info-value">₹{data?.reportSummary?.securedAccountsAmount?.toLocaleString()}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Unsecured Amount:</span>
                        <span className="info-value">₹{data?.reportSummary?.unsecuredAccountsAmount?.toLocaleString()}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Recent Enquiries (7 days):</span>
                        <span className="info-value">{data?.reportSummary?.last7DaysCreditEnquiries}</span>
                    </div>
                </div>
            </div>

            <div className="accounts-section">
                <h2 className="section-title">Credit Accounts ({data?.creditAccounts?.length})</h2>
                <div className="accounts-grid">
                    {data?.creditAccounts?.map((account) => (
                        <div key={account._id} className="account-card">
                            <div className="account-header">
                                <span className="bank-name">{account.bankName}</span>
                                <span className={`portfolio-badge portfolio-${account.portfolioType.toLowerCase()}`}>
                                    {account.portfolioType === 'R' ? 'Revolving' : 'Installment'}
                                </span>
                            </div>
                            <div className="account-number">Account: {account.accountNumber}</div>
                            <div className="balance-info">
                                <div className="balance-item current-balance">
                                    <div>Current Balance</div>
                                    <div className="amount">₹{account.currentBalance?.toLocaleString()}</div>
                                </div>
                                <div className="balance-item overdue-amount">
                                    <div>Amount Overdue</div>
                                    <div className="amount">₹{account.amountOverdue?.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="address">{account.address}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailFile


//  "data": [
//         {
//             "basicDetails": {
//                 "name": "Sagar ugle",
//                 "mobile": "9819137672",
//                 "pan": "AOZPB0247S",
//                 "creditScore": 719
//             },
//             "reportSummary": {
//                 "totalAccounts": 4,
//                 "activeAccounts": 3,
//                 "closedAccounts": 1,
//                 "currentBalanceAmount": 245000,
//                 "securedAccountsAmount": 85000,
//                 "unsecuredAccountsAmount": 160000,
//                 "last7DaysCreditEnquiries": 0
//             },
//             "_id": "68efc91309e485abe1e5b840",
//             "creditAccounts": [
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICIVB20994",
//                     "portfolioType": "R",
//                     "currentBalance": 80000,
//                     "amountOverdue": 4000,
//                     "address": "ANANDI VIHAR, DEHU ROAD, PUNE, 411047",
//                     "_id": "68efc91409e485abe1e5b841"
//                 },
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICICI8131308",
//                     "portfolioType": "I",
//                     "currentBalance": 0,
//                     "amountOverdue": 0,
//                     "address": "J-1 110, ANANDI VIHAR, DEHU ROAD, DIGHI, 412216",
//                     "_id": "68efc91409e485abe1e5b842"
//                 },
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICICI8131306",
//                     "portfolioType": "R",
//                     "currentBalance": 80000,
//                     "amountOverdue": 1100,
//                     "address": "J-1 110, ANANDI VIHAR, DEHU ROAD, DIGHI, 412216",
//                     "_id": "68efc91409e485abe1e5b843"
//                 },
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICICI8131307",
//                     "portfolioType": "I",
//                     "currentBalance": 85000,
//                     "amountOverdue": 1200,
//                     "address": "J-1 110, ANANDI VIHAR, DEHU ROAD, DIGHI, 412216",
//                     "_id": "68efc91409e485abe1e5b844"
//                 }
//             ],
//             "createdAt": "2025-10-15T16:17:24.051Z",
//             "updatedAt": "2025-10-15T16:17:24.051Z",
//             "__v": 0
//         },
//         {
//             "basicDetails": {
//                 "name": "Sagar ugle",
//                 "mobile": "9819137672",
//                 "pan": "AOZPB0247S",
//                 "creditScore": 719
//             },
//             "reportSummary": {
//                 "totalAccounts": 4,
//                 "activeAccounts": 3,
//                 "closedAccounts": 1,
//                 "currentBalanceAmount": 245000,
//                 "securedAccountsAmount": 85000,
//                 "unsecuredAccountsAmount": 160000,
//                 "last7DaysCreditEnquiries": 0
//             },
//             "_id": "68efd60a8b369214f1cb79c4",
//             "creditAccounts": [
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICIVB20994",
//                     "portfolioType": "R",
//                     "currentBalance": 80000,
//                     "amountOverdue": 4000,
//                     "address": "ANANDI VIHAR, DEHU ROAD, PUNE, 411047",
//                     "_id": "68efd60a8b369214f1cb79c5"
//                 },
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICICI8131308",
//                     "portfolioType": "I",
//                     "currentBalance": 0,
//                     "amountOverdue": 0,
//                     "address": "J-1 110, ANANDI VIHAR, DEHU ROAD, DIGHI, 412216",
//                     "_id": "68efd60a8b369214f1cb79c6"
//                 },
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICICI8131306",
//                     "portfolioType": "R",
//                     "currentBalance": 80000,
//                     "amountOverdue": 1100,
//                     "address": "J-1 110, ANANDI VIHAR, DEHU ROAD, DIGHI, 412216",
//                     "_id": "68efd60a8b369214f1cb79c7"
//                 },
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICICI8131307",
//                     "portfolioType": "I",
//                     "currentBalance": 85000,
//                     "amountOverdue": 1200,
//                     "address": "J-1 110, ANANDI VIHAR, DEHU ROAD, DIGHI, 412216",
//                     "_id": "68efd60a8b369214f1cb79c8"
//                 }
//             ],
//             "createdAt": "2025-10-15T17:12:42.536Z",
//             "updatedAt": "2025-10-15T17:12:42.536Z",
//             "__v": 0
//         },
//         {
//             "basicDetails": {
//                 "name": "Sagar ugle",
//                 "mobile": "9819137672",
//                 "pan": "AOZPB0247S",
//                 "creditScore": 719
//             },
//             "reportSummary": {
//                 "totalAccounts": 4,
//                 "activeAccounts": 3,
//                 "closedAccounts": 1,
//                 "currentBalanceAmount": 245000,
//                 "securedAccountsAmount": 85000,
//                 "unsecuredAccountsAmount": 160000,
//                 "last7DaysCreditEnquiries": 0
//             },
//             "_id": "68efd6c98b369214f1cb7a21",
//             "creditAccounts": [
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICIVB20994",
//                     "portfolioType": "R",
//                     "currentBalance": 80000,
//                     "amountOverdue": 4000,
//                     "address": "ANANDI VIHAR, DEHU ROAD, PUNE, 411047",
//                     "_id": "68efd6c98b369214f1cb7a22"
//                 },
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICICI8131308",
//                     "portfolioType": "I",
//                     "currentBalance": 0,
//                     "amountOverdue": 0,
//                     "address": "J-1 110, ANANDI VIHAR, DEHU ROAD, DIGHI, 412216",
//                     "_id": "68efd6c98b369214f1cb7a23"
//                 },
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICICI8131306",
//                     "portfolioType": "R",
//                     "currentBalance": 80000,
//                     "amountOverdue": 1100,
//                     "address": "J-1 110, ANANDI VIHAR, DEHU ROAD, DIGHI, 412216",
//                     "_id": "68efd6c98b369214f1cb7a24"
//                 },
//                 {
//                     "bankName": "icicibank",
//                     "accountNumber": "ICICI8131307",
//                     "portfolioType": "I",
//                     "currentBalance": 85000,
//                     "amountOverdue": 1200,
//                     "address": "J-1 110, ANANDI VIHAR, DEHU ROAD, DIGHI, 412216",
//                     "_id": "68efd6c98b369214f1cb7a25"
//                 }
//             ]