import "dotenv/config";
import cors from "cors";    
import express from "express";
import leetcodeRouter from "./routers/leetcode.router.js"


const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});



app.use("/api/leetcode", leetcodeRouter);  // Mount the leetcodeRouter at the /api/leetcode path

app.listen(port, () => {
  console.log(`LeetCode backend running at http://localhost:${port}`);
});
