import {GoogleGenAI} from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const AI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const GenAI = async (prompt) => {
    try {
        const response = await AI.models.generateContent(
            {
                model: "gemini-2.5-flash",
                contents: prompt
            });

        return response;
    } catch (error) {
        console.log('Ai Failed to generate response', error)
        process.exit(1)
    }
}

export default GenAI;