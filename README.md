# 🕌 Premium SaaS Masjid Management & Cashless Donation System

An advanced, enterprise-grade multi-tenant software-as-a-service (SaaS) platform built for modern mosques. It seamlessly integrates comprehensive mosque management operations, dynamic localized user interfaces, and robust multi-tenant bKash cashless payment solutions.

---

## 🚀 Key Highlights & Architectural Achievements

- **Multi-Tenant bKash Cashless System**: Dynamic credentials routing that enables each mosque to securely manage its own bKash Merchant settings. Credentials are encrypted on the server side and stripped from public endpoints to ensure strict compliance with PCI-DSS financial standards.
- **Dynamic Localization (Full Bangla)**: Comprehensive custom-built dictionary-driven translation engine wrapping the entire dashboard structure, forms, dynamic data grids, and transactional notifications in natural Bengali.
- **Enterprise Role-Based Access Control (RBAC)**: Fine-grained security model protecting sensitive administrative actions. Features like "Create Mosques" are fully restricted at both UI, routing, and database layer levels to Authorized Super-Admins only.
- **High-Performance Tech Stack**: Built with **Next.js 15 (App Router)** and **Redux Toolkit** on the frontend, powered by **Express.js**, **TypeScript**, **Prisma ORM**, and **MongoDB** on the backend server.
- **Optimized Mobile Responsiveness**: Stunning, modern, glassmorphic UI styled with Tailwind CSS, utilizing viewport-aware overlays, dynamic modal scrolling, and gorgeous micro-animations.

---

## 🛠️ Technology Stack & System Design

### Frontend Architecture
- **Framework**: Next.js 15 (React 19, App Router)
- **State Management**: Redux Toolkit & RTK Query (efficient caching, caching invalidation, and optimized server state synchronization)
- **Form Handling**: React Hook Form with Zod validation
- **Styling & UI**: Tailwind CSS, Vanilla CSS, React Icons
- **HTTP Client**: Axios (with credentials, custom request/response interceptors)

### Backend Architecture
- **Runtime & Language**: Node.js, TypeScript
- **Web Framework**: Express.js
- **Database Engine**: MongoDB (Multi-Tenant Document Store)
- **ORM & Schema Compiler**: Prisma ORM
- **Authentication & Security**: JWT (Access and Refresh Token Rotation), Cookie Parsers, CORS Policy compliance

---

## 🌟 Core Modules & Features

### 1. Multi-Tenant Payment Credentials
- Admins can configure their **bKash Merchant credentials** (App Key, App Secret, Username, Password, Sandbox/Live toggles) directly in the settings page.
- Features a **Danger Zone** with a secure, instant credential reset hook.
- Beautiful, intuitive **Show/Hide** mask toggle and a compact, elegant **Trash Bin / Delete** action built directly into the UI header cards.

### 2. Shareable Online Payment Portal
- Single-click **"Share Payment URL"** button dynamically copies the mosque-specific payment link (`/online-payment?mosqueId=XYZ`) directly to the clipboard.
- The online payment page features a premium skeleton loader, suspension blocks for URL param parsing, dynamic mosque-specific branding, and a secure payment creation transition.
- Redirection callbacks trigger beautiful **Donation Success** (displaying dynamic, copyable transaction IDs with green ring animations) and **Donation Fail** pages.

### 3. Ramadan & Iftar Operations
- Detailed **Iftar List Creator** and calendar scheduler.
- **Itikaf Participant Registry** tracking members, details, and schedules.
- **Tarabi Salary Payments** module managing Imam and Muazzin salaries.

### 4. Financial & Expense Analytics
- **Friday Collection Tracker** for recording, printing, and exporting weekly collections.
- **Monthly Salary & Member Dues** modules to collect member subscriptions.
- **Management Cost Register** tracking accessory purchases, mosque expenses, and payroll.

---

## 📁 System Architecture & Directory Tree

### Frontend Structure
```text
src/
├── app/
│   ├── (dashboard)/
│   │   ├── (mosque)/
│   │   │   └── mosques-create/       # Protected Super-Admin view
│   │   └── payment-credentials/      # Mosque Merchant settings
│   ├── donation/
│   │   ├── success/                  # Bouncing emerald checkmark + copyable TrxID
│   │   └── fail/                     # Visual failure callback card
│   └── online-payment/               # Public shareable portal
├── components/
│   ├── layout/                       # Protected dashboard wraps
│   └── shared/                       # Translation, forms, and custom components
└── redux/
    ├── api/                          # baseApi and RTK Query config
    └── features/                     # Auth slice, payment queries, etc.
```

### Backend Structure
```text
src/
├── app/
│   ├── middlewares/                  # Auth guards and exception handlers
│   ├── modules/
│   │   ├── onlinedonation/           # Payment logic, callbacks, controllers
│   │   └── mosqueManagement/         # Multi-tenant tenant control
│   └── routes/                       # Express router configuration
└── server.ts                         # Server bootstrapping
```

---

## ⚙️ Installation & Developer Guide

### Prerequisites
- Node.js (v18.x or above)
- MongoDB Connection String
- bKash Sandbox/Live Merchant Account

### 1. Server Configuration
1. Navigate to the server directory:
   ```bash
   cd masjid_management_server-Prisma
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables inside `.env`:
   ```env
   DATABASE_URL="mongodb+srv://..."
   TOKEN_SECRET_KEY="your-jwt-secret"
   REFRESHTOKEN_SECRET_KEY="your-refresh-secret"
   BACKEND_URL="http://localhost:5000"
   FRONTEND_URL="http://localhost:3000"
   CLIENT_URL="http://localhost:3000"
   ```
4. Start the server in development mode:
   ```bash
   npm run dev
   ```

### 2. Frontend Configuration
1. Navigate to the client directory:
   ```bash
   cd masjid_management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables inside `.env`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Run the Next.js development server:
   ```bash
   npm run dev
   ```

---

## 🎓 Showcase on CV (Recommended Phrasing)

> **Lead Full-Stack Engineer — Masjid Management Platform**
> - Architected and engineered a secure, multi-tenant SaaS application managing operations, billing, and cashless online donations for multiple mosques using Next.js 15, Redux Toolkit, Node.js, Express, and Prisma ORM.
> - Implemented a dynamic payment credential routing system integrated with the bKash Merchant Gateway API, utilizing strict role-based access control (RBAC) and client/server-side validation models.
> - Developed a highly custom React Context translation engine providing real-time localization between English and Bengali across all grids, tables, and transactional feedback flows.
> - Managed responsive database design with MongoDB and Prisma, implementing efficient caching invalidation models via RTK Query that cut server overhead significantly.
