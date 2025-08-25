# Ecommerce System — Full-Stack Project

**Project:** Modern Full-Stack eCommerce System (React + Tailwind • Node.js + Express • MongoDB • Socket.IO)  
**Repository:** [Replace this with your GitHub repo URL on the first line (required by your brief).](https://github.com/sgrvperera/ecommerce--System.git)  


---

## Project overview

A production-oriented eCommerce system built as a coursework submission. The project is a single repository containing a React frontend (Vite + Tailwind), a Node.js/Express backend, a MongoDB database layer (Mongoose), and a WebSocket layer using Socket.IO. It implements user authentication, role-based access control (user/admin), full CRUD for Products, Orders and Users, a client-side cart and checkout flow, real-time order updates and a simple chat feature.

This repo is intended to be complete and ready to run in a development environment. It also includes CI and Docker assets to demonstrate DevOps practices required in the assessment brief.

---

## Key features

- JWT-based authentication (register/login) with bcrypt password hashing
- Role-based access control: `user` and `admin`
- Product CRUD (title, description, price, stock, imageUrl, category)
- Order creation and lifecycle (pending → processing → shipped → delivered → cancelled)
- Client-side cart and checkout (frontend)
- Real-time notifications and chat using Socket.IO (order updates and simple support chat)
- RESTful API endpoints with Express and Mongoose
- Example unit & integration tests (Jest + Supertest) and CI sample workflow
- Docker Compose for local development (MongoDB, backend, frontend)

---

## Repo layout (important)

```
ecommerce-system/
├─ backend/                # Node.js + Express backend
│  ├─ package.json
│  ├─ .env.example
│  └─ src/
│     ├─ server.js
│     ├─ app.js
│     ├─ config/db.js
│     ├─ models/ (User, Product, Order)
│     ├─ controllers/
│     ├─ routes/
│     ├─ middlewares/
│     └─ sockets/
├─ frontend/               # React (Vite) frontend
│  ├─ package.json
│  ├─ index.html
│  └─ src/
│     ├─ index.jsx
│     ├─ App.jsx
│     ├─ api/
│     ├─ pages/
│     └─ components/
├─ docker-compose.yml
├─ REPORT_D1.docx
├─ README.md               # <-- You are reading this
└─ .gitignore
```

---

## Prerequisites (local development)

- Node.js (v18 recommended)
- npm (v9+) or yarn
- MongoDB (local) or a MongoDB Atlas connection string
- Git (for pushing to GitHub)
- Optional: Docker & docker-compose (for running services locally)

---

## Environment variables

Copy `.env.example` files and set real values before running services:

**Backend (`backend/.env`)**:
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/ecommerce    # or your Atlas URI
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:3000
```

**Frontend (`frontend/.env` or Vite env)**:
```
VITE_API_URL=http://localhost:4000/api
VITE_API_SOCKET=http://localhost:4000
```

> **Security note:** Never commit production secrets to the repository. Use GitHub Secrets or your hosting provider's secret manager in production.

---

## Install & run (development)

### Run with local Node & MongoDB
1. Start a MongoDB instance (local `mongod` or Atlas).
2. Backend:
```bash
cd backend
npm install
cp .env.example .env
# edit .env then
npm run dev   # uses nodemon (dev) or `npm start` for production
```
3. Frontend:
```bash
cd frontend
npm install
# set VITE_API_URL if needed in .env or env var
npm run dev    # Vite dev server (default: http://localhost:5173 or 3000)
```

Open the frontend in a browser and the backend API will be available at the configured host/port.

### Run with Docker Compose (recommended for dev parity)
```bash
docker-compose up --build
```
This will start MongoDB, backend and frontend services as configured in `docker-compose.yml`.

---

## Scripts (high level)

**Backend (from `backend/`)**
- `npm run dev` — start dev server with nodemon
- `npm start` — start production server (node)
- `npm test` — run Jest tests

**Frontend (from `frontend/`)**
- `npm run dev` — start Vite dev server
- `npm run build` — build for production

---

## API endpoints (summary)

**Auth**
- `POST /api/auth/register` — Register new user `{ name, email, password }`
- `POST /api/auth/login` — Login `{ email, password }` → returns JWT token

**Products**
- `GET /api/products` — List products
- `GET /api/products/:id` — Get product details
- `POST /api/products` — Create product (admin only)
- `PUT /api/products/:id` — Update product (admin)
- `DELETE /api/products/:id` — Delete product (admin)

**Orders**
- `POST /api/orders` — Create order (authenticated user)
- `GET /api/orders` — List orders (admin sees all, user sees own)
- `PUT /api/orders/:id/status` — Update order status (admin only)

---

## Real-time (Socket.IO)

- Client connects and can join a room: `joinRoom` with `user_<id>`
- Events:
  - `chatMessage` — broadcast to a room object `{ roomId, message, from }`
  - `orderUpdated` — server emits `{ userId, orderId, status }` to `user_<id>` room

---

## Tests & CI

- Example tests for backend using `jest` and `supertest` are located under `backend/tests`.
- A sample GitHub Actions workflow is included at `.github/workflows/ci.yml.sample` and should be copied to `.github/workflows/ci.yml` to enable CI on pushes. It runs backend tests and builds the frontend.

---

## Deployment recommendations

- **DB:** MongoDB Atlas (production)
- **Backend:** Render, Railway, Heroku, or Dockerized container on cloud provider
- **Frontend:** Vercel or Netlify (set `VITE_API_URL` to backend endpoint)
- Add HTTPS, CORS restrictions, logging, monitoring and secret management for production.

---

## How to push this project to GitHub (quick steps)

1. Create a new repo on GitHub (do not initialize with README).
2. From the project root (where this README is):
```bash
git init
git add .
git commit -m "Initial commit - ecommerce project"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/ecommerce-system.git
git push -u origin main
```
Or use the GitHub CLI:
```bash
gh auth login
gh repo create YOUR_USERNAME/ecommerce-system --public --source=. --remote=origin --push
```

---

## Notes & next steps

- Add production-ready features: payment gateway, image uploads (S3), more robust rate-limiting & input validation, multi-currency, and full E2E tests.
- Replace placeholder values in `REPORT_D1.docx` and the README (GitHub URL, author name) before final submission.

---

## License & acknowledgements

This project skeleton is provided for educational purposes. Adapt and personalize before submission to satisfy your institution's academic integrity rules.

---

If you want, I can now:
- (A) Add this README into the zip and produce a new downloadable zip (I will do that now).  
- (B) Generate a short `CONTRIBUTING.md` and `LICENSE` file.
- (C) Edit `REPORT_D1.docx` to include the actual GitHub repo link and convert to PDF for you.
