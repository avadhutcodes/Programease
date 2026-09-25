# ⚡ Programease

> A modern online code execution platform with an asynchronous, queue-based backend architecture inspired by platforms like LeetCode.

Programease provides a browser-based coding environment where users can write, compile, and execute programs in multiple programming languages. It uses **React + TypeScript** on the frontend, **Express + Node.js** on the backend, **MongoDB** for persistent submission data, and **Redis** as a job queue for asynchronous code execution.

### 🚀 Key Features

- 💻 VS Code-like editor powered by **Monaco Editor**
- ⚡ Asynchronous code execution using **Redis job queues**
- 🔄 Submission status polling with **TanStack Query**
- 🗄️ MongoDB-backed submission and result storage
- 🧑‍💻 Support for **C++, JavaScript & Python**
- 🛠️ Compilation and runtime error handling
- 📦 Decoupled API server and code-execution worker architecture
- 🎨 Modern responsive developer-focused UI

### 🏗️ Architecture

```text
User
 │
 ▼
React + Monaco Editor
 │
 │ POST /submission
 ▼
Express API
 │
 ├──────────────► MongoDB
 │
 ▼
Redis Queue
 │
 ▼
Worker
 │
 ├── Compile
 ├── Execute
 └── Capture Result
 │
 ▼
MongoDB
 │
 │ GET /status/:id
 ▼
React + TanStack Query
 │
 ▼
Execution Result
