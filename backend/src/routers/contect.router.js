import express from "express";
import { contectModel } from "../models/contect_model.js";

const router = express.Router();

router.get("/", async (req, res) => {
   try {
    const conectData = await contectModel.find();
    res.json(conectData);
   } catch (error) {
    console.log("Data fetch error", error);
    res.status(500).json({ message: "Data fetch error" });
   }
    
})

router.post("/", async (req, res) => {
  try {
    const { name, email, service, budget, message } = req.body;
        const conectData = await contectModel.create({
        name, 
        email,
        service,
        budget,
        message,
    })
    res.status(200).json({
        success: true,
        message: "conect saved successfully",
        Data: conectData
    })
        
    } catch (error) {
        console.log("conect save error", error);
        res.status(400).json({
            message: `Conect save error ${error}`
        })
    }
})


export default router