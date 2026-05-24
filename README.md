# 🏥 KinWell — AI-Powered Preventive Healthcare for Rural India

<div align="center">

**Bridging the gap between rural communities and essential healthcare services.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📋 Overview

**KinWell** is a modern, mobile-first, AI-powered preventive healthcare application tailored for **rural and semi-urban communities in India**. It provides an intuitive, offline-first interface designed to empower both individuals and ASHA (Accredited Social Health Activist) workers with critical health tools — all accessible on low-end devices.

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Smart Dashboard** | Personalized health overview with quick access to all features |
| 💉 **Vaccine Tracker** | Smart vaccine reminders and immunization schedule management |
| 🔬 **AI Skin Analysis** | Image-based skin condition screening using AI guidance |
| 🤖 **Multilingual Chatbot** | Voice-enabled health assistant with multilingual support |
| 👩‍⚕️ **ASHA Worker Mode** | Dedicated dashboard for community health workers to manage records |
| 👤 **Profile Management** | Personal health profile and settings |

## 🛠️ Tech Stack

- **Frontend:** React 19 + React Router v7
- **Build Tool:** Vite 8
- **Icons:** Lucide React
- **Styling:** Vanilla CSS with modern design tokens
- **Linting:** ESLint 9

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yug-Gupta1212/kinwell.git
   cd kinwell
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the URL shown in the terminal).

### Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` folder.

## 📁 Project Structure

```
kinwell/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   └── Layout.jsx       # Shared layout with navigation
│   ├── pages/
│   │   ├── AshaWorker.jsx   # ASHA worker dashboard
│   │   ├── Chatbot.jsx      # AI health chatbot
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Profile.jsx      # User profile
│   │   ├── SkinAnalysis.jsx # AI skin screening
│   │   ├── SplashScreen.jsx # Welcome screen
│   │   └── VaccineTracker.jsx # Vaccine management
│   ├── App.jsx              # Root component with routing
│   ├── index.css            # Global styles & design system
│   └── main.jsx             # App entry point
├── index.html               # HTML template
├── package.json
├── vite.config.js
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Built with ❤️ for rural India's healthcare needs
- Designed to work on low-bandwidth and low-end devices
- Inspired by India's ASHA worker program

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://github.com/Yug-Gupta1212">Yug Gupta</a></sub>
</div>
