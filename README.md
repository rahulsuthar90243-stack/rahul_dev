# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


## LeetCode GraphQL backend

The LeetCode card reads live data through the local Express backend. The backend sends the GraphQL request to LeetCode, so the browser never calls LeetCode directly.

1. Copy `backend/.env.example` to `backend/.env` and set your real LeetCode username:

	```env
	LEETCODE_USERNAME=your_leetcode_username
	```

2. Start the backend from the project root:

	```bash
	npm run dev:backend
	```

3. In another terminal, start the Vite frontend:

	```bash
	npm run dev
	```

Vite proxies `/api` requests to `http://localhost:4000`, and the frontend requests `/api/domy_api/leetcode`. You can also override the configured account with `?username=...` through the backend route or pass a `username` prop to the `LeetCode` component.
