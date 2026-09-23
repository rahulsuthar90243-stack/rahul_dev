# Rahul Suthar | Developer Portfolio

Personal portfolio website for Rahul Suthar, built with React and Vite. The site presents work, skills, experience, projects, contact information, and live GitHub and LeetCode statistics.

## Features

- Responsive portfolio sections with smooth in-page navigation
- Intro animation, custom cursor, motion effects, and particle backgrounds
- Project, skills, experience, testimonials, and contact sections
- Live GitHub repository, contribution, and language statistics
- Live LeetCode profile and problem-solving statistics
- Contact form backed by Express and MongoDB
- Vite development server with an `/api` proxy to the backend

## Stack

- React 19 and JavaScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- React Icons
- Express 5
- MongoDB with Mongoose
- GitHub GraphQL API
- LeetCode GraphQL API

## Project Structure

```text
React_Portfolio_Project/
├── api/                  # Serverless entry point for deployment
├── backend/
│   ├── src/
│   │   ├── controllers/  # GitHub and LeetCode API handlers
│   │   ├── DB/           # MongoDB connection
│   │   ├── models/       # Mongoose models
│   │   ├── routers/      # Express API routes
│   │   └── server.js     # Express application
│   └── package.json
├── src/
│   ├── assets/           # Images and other assets
│   ├── components/       # Reusable UI and data components
│   ├── section/          # Portfolio page sections
│   ├── App.jsx           # Application composition
│   └── main.jsx          # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Requirements

- Node.js 18 or newer
- npm
- A MongoDB database for contact submissions
- A GitHub personal access token with permission to read the required GraphQL data

## Installation

```bash
git clone https://github.com/rahulsuthar90243-stack/rahul_dev.git
cd React_Portfolio_Project
npm install
cd backend
npm install
cd ..
```

## Environment Variables

Create `backend/.env` with server-side values. Never commit this file or expose these values in the frontend.

```env
PORT=4000
LEETCODE_USERNAME=your_leetcode_username
LEETCODE_ENDPOINT=https://leetcode.com/graphql/
GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=your_github_personal_access_token
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net
DB_NAME=your_database_name
```

The frontend uses relative `/api` URLs by default. For a separately hosted backend, you can optionally define a Vite variable before building:

```env
VITE_SERVER_API_URL=https://your-backend.example.com
```

Only variables prefixed with `VITE_` are available to browser code. Keep GitHub tokens, MongoDB credentials, and other private values in the backend environment.

## Development

Start the backend in one terminal:

```bash
npm run dev:backend
```

Start the Vite frontend in another terminal:

```bash
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

For backend watch mode, run this from the project root:

```bash
npm --prefix backend run dev
```

The Vite server proxies `/api` requests to `http://localhost:4000`.

## API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Backend health check |
| `GET` | `/api/github` | GitHub statistics; accepts `?username=` |
| `GET` | `/api/leetcode` | LeetCode statistics; accepts `?username=` |
| `GET` | `/api/contect` | Read saved contact submissions |
| `POST` | `/api/contect` | Save a contact submission |

The GitHub and LeetCode routes call their external APIs from the backend so private credentials are not sent to the browser.

## Build and Lint

```bash
npm run build
npm run lint
npm run preview
```

`npm run preview` serves the latest production build locally.

## Troubleshooting

- Start both the frontend and backend during local development.
- Confirm `backend/.env` exists and contains `GITHUB_TOKEN` and `LEETCODE_USERNAME`.
- Check `http://localhost:4000/health` to verify the backend is running.
- If API requests return `404`, confirm the frontend is using `/api/...` and that Vite is running with the proxy configuration.
- If contact submissions fail, verify `MONGODB_URL`, `DB_NAME`, and MongoDB network access.
- Restart the backend after changing environment variables.

## Deployment

Build the frontend with `npm run build`, then deploy the generated `dist/` directory and the backend. Configure all server environment variables in the deployment provider. The `api/index.js` entry point can be used by platforms that support serverless Node functions.

## License

This project is intended for personal portfolio use.