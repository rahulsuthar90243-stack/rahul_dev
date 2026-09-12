# Rahul Suthar — Developer Portfolio

A modern, responsive developer portfolio built with React and Vite. It showcases projects, technical skills, and live coding activity from GitHub and LeetCode.

## Features

- Responsive and modern portfolio interface
- Project showcase section
- Skills and technology overview
- Live GitHub statistics
- Live LeetCode profile statistics
- Express backend proxy for LeetCode GraphQL requests
- Reusable React components
- Fast development with Vite and Hot Module Replacement

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Express.js
- GitHub API
- LeetCode GraphQL API

## Project Structure

```text
React_Portfolio_Project/
├── backend/              # Express backend and API routes
├── public/               # Public static assets
├── src/
│   ├── assets/           # Images and project assets
│   ├── components/       # Reusable React components
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── package.json
└── README.md
```

## Requirements

- Node.js 18 or later
- npm

## Installation

```bash
git clone https://github.com/rahulsuthar90243-stack/rahul_dev.git
cd React_Portfolio_Project
npm install
```

## Environment Configuration

Create the backend environment file:

### Windows

```powershell
Copy-Item backend\.env.example backend\.env
```

### macOS/Linux

```bash
cp backend/.env.example backend/.env
```

Configure `backend/.env`:

```env
LEETCODE_USERNAME=your_leetcode_username
PORT=4000
```

Do not commit `.env` files or private credentials to the repository.

## Running the Project

Start the backend server:

```bash
npm run dev:backend
```

In a separate terminal, start the frontend:

```bash
npm run dev
```

Vite proxies API requests to:

```text
http://localhost:4000
```

## API Endpoints

- `GET /api/github`
- `GET /api/domy_api/leetcode`

LeetCode data is fetched through the Express backend to avoid browser CORS restrictions. The frontend requests:

```text
/api/domy_api/leetcode
```

You can configure the default LeetCode account through `backend/.env`, pass a `username` prop to the component, or provide a username through the backend route.

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Troubleshooting

- Ensure both frontend and backend servers are running.
- Restart the servers after changing environment variables.
- Confirm that port `4000` is available.
- Check the backend terminal for API errors.
- Verify the GitHub and LeetCode usernames.
- Confirm that `/api` requests are correctly proxied to the backend.

## Deployment

Before deployment:

1. Configure production environment variables.
2. Build the frontend using `npm run build`.
3. Deploy the frontend and backend.
4. Update API URLs or proxy settings for the production environment.

## License

This project is intended for personal portfolio use.