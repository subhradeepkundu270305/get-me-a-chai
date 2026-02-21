<h1 align="center">
  ☕ Get Me a Chai
</h1>

<p align="center">
  <strong>A modern crowd-funding platform for creators — built with Next.js, MongoDB & Razorpay.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Razorpay-Payments-02042B?style=for-the-badge&logo=razorpay" alt="Razorpay" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/NextAuth.js-v4-purple?style=for-the-badge&logo=auth0" alt="NextAuth" />
</p>

---

## 📖 Table of Contents

- [About](#about)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Database Models](#database-models)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🧋 About

**Get Me a Chai** is a full-stack crowd-funding platform that connects creators with their supporters. Inspired by platforms like *Buy Me a Coffee*, it allows creators to set up a public profile page where fans can send monetary support via Razorpay, leave a message, and help their favourite creators thrive.

The platform features a sleek, glassmorphic dark-mode UI with animated gradients, a powerful creator-search system, public profile pages, a personal dashboard for managing Razorpay credentials, and real-time global stats.

---

## 🚀 Live Demo

> get-me-a-chai-navy.vercel.app

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **GitHub OAuth** | Seamless sign-in via NextAuth.js with GitHub provider |
| 🔵 **Google OAuth** | One-click sign-in via NextAuth.js with Google provider |
| 👤 **Creator Profiles** | Public profile pages at `/:username` with bio, cover image, and profile picture |
| 💸 **Razorpay Payments** | Integrated Razorpay checkout for one-click supporter payments |
| 🔍 **Creator Search** | Debounced, live search to discover creators by username or name |
| 📊 **Live Stats** | Global platform stats — total users, payments & amount raised |
| 🎨 **Premium UI** | Glassmorphism design, animated gradients, GIF backgrounds, micro-animations |
| 📱 **Fully Responsive** | Mobile-first layout across all screen sizes |
| 🧑‍💼 **Dashboard** | Manage profile, bio, account type (Creator/Supporter), and Razorpay keys |
| 🏷️ **Account Types** | Creator accounts display Razorpay settings; Supporter accounts are simplified |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Authentication** | [NextAuth.js v4](https://next-auth.js.org/) (GitHub OAuth) |
| **Database** | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) |
| **Payments** | [Razorpay](https://razorpay.com/) |
| **Notifications** | [React Toastify](https://fkhadra.github.io/react-toastify/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
get-me-a-chai/
├── actions/
│   └── useractions.js          # Server actions (fetch/update user, stats, payments)
├── app/
│   ├── [username]/             # Dynamic public creator profile page
│   ├── about/                  # About page
│   ├── api/
│   │   ├── auth/               # NextAuth route handler
│   │   ├── razorpay/           # Razorpay order creation & payment verification
│   │   └── search/             # Creator username search endpoint
│   ├── dashboard/              # Protected dashboard page
│   ├── login/                  # Login page
│   ├── layout.js               # Root layout (Navbar, SessionWrapper)
│   └── page.js                 # Home page (Hero, Search, About, Stats)
├── components/
│   ├── AboutSection.js         # Feature highlights section
│   ├── Dashboard.js            # Dashboard form & profile management
│   ├── Footer.js               # Site footer
│   ├── Navbar.js               # Glassmorphic navigation bar
│   ├── PaymentPage.js          # Public profile + payment UI
│   ├── SessionWrapper.js       # NextAuth SessionProvider wrapper
│   └── StatsSection.js         # Live global stats display
├── db/
│   └── connectDb.js            # MongoDB connection utility
├── models/
│   ├── User.js                 # User Mongoose schema
│   └── Payment.js              # Payment Mongoose schema
├── public/                     # Static assets (GIFs, images)
├── .env.local                  # Environment variables (not committed)
├── next.config.mjs
└── package.json
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- A **MongoDB** database (e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A **Razorpay** account for payment keys
- A **GitHub OAuth App** for authentication

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/get-me-a-chai.git
cd get-me-a-chai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Fill in the required values (see below)

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root with the following keys:

```env
# ── MongoDB ──────────────────────────────────────────────
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/get-me-a-chai

# ── NextAuth ─────────────────────────────────────────────
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# ── GitHub OAuth ─────────────────────────────────────────
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret

# ── Razorpay (Platform-level / default keys) ─────────────
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
```

> **Note:** Individual creators can also enter their own Razorpay credentials from the Dashboard, which are stored securely in MongoDB.

---

## 🌐 API Routes

| Method | Route | Description |
|---|---|---|
| `GET/POST` | `/api/auth/[...nextauth]` | NextAuth authentication handler |
| `POST` | `/api/razorpay` | Create a Razorpay order for a payment |
| `GET` | `/api/search?q=<query>` | Search creators by username or name |

---

## 🗄️ Database Models

### `User`
| Field | Type | Description |
|---|---|---|
| `email` | String | User's email (required) |
| `name` | String | Display name |
| `username` | String | Unique handle (required) |
| `profilepic` | String | Profile picture URL |
| `coverpic` | String | Cover photo URL |
| `bio` | String | Short bio / description |
| `accounttype` | String | `"creator"` or `"supporter"` |
| `razorpayid` | String | Creator's Razorpay Key ID |
| `razorpaysecret` | String | Creator's Razorpay Secret |

### `Payment`
Stores payment records linked to creators, including supporter messages and amounts.

---

## ☁️ Deployment

This project is optimised for deployment on **Vercel**.

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel
```

Make sure to configure all [Environment Variables](#environment-variables) inside your Vercel project settings before deploying.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve **Get Me a Chai**, please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ☕ by <a href="https://github.com/subhradeepkundu270305">Subhradeep Kundu</a>
</p>
