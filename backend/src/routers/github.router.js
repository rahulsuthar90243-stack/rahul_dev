import express from "express"
import gitHubData from "../controllers/gitHub.controllers.js"

const router = express.Router();

router.get("/", gitHubData);

export default router