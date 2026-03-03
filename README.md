# Banking Application – Frontend ⚛️

this is a Frontend application for the Banking Platform built with React (Vite).
This project uses the Spring Boot REST API and provides a clean UI for users and administrators.
This frontend is fully decoupled from backend and communicate via REST. 

Frontend React JSX (Vercel): https://cash-eight-ben.vercel.app
Backend SpringBoot (Railway): https://bankingapp-production-8d32.up.railway.app/

This frontend was built as hands-on learning for React, JSX, routing and state management while integrating with a production-ready Spring Boot backend.

The application focuses on:

* real-world frontend/backend integration
* protected routing
* role-based UI rendering
* secure API communication using JWT

## Tech Stack

Frontend:
  * React (Vite)
  * React Router
  * Context API
  * Fetch API
  * JSX
  * CSS

Backend Integration:
  * Java & Spring Boot 3 REST API & JWT Authentication using Spring Security
  * Role-based access control

Deployment:
* Vercel
* Railway

Version Control:
* Git & GitHub

---

## Core Features

* Authentication:
  * Register & Login
  * JWT stored client-side
  * Automatic token usage in protected API calls
  * Logout handling

* Protected Routes:
  * Route guards using React Router
  * USER and ADMIN role-based rendering
  * Admin panel restricted to only ADMIN role

* Accounts:
  * View account details
  * Display IBAN and balance
  * Transaction history with timestamp and resulting balance

* Transactions:
  * all your Real-time transactions with balance updates from backend

* Direct Debits:
  * Create recurring payments
  * View and manage existing debits

* Loans:
  * Apply for loans
  * View all loans information
  * only allowed 3 loans per accounts, and a 24 hr before applying for a new loan

* Admin Panel:

  * View ALL users, accounts, Direct debits, Loans and transactions.
  * View system statistics.

* Error Handling:

  * Displays backend validation errors
  * Handles expired/invalid JWT
  * Loading states for async calls

---
## Project Structure (High Level)

```
src/
 ├── components/
 ├── pages/
 ├── context/
 ├── services/
 ├── App.jsx
 └── main.jsx
```

* `context/` → Authentication state management
* `pages/` → Route-based screens
* `components/` → Reusable UI components
* `services/` → API calls

---

## Getting Started Locally

### Prerequisites

* Node.js 18+
* Backend running locally or on Railway

---

### 1. Clone the repository

```bash
git clone git@github.com:benjaminMugisha/Banking_app_frontend.git
cd Banking_app_frontend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure backend URL

Create a `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:8080/api/v2
```

Or use your Railway URL:

```bash
VITE_API_BASE_URL=https://bankingapp-production-8d32.up.railway.app/api/v2
```

---

### 4. Start development server

```bash
npm run dev
```

Visit:

```
http://localhost:5173
```

---

## Production Deployment (Vercel)

This project is deployed on:

Vercel

Because this is a Single Page Application (SPA) using React Router, the following rewrite configuration is required:

`vercel.json`

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This ensures route refreshes (e.g. `/dashboard`, `/admin`) do not return 404 errors.

---

## Authentication Flow

1. User logs in or registers.
2. Backend returns JWT + refresh token.
3. JWT is stored in frontend state.
4. All protected requests include:

```
Authorization: Bearer <token>
```

5. Backend validates JWT via Spring Security filter chain.
6. UI renders based on user role.

---

## Learning Focus

This frontend project was intentionally built to:

* Understand JSX deeply
* Practice component-based architecture
* Implement protected routing
* Handle asynchronous API calls
* Integrate securely with a Spring Boot backend
* Deploy a production SPA

It mirrors real-world full-stack architecture and integrates with containerized and cloud-hosted infrastructure.

---

📄 License
MIT License. Copyright (c) 2026 Benjamin Mugisha

📦 [GitHub](https://github.com/benjaminMugisha)
🔗 [LinkedIn](https://www.linkedin.com/in/benjamin-mugisha-9b2397299/)
🐳 [Docker Hub](https://hub.docker.com/r/mugisha99benjamin)
