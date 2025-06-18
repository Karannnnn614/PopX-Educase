# 🔐 React Login App (Vite + Express)

A simple full-stack login application built using **React** (with Vite) for the frontend and **Express.js** for the backend. It uses a `users.json` file to simulate user authentication and demonstrates client-server interaction using API routes.

---
## 📁 File Structure

```bash
react-login/
├── client/                         # React frontend with Vite
│   ├── public/                     
│   ├── src/
│   │   ├── assets/                 # All assets (eg. fonts,images...)
│   │   ├── contexts/               # React context providers (e.g., AuthContext.jsx)
│   │   ├── screens/                # Different pages (e.g., LoginForm.jsx)
│   │   ├── App.jsx                 # Core app layout & routing
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global CSS styles (with tailwind)
│   ├── index.html                  # Html file
│   ├── vite.config.js              # Vite config
│   ├── eslint.config.js            # ESLint config for linting React/Vite code
│   └── package.json                # Frontend dependencies and scripts
│
├── server/                         # Express backend
│   ├── users.json                  # Mock user storage
│   ├── express.js                  # Express app
│   └── package.json                # Backend dependencies/scripts
│
├── .gitignore
└── README.md
```

# 1. Clone the repository
```bash
git clone https://github.com/Ayush-2965/react-login.git
cd react-login
```

# 2. Install frontend dependencies
```bash
cd client
npm install
```

# 3. Install backend dependencies
```bash
cd ../server
npm install
```

# 4. Install concurrently from root
```bash
cd ..
npm install concurrently --save-dev
```

# 6. Run the project
```bash
npm start
```