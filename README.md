# Collabo — Real-Time Collaborative Code Editor
A lightweight, real-time collaborative coding app built with **React**, **Vite**, **Y.js**, **y-websocket**, and **Monaco Editor**.  
Each room is identified by a unique, secure random ID prefixed with `tfscollabo`.

---

## 🚀 Features

- ⚡ **Real-time collaboration** powered by [Y.js](https://github.com/yjs/yjs)
- 🌐 **WebSocket sync** using [y-websocket](https://github.com/yjs/y-websocket)
- ✍️ **Monaco Editor** with shared text editing
- 🔒 **Secure room IDs** — generated via `crypto.randomUUID` and prefixed with `tfscollabo`
- 🎨 **Tailwind CSS** for a clean, responsive UI
- ⚡ **Fast dev experience** with [Vite](https://vitejs.dev/)

---

## 🛠️ Tech Stack

| Area        | Library / Tool |
|-------------|---------------|
| Framework   | React + Vite  |
| Styling     | Tailwind CSS  |
| CRDT Engine | Y.js          |
| Transport   | y-websocket   |
| Editor      | Monaco Editor |
| Room IDs    | `crypto.randomUUID()` |

---