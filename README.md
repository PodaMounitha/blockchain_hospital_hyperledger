MedChain: Secure Blockchain-based Medical Record System

Overview

MedChain is a secure, decentralized medical record management system built using Hyperledger Fabric. It ensures patient data privacy, seamless doctor-patient communication, and fraud detection using AI.

Tech Stack

🔗 Blockchain Layer (Hyperledger Fabric)

Hyperledger Fabric – Private, permissioned blockchain for secure medical record storage.

Chaincode (Smart Contracts) – Written in Python (using Hyperledger Fabric SDK) to manage patient data access.

Hyperledger CA (Certificate Authority) – Handles identity management & access control.

Web3.py – Python library for interacting with blockchain (MetaMask authentication, transactions).

⚙ Backend (Flask API)

Flask (Python) – Lightweight web framework to handle requests & interact with blockchain.

Flask-RESTful – API development for secure patient-doctor communication.

Web3.py – For blockchain interaction.

Flask-SocketIO – Real-time secure chat system.

MongoDB – NoSQL database for metadata (user profiles, logs, chat history).

IPFS (InterPlanetary File System) – Decentralized storage for medical records.

scikit-learn (AI for Anomaly Detection) – Isolation Forest to detect fraudulent access patterns.

🎨 Frontend (React.js)

React.js – Fast, dynamic user interface.

Redux Toolkit – State management for seamless UI experience.

Web3.js / Ethers.js – For integrating MetaMask-based authentication.

Chart.js / Recharts – For interactive patient health analytics.

Material-UI / TailwindCSS – Modern dark-themed UI.

🔐 Authentication & Security

MetaMask & Web3 Authentication – Secure blockchain-based login.

JWT (JSON Web Tokens) – API security.

AES-256 Encryption – End-to-end encryption for chat & medical records.

OAuth 2.0 – Optional for external integrations.

🚀 DevOps & Deployment

Docker & Docker Compose – To set up Hyperledger Fabric network & backend services.

Kubernetes (Optional) – For scaling the application.

AWS / Google Cloud / Azure – Hosting blockchain nodes & backend services.

IPFS Pinning Services – Filecoin, Infura, or Pinata for storing medical reports securely.

Installation & Setup

Prerequisites

Docker & Docker Compose

Node.js & npm

Python 3.8+

MongoDB

IPFS

Steps

Clone the Repository:

git clone https://github.com/yourrepo/medchain.git
cd medchain

Set up Hyperledger Fabric:

cd blockchain
./network.sh up createChannel -c mychannel -ca

Install Chaincode:

./network.sh deployCC -ccn medchain -ccp ./chaincode/ -ccl python

Start Backend Services:

cd backend
pip install -r requirements.txt
python app.py

Start Frontend:

cd frontend
npm install
npm start

API Endpoints

Method

Endpoint

Description

POST

/auth/login

Login using MetaMask

GET

/patient/data

Retrieve patient medical data

POST

/doctor/update

Update patient records

GET

/chat/messages

Fetch chat history

POST

/chat/send

Send encrypted messages

Contributing

Pull requests are welcome. For major changes, open an issue first to discuss the changes.

License

This project is licensed under the MIT License.
