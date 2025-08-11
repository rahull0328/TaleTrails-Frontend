# TaleTrails 🧭  
_A captivating travel storytelling experience_  

TaleTrails is an immersive **travel storytelling web app** where adventurers can **share** their personal travel experiences and **explore** tales from around the world.  

This repository contains the **frontend** of the TaleTrails project, crafted with **React**, **Vite**, and **Tailwind CSS**, focusing on **speed**, **interactivity**, and **mobile-first responsive design**.  

---

## 🌟 Key Features

- ✍️ **Create & Share Tales** — Write engaging travel stories with **title**, **description**, and **photos**.  
- 🗺 **Location & Date Tracking** — Every tale comes with its travel destination and time.  
- 🔍 **Search & Filter** — Easily find stories by location, date, or keyword.  
- 📅 **Interactive Date Picker** — Powered by `react-day-picker`.  
- 🎨 **Beautiful UI** — Minimal yet modern interface with TailwindCSS & smooth animations.  
- 🔐 **Story Modals** — Add and edit stories in an accessible, user-friendly modal.  
- 🔔 **Instant Feedback** — Toast notifications for every action.  
- ⚡ **Ultra-Fast Dev & Build** — Thanks to Vite’s blazing performance.  

---

## 🛠 Tech Stack

| Technology        | Purpose                                       |
|-------------------|-----------------------------------------------|
| **React 19.x**    | UI development and state management           |
| **Vite**          | Lightning-fast build and dev server           |
| **Tailwind CSS**  | Utility-first responsive styling               |
| **React Router DOM** | Routing between pages and story views    |
| **Axios**         | API communication                             |
| **React Toastify**| Non-intrusive toast notifications              |
| **Moment.js**     | Date formatting                               |
| **React Icons**   | Iconography                                   |
| **Radix UI**      | Accessible, headless UI components            |
| **Lucide React**  | Lightweight SVG icons                         |
| **React Modal**   | Accessible modals for story management        |

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

Make sure you have installed:  
- **Node.js** `v18+`  
- **npm** or **yarn** package manager  

---

### 2️⃣ Installation

```bash
# Clone this repository
git clone https://github.com/rahull0328/taleTrails-frontend.git

# Move into the project directory
cd taleTrails-frontend

# Install dependencies
npm install
```

---

### 3️⃣ Run in Development Mode

```bash
npm run dev
```

- This will start the app on http://localhost:5173 (or your Vite-configured port).

---

### 4️⃣ Build for Production

```bash
npm run build
```

- Generates an optimized production-ready build in the dist folder.

---

### 5️⃣ Preview Production Build

```bash
npm run preview
```

---

## 📂 Folder Structure

taleTrails-frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons, and static media
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components for routes
│   ├── utils/              # API helpers, Axios instance
│   ├── App.jsx             # Root component
│   └── main.jsx            # ReactDOM render entry
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS plugins
└── vite.config.js          # Vite configuration

---

## 🤝 Contributing

We welcome contributions! Here’s how you can help:

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to the branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request 🎉