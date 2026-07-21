import { GoogleGenAI } from "@google/genai";

const AI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GenAI = async (prompt) => {
    try {
        const response = await AI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response;
    } catch (error) {
        console.error("AI Failed to generate response:", error);
        throw error;
    }
};

export default GenAI;