# CivicEngage: AI-Powered Civic Engagement Platform

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-blue?logo=tailwindcss)
![Gemini API](https://img.shields.io/badge/Gemini_API-Google-orange?logo=google)
![License](https://img.shields.io/badge/License-MIT-green)

CivicEngage is a modern, open-source platform designed to bridge the gap between citizens and local governance. It empowers users to provide feedback, track public funds with blockchain-inspired transparency, and participate in community polls. By leveraging the power of Google's Gemini API, the platform offers an intuitive and intelligent experience for civic participation.

## ✨ Core Features

- **🤖 AI-Powered Feedback Chatbot:** A friendly, conversational AI assistant, powered by the Gemini API, to help citizens report issues, submit suggestions, or voice complaints in a natural way.
- **🔗 Transparent Fund Tracker:** Monitor the progress, budget, and spending of public projects. Each project is linked to a simulated transaction hash, demonstrating the potential for blockchain-level transparency.
- **🗳️ Community Polling:** Participate in local decision-making by casting votes on important community topics. View real-time results after voting.
- **📊 Impact Dashboard:** An analytics dashboard that visualizes community feedback trends, categorizes submissions, and tracks overall user engagement.
- **🔐 User Authentication:** A simple, mock authentication system to provide a personalized experience for registered citizens.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **AI & Generative Models:** Google Gemini API (`@google/genai`)
- **Data Persistence:** Browser Local Storage (to simulate user data, chat history, and votes without a backend)
- **Charting Library:** Recharts
- **Backend Simulation:** Mock services to simulate fetching data from a blockchain and other APIs.

## 🚀 Getting Started

This project is designed to run in a self-contained environment with minimal setup.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- A valid Google Gemini API Key.

### Configuration

1. **API Key:** The application expects the Gemini API key to be available as an environment variable named `API_KEY`. In the development environment where this app is intended to run, this is typically pre-configured.

### Running the Application

This project is a client-side only application. No complex build process is required.

1. **Clone the repository (if applicable):**
   ```bash
   git clone <repository-url>
   ```
2. **Set up the Environment:** Ensure the `API_KEY` environment variable is accessible to the application.
3. **Serve the Files:** Open the `index.html` file through a local web server. A simple way to do this is using a VS Code extension like "Live Server" or a simple Python server:
   ```bash
   python -m http.server
   ```
4. **Access:** Open your browser and navigate to the local server's address (e.g., `http://localhost:8000`).

## 📂 Project Structure

The codebase is organized to be clean, modular, and easy to navigate.

```
/
├── components/
│   ├── layout/       # Header, Footer, etc.
│   ├── pages/        # Top-level page components
│   └── ui/           # Generic UI elements (Button, Card, Input)
├── contexts/         # React Context providers (AuthContext)
├── hooks/            # Custom React hooks (useLocalStorage)
├── services/         # Modules for external/mock APIs (Gemini, Blockchain)
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component and routing logic
├── index.html        # Main HTML entry point
└── index.tsx         # React root renderer
```

## ⚙️ How It Works

- **Gemini Chatbot (`services/geminiService.ts`):** The service constructs a conversation history and sends it to the `gemini-2.5-flash` model. A carefully crafted `systemInstruction` guides the AI's persona, ensuring it remains helpful, empathetic, and focused on civic issues.
- **"Blockchain" Simulation (`services/blockchainService.ts`):** This service provides mock, hardcoded data to simulate fetching project and poll information from a distributed ledger. This demonstrates the *concept* of transparency without the complexity of a real blockchain integration.
- **Local Storage Persistence (`hooks/useLocalStorage.ts`):** All user-specific data, including authentication status, chat history, and poll votes, is stored in the browser's local storage. This custom hook makes it easy to maintain state across sessions without a real backend database.

## 💡 Future Enhancements

This platform serves as a strong foundation. Future development could include:

-   **Real Blockchain Integration:** Connect the fund tracker to a real blockchain like Ethereum or Tezos for true immutability and transparency.
-   **Full-Stack Backend:** Implement a dedicated backend service (e.g., Node.js, Python) with a database (e.g., PostgreSQL) for robust user management and data storage.
-   **Geolocation for Feedback:** Allow users to tag their feedback with a specific location on a map.
-   **Advanced Dashboard Analytics:** Use more complex Gemini queries to perform sentiment analysis and topic modeling on citizen feedback.
-   **Real-time Notifications:** Alert users about new polls, project updates, or responses to their feedback.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
