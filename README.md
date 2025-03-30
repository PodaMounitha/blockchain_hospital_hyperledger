MedChain: Secure Blockchain-based Medical Record System

🔍 Overview

MedChain is a decentralized medical record system using Hyperledger Fabric for data privacy, secure doctor-patient communication, and AI-driven fraud detection.

🛠 Tech Stack

🔗 Blockchain

Hyperledger Fabric – Secure, private blockchain

Chaincode (Python) – Smart contracts for data access

Hyperledger CA – Identity & access control

Web3.py – Blockchain interactions (MetaMask, transactions)

⚙ Backend (Flask API)

Flask – Lightweight API framework

Flask-RESTful – Secure communication

Web3.py – Blockchain integration

Flask-SocketIO – Real-time chat

MongoDB – NoSQL storage for metadata

IPFS – Decentralized file storage

scikit-learn – AI fraud detection

🎨 Frontend (React.js)

React.js – Fast, dynamic UI

Redux Toolkit – State management

Web3.js / Ethers.js – MetaMask authentication

Chart.js / Recharts – Interactive analytics

Material-UI / TailwindCSS – Modern dark-themed UI

🔐 Security

MetaMask & Web3 – Secure blockchain login

JWT – API security

AES-256 Encryption – Secure chat & records

OAuth 2.0 – Optional integrations

🚀 DevOps & Deployment

Docker & Docker Compose – Blockchain & backend setup

Kubernetes (Optional) – Scaling support

AWS / GCP / Azure – Hosting

IPFS Pinning – Secure file storage (Filecoin, Infura, Pinata)

⚡ Installation & Setup

Prerequisites

🐳 Docker & Docker Compose

🔧 Node.js & npm

🐍 Python 3.8+

🗄️ MongoDB

🌍 IPFS

Steps

Clone the Repo:

Set up Hyperledger Fabric:

Deploy Chaincode:

Start Backend:

Start Frontend:

🔗 API Endpoints

POST /auth/login – Login with MetaMask

GET /patient/data – Retrieve patient records

POST /doctor/update – Update records

GET /chat/messages – Fetch chat history

POST /chat/send – Send encrypted messages

🤝 Contributing

Pull requests are welcome! Open an issue for major changes.

📜 License

Licensed under MIT.

