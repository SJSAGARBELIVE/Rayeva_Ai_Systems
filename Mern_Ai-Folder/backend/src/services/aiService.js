const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateProductAI = async (description) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an AI for e-commerce.

Product description:
"${description}"

Return ONLY valid JSON:

{
  "category": "",
  "subCategory": "",
  "tags": [],
  "sustainability": []
}

Rules:
- category: Home, Fashion, Electronics, Grocery
- tags: 5-10 SEO keywords
- sustainability: plastic-free, vegan, recycled, compostable
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Clean JSON
    text = text.replace(/```json|```/g, "").trim();

    // LOGGING
    fs.appendFileSync(
      "src/logs/ai-log.txt",
      `\n\n---\nPROMPT:\n${description}\nRESPONSE:\n${text}\n`
    );

    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Error:", error.message);

    return {
      category: "Other",
      subCategory: "General",
      tags: ["eco-friendly"],
      sustainability: []
    };
  }
};

module.exports = generateProductAI;