# 🏗️ Professional Folder Structure in Next.js

> 🎯 **Goal of this note:** Learn how to organize your Next.js project like a pro. Keep your routes clean and your logic separated.

---

## 🏗️ The "src" Directory Pattern

Most professional teams use a `src` folder. This keeps your configuration files (like `tailwind.config.js`, `package.json`) separate from your actual application code.

### 📁 The Standard Structure:

```text
my-app/
├── public/              # Static assets (images, fonts, icons)
├── src/
│   ├── app/             # ALL ROUTES (page.js, layout.js, loading.js)
│   ├── components/      # Reusable UI (Button.jsx, Navbar.jsx, Card.jsx)
│   ├── lib/             # Third-party configs (Prisma client, Axios instance)
│   ├── hooks/           # Custom React hooks (useAuth.js, useLocalStorage.js)
│   ├── services/        # API call logic (fetchUsers.js, apiConfig.js)
│   ├── store/           # Redux Slices and Store configuration
│   ├── types/           # TypeScript types/interfaces (if using TS)
│   └── utils/           # Helper functions (formatDate.js, calculateTax.js)
├── tailwind.config.js
├── next.config.js
└── package.json