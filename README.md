# Authentication System

This project is a demo **Authentication System** built using **Next.js (frontend)** and **Node.js with Express (backend)**.  
It supports **JWT-based authentication, OTP verification, and user session management** with secure cookie handling.

---

## 📌 Features

✅ **User Registration & Login**  
✅ **OTP-based Authentication** (Sent in API response for demo)  
✅ **JWT Token stored in HttpOnly Cookies**  
✅ **Protected Routes & User Profile Management**  
✅ **Account Deletion**  
✅ **File Uploads for Profile Pictures**  

---

## 🛠️ Tech Stack

### **Backend (Node.js + Express)**
- **Express.js** - REST API  
- **Prisma ORM** - Database Management  
- **Zod** - Input Validation  
- **JWT** - Authentication  
- **Cookie-based Sessions**  
- **CORS & Secure Headers**  

### **Frontend (Next.js + Tailwind)**
- **Next.js** - SSR & API Routes  
- **Tailwind CSS** - UI Styling  
- **React Hooks & State Management**  
- **Secure HTTP Requests with `fetch`**  

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/iamashay/AuthenticationSystem.git
cd AuthenticationSystem
```

## 🔧 **Backend Setup (Node.js API)**

### 1️⃣ **Navigate to Backend Folder**
```sh
cd server
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Configure Environment Variables**
Create a `.env` file in the `backend` folder and add the following:
```env
#database string
DATABASE_URL="postgresql://userappadmin:userappadmin%40@postgresql-192881-0.cloudclusters.net:10026/userapp"

#JWT configs
JWT_SECRET=cavabien
JWT_EXPIRES_IN=1h  # Token expires in 1 hour

#destination folder for file uploads
UPLOAD=uploads/

# CORS Configuration (Frontend Origin)
CORS_ORIGIN="http://localhost:3000"

#Server Port
PORT=5000
```

### 4️⃣ **Setup Database with Prisma**
Initialize the database and generate the schema:
```sh
npx prisma migrate dev --name init
npx prisma generate
```

> 🛠 If using **SQLite**, Prisma will create a `.sqlite` file in `prisma/` directory.

### 5️⃣ **Run the Backend Server**
```sh
npm run dev
```
Your backend API will start at: **`http://localhost:5000`**

---

## 📜 **Available API Endpoints**
| Method  | Endpoint                 | Description                 |
|---------|--------------------------|-----------------------------|
| `POST`  | `/api/users/register`     | Register a new user         |
| `POST`  | `/api/users/login`        | Login & receive OTP         |
| `POST`  | `/api/users/verifyotp`    | Verify OTP & get JWT token  |
| `GET`   | `/api/users/profile`      | Get logged-in user profile  |
| `DELETE`| `/api/users/delete/`   | Delete user account         |

---

## 🖼 **Handling File Uploads**
- Profile images are stored in the `/backend/uploads/` folder.
- You can access uploaded images via:  
  ```
  http://localhost:5000/uploads/{image}
  ```

---

## ❓ **Common Issues & Fixes**
🔹 **CORS Error?**  
Ensure you have `CORS_ORIGIN="http://localhost:3000"` set in `.env`.  
🔹 **Database Connection Issues?**  
- Verify `DATABASE_URL` is correct.  
- Run migrations again:  
  ```sh
  npx prisma migrate dev
  ```

🔹 **JWT Token Not Working?**  
- Clear cookies and restart the backend:  
  ```sh
  npm run dev
  ```

---

## 🔧 **Frontend Setup (NextJS)**

### 1️⃣ **Navigate to NextJS Folder**
```sh
cd client
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Configure Environment Variables**
Go to `next.config.mjs` file in the `client` folder and update the following:
```env
#NodeJS API location
PUBLIC_API: "http://localhost:5000/api",
```

### 4️⃣ **Run NextJS in development mode**
Initialize the database and generate the schema:
```sh
npm run dev
```
NextJS server will run at localhost:3000

---



