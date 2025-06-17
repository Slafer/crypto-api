# Crypto Wallet Gateway

This project is a **gateway service** for a cryptocurrency wallet system built on a **microservice architecture**.  
It acts as an entry point for interacting with the internal wallet services.

---

## 🚀 Features

- Serves as the API gateway for the crypto wallet system
- Facilitates:
  - Issuing deposit addresses based on external system login
  - Checking wallet balances
- Built with extensibility and modularity in mind

---

## 🛠️ Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

---

### 🔧 Local Development Setup

1. **Start supporting services (e.g., databases, dependencies):**

```bash
docker-compose -f docker-compose.local.yml up -d --build --remove-orphans --force-recreate
```

```bash
npm install
```

```bash
npm run start:dev
```