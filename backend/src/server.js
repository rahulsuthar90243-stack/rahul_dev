import "dotenv/config";
import cors from "cors";      // this middleware is used to share resources between different origins (domains) in web applications
import express from "express";
import leetcodeRouter from "./routers/leetcode.router.js"
import githubRouter from "./routers/github.router.js"
import contectRouter from "./routers/contect.router.js"
import connectDB from "../src/DB/db.js"

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.use("/api/leetcode", leetcodeRouter);
app.use("/api/github", githubRouter);
app.use("/api/contact", contectRouter);


export default app;

// Vercel sets VERCEL for deployed and preview functions.
if (!process.env.VERCEL) {
  app.listen(port, async () => {
    console.log(`Backend running at http://localhost:${port}`);

    try {
      await connectDB();
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection failed:", error.message);
    }
  });
}

// const startServer = async () => {
//   app.listen(port, () => {
//     console.log(`LeetCode backend running at http://localhost:${port}`);
//   });

//   try {
//     await connectDB();
//   } catch (error) {
//     console.error("Backend database connection failed:", error.message);
//   }
// };

// startServer();