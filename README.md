# CreditSea Financial Portal

A comprehensive XML report management system for financial institutions to upload, process, and analyze credit reports.

## 🚀 Features

- **XML File Upload**: Secure upload and parsing of financial XML reports
- **Report Management**: View, analyze, and delete credit reports
- **Real-time Updates**: Live UI updates without page refresh
- **Responsive Design**: Professional banking-themed interface
- **Error Handling**: Comprehensive error logging and user notifications
- **Toast Notifications**: User-friendly success/error messages

## 🏗️ Application Workflow

### 1. File Upload Process
```
User selects XML file → Multer validates file type → XML Parser processes data → 
MongoDB stores report → Success notification → UI updates with new report
```

### 2. Data Flow Architecture
```
Frontend (React + Vite) ↔ Backend (Node.js + Express) ↔ Database (MongoDB)
```

### 3. Report Management Workflow
```
Home Page → Upload XML → View Reports List → Click Details → 
View Complete Report → Navigate Back → Delete Report (Optional)
```

## 📁 Project Structure

```
CreditSea Task/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── reportController.js   # Report CRUD operations
│   │   └── uploadController.js   # XML upload handling
│   ├── middlewares/
│   │   ├── multer.js            # File upload middleware
│   │   └── globalError.js       # Global error handler
│   ├── model/
│   │   └── Report.js            # MongoDB schema
│   ├── routes/
│   │   ├── reportRoutes.js      # Report API routes
│   │   └── uploadRoutes.js      # Upload API routes
│   ├── utils/
│   │   └── xmlParser.js         # XML parsing logic
│   ├── logs/
│   │   └── errorLog.txt         # Error logging
│   ├── .env                     # Environment variables
│   └── server.js                # Main server file
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Home.jsx         # Main dashboard
    │   │   ├── Home.css         # Dashboard styling
    │   │   ├── DetailFile.jsx   # Report details view
    │   │   └── DetailFile.css   # Details styling
    │   ├── App.jsx              # Main app component
    │   └── main.jsx             # Entry point
    ├── .env                     # Frontend environment
    └── index.html               # HTML template
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload handling
- **XML2JS** - XML parsing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **React Toastify** - Notifications
- **CSS3** - Styling

## 🚦 API Endpoints

### Upload Routes
- `POST /api/upload/xml` - Upload XML file

### Report Routes
- `GET /api/report/all-data` - Get all reports
- `GET /api/report/get-single/:id` - Get single report
- `DELETE /api/report/delete/:id` - Delete report

## 📊 Data Structure

### Report Schema
```javascript
{
  basicDetails: {
    name: String,
    mobile: String,
    pan: String,
    creditScore: Number
  },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalanceAmount: Number,
    securedAccountsAmount: Number,
    unsecuredAccountsAmount: Number,
    last7DaysCreditEnquiries: Number
  },
  creditAccounts: [{
    bankName: String,
    accountNumber: String,
    portfolioType: String,
    currentBalance: Number,
    amountOverdue: Number,
    address: String
  }]
}
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm/yarn

### Backend Setup
```bash
cd backend
npm install
# Configure .env file
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
# Configure .env file
npm run dev
```

### Environment Variables

#### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🌐 Deployment

### Backend (Render)
- Set environment variables: `MONGO_URI`
- Render automatically sets `NODE_ENV=production`
- App listens on Render-provided PORT

### Frontend (Vercel/Netlify)
- Update `VITE_API_URL` to production backend URL
- Build and deploy

## 🔍 Key Features Explained

### 1. XML Processing
- Validates file type (XML only)
- Parses XML structure to JSON
- Extracts financial data fields
- Stores in MongoDB with timestamps

### 2. Error Management
- Global error handler middleware
- Comprehensive error logging to file
- User-friendly toast notifications
- Process-level error catching

### 3. UI/UX Features
- Banking-themed professional design
- Responsive grid layout
- Loading states for async operations
- Real-time data updates
- Mobile-optimized interface

### 4. Security Features
- File type validation
- Memory storage (no disk persistence)
- Error logging without sensitive data exposure
- CORS configuration

## 🎯 User Journey

1. **Landing**: User arrives at CreditSea Financial Portal
2. **Upload**: Select and upload XML credit report file
3. **Processing**: System validates, parses, and stores data
4. **Dashboard**: View uploaded reports in card layout
5. **Details**: Click to view complete report analysis
6. **Management**: Delete reports as needed
7. **Navigation**: Seamless back-and-forth navigation

## 📈 Future Enhancements

- User authentication and authorization
- Report analytics and insights
- Export functionality (PDF/Excel)
- Bulk upload support
- Advanced filtering and search
- Report comparison features
- Email notifications
- Audit trail logging


