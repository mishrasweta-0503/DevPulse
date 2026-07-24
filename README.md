# DevPulse 🚀 — Developer Community & Snippet Platform

![DevPulse Banner](https://img.shields.io/badge/DevPulse-MERN%20Stack-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v3-38BDF8?style=for-the-badge&logo=tailwindcss)

DevPulse is a full-stack social platform engineered for developers to share project updates, technical snippets, and collaborate. Built using the **MERN stack**, it features JWT-based authentication with automatic token attachment via Axios interceptors, dynamic skill-tag filtering, responsive feed updates, and a one-click Recruiter Demo bypass.

---

## ⚡ Live Demo & Links

* **Frontend App:** [https://your-devpulse-app.netlify.app](https://your-devpulse-app.netlify.app)
* **Backend API:** [https://devpulse-api.onrender.com/api](https://devpulse-api.onrender.com/api)

---

## Key Features

- 🎯 **One-Click Recruiter Demo Mode:** Instant guest authentication bypasses sign-up barriers for seamless recruiter evaluations.
- 💬 **Interactive Developer Feed:** Post technical updates with custom technology tags (e.g., `Node.js`, `React`, `JWT`).
- 👥 **Developer Directory:** Search and discover engineers filtered by technology skills and interactive follow mechanics.
- ❤️ **Upvote System:** Toggle post upvotes stored per user ID with real-time UI updates.
- 🛡️ **Secure JWT Authentication:** Token persistence in `localStorage` paired with Axios request interceptors to automatically secure outgoing network calls.
- 🎨 **Responsive Dark UI:** Designed with Tailwind CSS v3 and Lucide Icons for high scannability across modern viewports.

---

## 🏗️ Architecture & Tech Stack
   * **Frontend:** React 18, Vite, React Router v6, Tailwind CSS, Lucide Icons, Axios.
    * **Backend:** Node.js, Express.js, JWT (`jsonwebtoken`), `cors`, `dotenv`.
    * **Database:** MongoDB Atlas with Mongoose ODM schemas for `User`, `Post`, and `Comment`.

---

## 🚀 Local Development Setup

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas connection URI

### 1. Clone & Configure Server
```bash
git clone [https://github.com/your-username/devpulse.git](https://github.com/your-username/devpulse.git)
cd devpulse/server
npm install

Create a .env file inside the server/ directory:
    PORT=5001
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_jwt_secret_key

Start the Express API:
    npm start