# 🎓 Shree Institute of Learning

> Specialized Coaching for Classes 8th, 9th & 10th — Board Exam Excellence & Olympiad Preparation

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://shree-institute.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github)](https://github.com/ganiharpruthviraj-lgtm/shree-institute)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

---

## ✨ Features

- 🎬 **Dynamic Video Hero** — Full-screen background video with glassmorphism cards
- 🔢 **Live Counters** — Stats animate from 0 to their final value on scroll
- 🎞️ **Scroll-Triggered Animations** — Every section fades, slides, or scales in as you scroll
- 🌈 **Scroll Progress Bar** — Gradient indicator at the top of the page
- 🃏 **Staggered Card Reveals** — Programs, features, and testimonials stagger in with delays
- ↔️ **Alternating Slide Directions** — Testimonials slide in from opposite sides
- ✨ **Micro-interactions** — Hover lift on cards, shine sweep on buttons, glow on icons
- 📱 **Fully Responsive** — Mobile hamburger menu with animated slide-in drawer
- 📋 **Lead Capture Forms** — Hero CTA + full admission form wired to backend API

---

## 🗂️ Project Structure

```
shree-institute/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Video hero, nav, mobile drawer, CTA form
│   │   ├── StatsBar.jsx      # Animated number counters
│   │   ├── Programs.jsx      # Class 8/9/10 program cards
│   │   ├── WhyUs.jsx         # Feature cards with icon animations
│   │   ├── Testimonials.jsx  # Alternating slide-in testimonial cards
│   │   ├── Admissions.jsx    # Lead form + footer
│   │   └── ui.jsx            # Design system: tokens, cards, buttons, typography
│   ├── hooks/
│   │   ├── useInView.js      # IntersectionObserver hook for scroll triggers
│   │   └── useCounter.js     # Animated number counter hook
│   ├── data/
│   │   └── content.js        # All copy & data (edit here to update content)
│   ├── lib/
│   │   └── api.js            # Backend API calls (bookDemo)
│   └── index.css             # Keyframes, reveal utilities, scroll progress bar
├── server/                   # Node.js backend for lead capture
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/ganiharpruthviraj-lgtm/shree-institute.git
cd shree-institute

# Install frontend dependencies
npm install

# Copy env example and fill in your API URL
cp .env.example .env
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://your-backend-api.com
```

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Animations | Pure CSS Keyframes + IntersectionObserver |
| Backend | Node.js (Express) |
| Deployment | Vercel (frontend) |

---

## 📝 Updating Content

All copy — headlines, stats, programs, testimonials, contact info — lives in a single file:

**[`src/data/content.js`](./src/data/content.js)**

Edit that file and Vite HMR will update the browser instantly.

---

## 📄 License

© 2026 Shree Institute of Learning. All rights reserved.
