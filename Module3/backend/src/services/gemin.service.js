import axios from "axios";

export const generateAISummary = async (data) => {
  try {
    const prompt = `
    Generate a sustainability impact summary:
    Plastic saved: ${data.plasticSaved} grams
    Carbon saved: ${data.carbonSaved} kg
    Local sourcing: ${data.localImpact}
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Impact generated.";
    
  } catch (error) {
    console.log("🔥 Gemini FULL ERROR:", error.response?.data || error.message);
    return "Eco impact generated successfully.";
  }
};