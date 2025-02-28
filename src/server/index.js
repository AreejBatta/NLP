import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeNews } from "./analyze.js";

dotenv.config();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.post("/analyze", async (req, res) => {
    const { input } = req.body;

    if (!input) {
        return res.status(400).json({ error: "Missing article text" });
    }

    const analysis = await analyzeNews(input);

    if (analysis.status !== 200) {
        return res.status(analysis.status).json({ error: analysis.error });
    }

    res.json(analysis.data);
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
