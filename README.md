# 🔥 Minnu AI — Agentic Barista Orchestration Dashboard

<div align="center">

![Minnu AI Banner](https://img.shields.io/badge/Minnu%20AI-Agentic%20Dashboard-ef4444?style=for-the-badge&logo=python&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A premium multi-agent AI orchestration dashboard for the Agentic Barista App — featuring real-time mesh deployments, AI agent management, and a live Gemini-powered chat assistant.**

[🌐 Live Demo](https://minnu-ai.onrender.com) · [📖 Documentation](#usage) · [🚀 Deploy Your Own](#deployment)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Multi-Agent Orchestration** | Real-time simulation of Product Architect, Code Synthesizer, and Stability Guard agents |
| ☕ **Barista App Integration** | Full Python barista simulator with inventory management, recipe scaling, and order processing |
| 🔐 **Secure Auth System** | User registration/login with SHA-256 password hashing and SQLite persistence |
| 📸 **Profile Picture Upload** | Base64 image encoding — upload, preview, and persist profile photos across all pages |
| 🌐 **Mesh Deployment Monitor** | Live deployment progress bar, throughput charts, and real-time console logs |
| 🤖 **Gemini AI Chat** | Floating assistant powered by Gemini 1.5 Flash API (or offline fallback mode) |
| 🎨 **Dark / Light Mode** | Toggle themes with smooth transitions — persisted across sessions |
| 📊 **Live Telemetry** | Real-time latency sparklines, CPU load metrics, query counters, and network health |
| ⚙️ **Agent Profile Cards** | Filterable agent directory with capability lists and live workload charts |
| 📱 **Fully Responsive** | Screen-fit widescreen layout with bottom navigation on all dashboard pages |

---

## 🖼️ Screenshots

### Hub Dashboard
> Main orchestration hub with live mesh metrics, deployment timeline, and telemetry charts.

### Mesh Monitor
> Real-time deployment progress visualization with throughput analytics and console logs.

### Agent Directory
> Searchable agent cards with role badges, capability lists, and live workload charts.

### System Settings
> Theme toggle, network latency controls, simulation speed, and Gemini API key management.

---

## 🏗️ Architecture

```
MinnuAI/
├── server.py              # Custom Python HTTP server (stdlib only, zero dependencies)
├── barista_app.py         # Python barista simulator with CLI, recipes, and inventory
├── prd_document.md        # Product Requirements Document (AI-generated)
├── qa_feedback.txt        # QA feedback report (AI-generated)
├── requirements.txt       # Python dependencies (none — pure stdlib)
├── render.yaml            # Render.com deployment configuration
└── dashboard/
    ├── index.html         # Hub page — main orchestration dashboard
    ├── meshes.html        # Mesh deployment monitor
    ├── agents.html        # AI agent directory and profiles
    ├── settings.html      # System configuration panel
    ├── login.html         # Authentication page
    ├── task.html          # Task detail view
    ├── app.js             # Shared JavaScript logic (auth, profile, simulation, chat)
    ├── style.css          # Design system — variables, components, dark mode
    └── assets/            # Static assets (images, icons)
```

### Tech Stack

- **Backend**: Python 3 standard library (`http.server`, `sqlite3`, `socketserver`, `hashlib`)
- **Database**: SQLite 3 (file-based, zero configuration)
- **Frontend**: Vanilla HTML5 + CSS3 + JavaScript (no frameworks, no build step)
- **Fonts**: Google Fonts — Inter, Outfit, Fira Code
- **AI**: Gemini 1.5 Flash API (optional, for live chat responses)

---

## 🚀 Quick Start (Local)

### Prerequisites
- Python 3.8 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/srujan1-creator/MinnuAI.git
cd MinnuAI

# 2. Run the server (no pip install needed — zero dependencies!)
python server.py

# 3. Open your browser
# → http://localhost:8000/index.html
```

### Default Login Credentials

| Field | Value |
|---|---|
| **Username** | `admin` |
| **Password** | `password123` |

> ⚠️ Change these credentials immediately after first login for security.

---

## 📖 Usage

### Dashboard Navigation

| Page | URL | Description |
|---|---|---|
| 🏠 Hub | `/index.html` | Main dashboard with metrics and deployment timeline |
| 🔷 Meshes | `/meshes.html` | Live mesh deployment monitor with console logs |
| 🤖 Agents | `/agents.html` | Agent directory with search, filter, and profile cards |
| ⚙️ Settings | `/settings.html` | Theme, latency, simulation speed, API key |
| 🔐 Login | `/login.html` | Authentication (auto-redirects if not logged in) |

### Profile Management
1. Click the **red profile button** (top-right on any page)
2. Click the **avatar circle** to upload a profile photo
3. Edit your **Display Name** and **Role Persona**
4. Click **Save Profile** — changes persist across all pages

### Deploying the Mesh
1. Navigate to the **Hub** page
2. Click **Deploy Mesh** in the sidebar
3. Watch the real-time deployment modal with progress, throughput, and console logs
4. Timeline cards appear as agents complete their tasks

### Using the AI Assistant
1. Click the **floating chat bubble** (bottom-right)
2. Ask questions about the barista app, coffee recipes, or the AI agents
3. **With Gemini API Key**: Live responses from Gemini 1.5 Flash
4. **Without API key**: Smart offline fallback responses

### Setting Up Gemini AI (Optional)
1. Go to **Settings** page
2. Enter your [Gemini API Key](https://makersuite.google.com/app/apikey)
3. Click **Apply Settings**
4. The chat assistant will now use live Gemini AI responses

---

## 🌐 Deployment

### Deploy to Render (Recommended)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

1. Fork this repository
2. Go to [render.com](https://render.com) and sign in
3. Click **New → Web Service**
4. Connect your GitHub repo (`srujan1-creator/MinnuAI`)
5. Render will auto-detect the `render.yaml` configuration
6. Click **Deploy** — your app will be live in ~2 minutes!

**Or manually configure:**
| Setting | Value |
|---|---|
| **Environment** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `python server.py` |
| **Port** | `10000` (auto-detected via `PORT` env var) |

### Deploy with Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
EXPOSE 8000
CMD ["python", "server.py"]
```

```bash
docker build -t minnuai .
docker run -p 8000:8000 minnuai
```

---

## ⚡ Running the Barista App

The Python barista simulator can be run independently:

```bash
# Interactive mode — take orders
python barista_app.py

# Run all automated tests
python barista_app.py --test

# View available menu
python barista_app.py --menu
```

### Menu
| Item | Price | Key Ingredients |
|---|---|---|
| Espresso | $3.00 | 15g beans, 50ml water |
| Americano | $3.50 | 15g beans, 200ml water |
| Latte | $4.50 | 15g beans, 50ml water, 150ml milk |
| Cappuccino | $4.50 | 15g beans, 50ml water, 100ml milk |
| **Gemma 4** ⭐ | **$6.50** | 30g beans, 80ml water, 150ml oat milk, 15ml lavender syrup, 1g gold dust |

---

## 🔒 Security Notes

- Passwords are hashed with **SHA-256** before storage
- Sessions are stored in **localStorage** (client-side)
- Profile pictures are stored as **Base64 data URLs** in SQLite (no file upload)
- For production, consider adding HTTPS via a reverse proxy (Render provides this automatically)

---

## 🧪 Testing

```bash
# Run the barista app unit tests (7 test cases)
python barista_app.py --test
```

Tests cover:
- ✅ Valid order processing
- ✅ Inventory depletion tracking
- ✅ Extra shot scaling
- ✅ Invalid menu item rejection
- ✅ Insufficient ingredient handling
- ✅ Price calculation accuracy
- ✅ Recipe multiplier validation

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Srujan** — [@srujan1-creator](https://github.com/srujan1-creator)

---

<div align="center">

Made with ☕ and 🤖 by the Minnu AI team

⭐ **Star this repo if you find it helpful!**

</div>
