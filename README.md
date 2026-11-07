# 🚗 Car Management — Docker Compose

Express REST API + React (Vite & Tailwind CSS) দুটো সার্ভিসকে **Docker Compose** দিয়ে একসাথে চালানোর একটা full-stack project। এক কমান্ডে backend ও frontend দুটোই container-এ চুপচাপ উঠে যায়।

## 📦 Tech Stack

| Layer     | Technology |
|-----------|------------|
| Backend   | Node.js 20, Express 5, CORS |
| Frontend  | React 19, Vite, Tailwind CSS 4, Lucide icons |
| Web Server| nginx (frontend production build serve করে) |
| Storage   | JSON file (`data/cars.json`) + Docker named volume |
| DevOps    | Docker, Docker Compose |

## 🏗️ Project Structure

```
docker-compose/
├── compose.yaml                 # Docker Compose সব কনফিগ
├── car-management-api/          # Backend (Express)
│   ├── Dockerfile
│   ├── data/cars.json           # গাড়ির ডেটা
│   └── src/server.js
└── car-management-frontend/     # Frontend (React + Vite)
    ├── Dockerfile
    ├── nginx.conf
    └── src/
```

## 🚀 চালানোর নিয়ম

প্রয়োজন: [Docker](https://www.docker.com/) ও Docker Compose ইনস্টল থাকা।

```bash
docker compose up -d --build
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:5000/api |

বন্ধ করতে:

```bash
docker compose down
```

ডেটা volume সহ মুছে ফেলতে:

```bash
docker compose down -v
```

## 🔌 API Endpoints

| Method | Endpoint          | Description      |
|--------|-------------------|------------------|
| GET    | `/`               | Welcome message  |
| GET    | `/api/cars`       | সব গাড়ি          |
| GET    | `/api/cars/:id`   | একটা গাড়ি        |
| POST   | `/api/cars`       | নতুন গাড়ি যোগ    |
| PUT    | `/api/cars/:id`   | গাড়ি আপডেট       |
| DELETE | `/api/cars/:id`   | গাড়ি ডিলিট       |

উদাহরণ:

```bash
curl http://localhost:5000/api/cars
```

## ⚙️ Compose কীভাবে কাজ করে

- **backend** — `car-management-api/` থেকে build, port `5000:5000`, `car_data` volume mount হয় `/app/data`-এ (তাই container restart করলেও ডেটা থেকে যায়)।
- **frontend** — `car-management-frontend/` থেকে build, Vite build শেষে nginx এ serve করে, port `3000:80`।
- **depends_on** — frontend চলার জন্য backend আগে থেকেই থাকতে হয়।
- **restart: unless-stopped** — machine reboot বা crash হলে সার্ভিস নিজে থেকেই আবার চালু হয়।

## 🛠️ Local Development (Docker ছাড়া)

Backend:

```bash
cd car-management-api
npm install
npm run dev          # nodemon, port 5000
```

Frontend:

```bash
cd car-management-frontend
npm install
npm run dev          # Vite, port 5173
```

Frontend API URL `.env` বা build arg `VITE_API_URL` দিয়ে ঠিক করা যায় (ডিফল্ট: `http://localhost:5000/api`)।

## 📄 License

MIT
