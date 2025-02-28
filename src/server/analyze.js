import axios from "axios";
import dotenv from "dotenv";

dotenv.config();  // Load API key from .env

const API_URL = "https://api.meaningcloud.com/sentiment-2.1";
const API_KEY = process.env.MEANINGCLOUD_API_KEY; // Get API key from .env

const analyzeNews = async (text) => {
    try {
        const response = await axios.post(
            API_URL,
            new URLSearchParams({
                key: API_KEY,
                lang: "en",
                txt: text // Pass the news article text
            }).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        // Check for MeaningCloud API errors
        if (response.data.status && response.data.status.code !== "0") {
            return {
                status: response.data.status.code,
                error: response.data.status.msg
            };
        }

        // Extract relevant data
        const { agreement, subjectivity, score_tag, confidence, irony } = response.data;

        return {
            status: 200,
            data: { agreement, subjectivity, score_tag, confidence, irony }
        };

    } catch (error) {
        // Handle API errors
        if (error.response) {
            return {
                status: error.response.status,
                error: error.response.data
            };
        } else {
            return {
                status: 500,
                error: "Internal Server Error"
            };
        }
    }
};

export { analyzeNews };
