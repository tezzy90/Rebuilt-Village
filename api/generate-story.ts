import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { genre, theme } = req.body;

    if (!genre || !theme) {
        return res.status(400).json({ error: 'Genre and Theme are required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
    }

    try {
        const genAI = new GoogleGenAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are a creative writing mentor for middle and high school film students.
      Generate a short, exciting movie logline and a brief 3-point plot outline.
      
      Genre: ${genre}
      Theme: ${theme}
      
      Keep it appropriate for a school setting (PG rating).
      Format the output clearly with "Title:", "Logline:", and "Outline:".
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to generate content' });
    }
}
