import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI API Key not found. Please set VITE_GEMINI_API_KEY in .env.local");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateStoryIdea = async (genre: string, theme: string): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      You are a creative writing mentor for middle and high school film students.
      Generate a short, exciting movie logline and a brief 3-point plot outline.
      
      Genre: ${genre}
      Theme: ${theme}
      
      Keep it appropriate for a school setting (PG rating).
      Format the output clearly with "Title:", "Logline:", and "Outline:".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate story idea. Please try again.";
  } catch (error) {
    console.error("Error generating story:", error);
    return "An error occurred while connecting to the creative muse. Please check your connection or API key.";
  }
};
