# 🔐 Secure Inventory Item Management API

A secure, production-ready backend API that allows users to manage their personal inventory items. This Node.js + Express.js app uses OTP-based authentication and Drizzle ORM with PostgreSQL to ensure data privacy and security.

> ✅ Built with clean code, follows REST standards, and deployed on **Render** with **Neon PostgreSQL**.

---

## 📌 Live Deployed API

> 🌍 **Base URL**: [`https://secure-inventory-api.onrender.com`](https://secure-inventory-api.onrender.com)

---

## 📂 Folder Structure

```
src/
├── config/          # DB & environment setup
├── controllers/     # Auth and item logic
├── models/          # Drizzle schema (users, items)
├── routes/          # Route definitions (auth, items)
├── utils/           # OTP mail utility via nodemailer
├── app.js           # Express setup
└── server.js        # Entry point
```

---

## ⚙️ Tech Stack

- **Node.js** + **Express**
- **Drizzle ORM** with PostgreSQL
- **JWT** for secure sessions
- **Nodemailer** for OTP email auth
- **Render.com** for deployment
- **Neon.tech** (Free PostgreSQL)
- Bonus: **Postman Collection** Included ✅

---

## 🚀 Features

### 🔐 OTP-Based Authentication

- `POST /api/auth/request-otp`: Send OTP to email
- `POST /api/auth/verify-otp`: Verify OTP & get token

### 📦 Inventory Item Management (JWT Protected)

- `POST /api/items`: Create item
- `GET /api/items`: Fetch user's items
- `PUT /api/items/:id`: Update user’s item
- `DELETE /api/items/:id`: Delete user’s item

> 🛡️ All `/items` routes require `Authorization: Bearer <token>`

---

## 🛠️ Setup Instructions (Local)

### 1. Clone the repo

```bash
git clone https://github.com/vijay0984567/Secure-Inventory-Item-Management-API.git
cd Secure-Inventory-Item-Management-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure `.env`

Create a `.env` file using `.env.example`:

```env
PORT=5000
DATABASE_URL=postgresql://<username>:<password>@<host>/<db>?sslmode=require
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

> ✅ Make sure you enable **Less secure apps** or generate **App password** if using Gmail.

### 4. Push DB schema (once)

```bash
npx drizzle-kit push
```

### 5. Run the server

```bash
npm run dev
```

---

## 🔁 Authentication Flow (OTP-based)

1. Send `POST /api/auth/request-otp` with `{ "email": "user@example.com" }`
2. Check inbox for 6-digit OTP
3. Call `POST /api/auth/verify-otp` with `{ "email": "...", "otp": "..." }`
4. Receive `JWT Token` for use in all protected endpoints.

---

## 📬 Postman Collection & Env File

- 🔗 [Postman Collection](postman/secure-inventory-api.postman_collection.json)
- 🌐 [Postman Env File](postman/secure-inventory-env.postman_environment.json)

> 💡 Includes pre-configured auth + CRUD requests with `{{API_BASE_URL}}`.

---

## 🛡️ Security Best Practices

- OTP verification before any access
- JWT-based token expiration (`1d`)
- Drizzle schema validation
- Email/password stored only in `.env`
- Route-based ownership validation

---

## 🔮 Future Improvements

- Add item pagination & search
- Switch to **TypeScript** for strong typing
- Use Redis for OTP expiry tracking
- Add tests via **Jest** or **Supertest**
- Add Swagger/OpenAPI docs

---

## 👤 Author

**Vijay Kumar**  
[`@vijay0984567`](https://github.com/vijay0984567)

---

## 📄 License

This project is licensed under the MIT License.
