# TaleTrails 🧭

A captivating travel storytelling web app where users can share and explore personal travel tales. This is the **frontend** of the TaleTrails project, built using **React**, **Vite**, and **TailwindCSS**, focused on providing a fast, interactive, and responsive user experience.

---

## 🌍 Features

- ✍️ Create and share travel tales with title, description, and images
- 🗺️ View tales with location, date, and story details
- 🔍 Search and filter stories easily
- 📅 Date selection with `react-day-picker`
- 🔥 Beautiful UI with TailwindCSS and animations
- 🔐 Modal-based story addition and editing
- 🔔 Toast notifications for feedback
- ⚡ Fast bundling and development using Vite

---

## 🚀 Tech Stack

| Tech               | Purpose                          |
|--------------------|----------------------------------|
| React 19.x         | UI development                   |
| Vite               | Fast build and dev server        |
| Tailwind CSS       | Utility-first styling            |
| React Router DOM   | Routing                          |
| Axios              | API communication                |
| React Toastify     | Toast notifications              |
| Moment.js          | Date formatting                  |
| React Icons        | Icon support                     |
| Radix UI           | Accessible UI components         |
| Lucide React       | Lightweight SVG icons            |
| React Modal        | Accessible modal component       |

---

## 🧑‍💻 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or later recommended)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/rahull0328/taleTrails-frontend.git

# Navigate into the directory
cd taleTrails-frontend

# Install dependencies
npm install
```

### Run Locally

```bash
npm run dev
```
This will start the app on http://localhost:5173 (or as configured by Vite).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Folder Structure

taleTrails-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route-based pages
│   ├── assets/             # Images, icons
│   ├── utils/              # Axios instance, helpers
│   ├── App.jsx             # Root component
│   └── main.jsx            # ReactDOM render
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS plugins
└── vite.config.js          # Vite configuration

---

## ✨ Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.