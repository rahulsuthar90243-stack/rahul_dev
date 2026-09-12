import { Router } from "express";
import leetcodeData from "../controllers/leetcode.controller.js";

const router = Router();

router.get("/", leetcodeData);

export default router;

