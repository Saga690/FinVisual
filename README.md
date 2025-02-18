# Personal Finance Visualizer

A web application to visualize personal finances, track expenses, and generate monthly reports. Built with Next.js, React, MongoDB, and Vercel for deployment. The backend is deployed on Render, while the frontend is deployed on Vercel.

## Features

- Add, edit, and delete transactions
- View a list of recent expenses
- View a monthly expense breakdown in a bar chart
- Responsive design for better user experience

## Technologies Used

- **Frontend**: 
  - Next.js (React-based framework)
  - Tailwind CSS for styling
  - Recharts for visualizing data
  - ShadCN library for building components
  
- **Backend**: 
  - Node.js with Express.js (deployed on Render)
  - MongoDB for storing transactions

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Saga690/FinVisual
cd FinVisual
```

### 2. Frontend Setup

1. Navigate to the `frontend` folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add the following (replace with your actual values):
```bash
NEXT_PUBLIC_API_URL=your-backend-api-url
```

4. Run the development server:
```bash
npm run dev
```

Your frontend will be running on http://localhost:3000.

### 3. Backend Setup (if deploying locally for testing)

1. Navigate to the `backend` folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add the MongoDB URI and other variables:
```bash
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

4. Run the backend server:
```bash
npm start
```

The backend will be running on http://localhost:5000.

## Deploying

- The **frontend** is deployed on Vercel, and the **backend** is deployed on Render
- Make sure to configure environment variables in both Vercel and Render for smooth communication between the frontend and backend

## API Endpoints

- **GET /api/transactions**: Fetch all transactions
- **POST /api/transactions**: Add a new transaction
- **PUT /api/transactions/:id**: Edit a transaction
- **DELETE /api/transactions/:id**: Delete a transaction
