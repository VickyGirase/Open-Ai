import dotenv from "dotenv";
dotenv.config();

import express from "express";

import bodyParser from "body-parser";


import { createTemplateWithAI } from "./openai.js";
 
 
const app = express();

app.use(bodyParser.json());
 
app.post("/create-template", async (req, res) => {

  try {

    const { paragraph } = req.body;
 
    if (!paragraph || paragraph.trim() === "") {

      return res.status(400).json({ error: "Paragraph is required" });

    }
 
    const template = await createTemplateWithAI(paragraph);
 
    res.json({

      success: true,

      template

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({ error: "AI generation failed" });

  }

});
 
app.listen(3000, () => {

  console.log("🚀 Backend running on http://localhost:3000");

});

 