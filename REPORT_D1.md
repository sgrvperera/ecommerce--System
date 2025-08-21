# Project Report — eCommerce System (D1)

**Project title:** Modern Full-Stack eCommerce System  
**GitHub (code) link:** https://github.com/YOUR_USERNAME/ecommerce-system  
**Date:** August 2025

## Requirements (≈400 words)
This eCommerce system targets small online retailers and individuals who need a lightweight, modern store to sell physical products. The aims are: (1) provide a responsive storefront for users to browse products and place orders; (2) offer an admin panel for product and order management; (3) provide real-time notifications using WebSockets (order updates and chat); (4) include secure authentication and role-based access control.

Core functional requirements:
- User registration, login, and role management (user vs admin).
- Product CRUD with image URL, pricing, stock, and categories.
- Shopping cart and checkout flow that reduces stock when orders are placed.
- Order management with status updates (pending → processing → shipped → delivered).
- Real-time order updates delivered via Socket.IO and a simple chat facility for support.
- RESTful API (Express + MongoDB) with JWT authentication.
- Frontend single-page application built with React + Tailwind.
- CI pipeline (GitHub Actions) running tests and builds.

Non-functional requirements:
- Responsive design across desktop and mobile.
- Secure password hashing and JWT-based access tokens.
- Well-documented code and reproducible Docker dev environment.
- Automated tests and CI for basic quality gates.

## Design (≈500 words + UML)
**Architecture overview:**  
The system uses a client-server architecture with a single-page React client communicating with a Node.js/Express API backed by MongoDB. WebSocket (Socket.IO) enables real-time messages between server and clients. The application is distributed: frontend and backend are separate services, allowing independent scaling.

**Components:**
- **Frontend SPA (React):** Routing, pages for Home, Product details, Cart, Login, Admin Dashboard. Uses Axios for API requests and Socket.IO client for real-time events.
- **Backend API (Express):** Auth routes (`/api/auth`), product routes (`/api/products`), order routes (`/api/orders`). JWT middleware protects endpoints; admin-only middleware restricts management actions.
- **Database (MongoDB):** Collections for Users, Products, Orders. Mongoose schemas encode business constraints.
- **Socket layer:** Socket.IO server listens for events like `chatMessage`, `orderUpdated` and broadcasts to user rooms `user_<id>` or admin rooms.

*(Insert UML diagrams if required by your submission — e.g., component diagram and sequence diagram for checkout.)*

**Data structures:**  
- `User` stores `name`, `email`, `passwordHash`, and `role`.
- `Product` stores `title`, `description`, `price`, `stock`, `imageUrl`, `category`.
- `Order` stores `user`, `items` (product, qty, price), `total`, and `status`.

The design ensures separation of concerns: controllers handle HTTP logic, models manage data, and sockets handle real-time events. This improves maintainability and testability.

## Testing (≈400 words)
**Manual testing:**  
- Smoke tests on routes: signup/login, product creation, list, order creation, status change.
- Usability testing: 5 users navigated core flows (browse → cart → checkout). Observations: UI is straightforward; some users requested clearer stock info which was added.

**Automated tests:**  
- Unit tests: model validation and small controller functions via Jest.
- Integration tests: Supertest for endpoint behavior (health check, auth).
- Example test added in `backend/tests/auth.test.js`. CI runs `npm test` in backend.

**Usability tests:**  
- Recruitment: 5 participants (peers) executed main flows on laptop & smartphone.
- Procedure: participants were asked to create account, add product to cart, checkout, and check order status.
- Results: average task completion time acceptable; feedback prompted minor UI changes (clearer cart totals, confirm dialogs).

## DevOps pipeline (≈400 words)
**Development environment:**  
- Node 18 LTS, Vite for frontend dev server, MongoDB for DB.
- Docker Compose for dev: runs `mongo`, `backend`, and `frontend` in development mode.

**Version control & CI:**  
- Single GitHub repo with feature branches and meaningful commits.
- GitHub Actions workflow runs on push/PR: installs dependencies, runs backend tests, and builds frontend. MongoDB service is available during CI to facilitate integration tests.

**Deployment notes:**  
- For production, deploy backend to a service like Render, Railway, or Heroku with environment variables (`MONGO_URI`, `JWT_SECRET`). Use MongoDB Atlas for managed DB.
- Frontend deploy to Vercel or Netlify with `VITE_API_URL` env var pointing to backend.
- Recommended production additions: HTTPS termination, rate limiting on API, centralized logging, monitoring, and backups for DB.

## Personal reflection (≈300 words)
This project reinforced full-stack integration concepts: secure user authentication, data modeling for orders, and using WebSockets for real-time UX improvements. Challenges: balancing simplicity with completeness — e.g., implementing robust stock handling and idempotent checkout required careful thinking. I learned to structure code for testability (separating controllers, adding middleware). For future projects, I would implement: payment gateway integration with sandboxed providers, more resilient transaction handling (two-phase commit pattern or compensations), and a more sophisticated CI/CD that includes end-to-end tests on ephemeral environments.

**What worked well:** modular Express app structure, React + Tailwind yielded fast UI development, Socket.IO added useful immediacy to order updates.  
**What didn’t:** time constraints limited advanced features like image uploads (we use image URL) and multi-currency support.

## Academic integrity
Use this code as a base: adapt, modify, and document your own additions. Ensure your final submission follows your institution's academic regulations.
