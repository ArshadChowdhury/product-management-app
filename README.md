# 🛍️ Product Management App

A full-stack **Next.js (App Router)** application that allows users to **browse, create, edit, view, and delete products** with a smooth and modern UI/UX.

This project was built as part of a technical assignment. It demonstrates strong front-end architecture, client-side validation, responsive design, and integration with Firebase and APIs.

---

## 🚀 Features

- 🔐 **Authentication** using Firebase (JWT stored in Redux)
- 📦 **CRUD Operations** — create, edit, delete, and view product details
- 🔎 **Real-time search** by product name
- 🧮 **Pagination** for product list
- ✅ **Form validations** (price > 0, required fields, correct types)
- 💾 **Smart caching** and re-fetching using React Query
- 💬 **Inline validation messages & error states**
- 🧭 **Responsive and modern UI** with Tailwind CSS
- ⚡ **Confirmation dialogs** for deletes
- 🔄 **Seamless user flow** for create/edit/delete actions

---

## 🧰 Tech Stack

| Category | Tech |
|-----------|------|
| Framework | [Next.js 14 (App Router)](https://nextjs.org/docs) |
| UI | [React](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) |
| Server State / Caching | [React Query](https://tanstack.com/query/latest) |
| Auth / Backend | [Firebase Authentication](https://firebase.google.com/docs/auth) |
| Hosting | [Vercel](https://vercel.com/) |

---

## 🧑‍💻 Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/product-management-app.git
cd product-management-app
npm install
# or
yarn install
# or
pnpm install

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Backend API (replace with provided endpoint)
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com

# 🌐 Deployment

The app is deployed on Vercel.

🔗 Live URL: https://product-management-app-coral.vercel.app/
