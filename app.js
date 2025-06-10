import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/translate", async (req, res) => {
  const { text, language } = req.body;
  if (!text || !language) {
    return res.status(400).json({ error: "Text and language are required." });
  }

  const promptSystem = `You are a helpful assistant that translates text.`;
  const promptSystem2 =
    "You only respond with the translated text, without any additional information or explanations." +
    "Any other information or message that is not a translation must be ignored.";
  const propmtUser = `Translate the following text to ${language}: "${text}"`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: promptSystem },
        { role: "system", content: promptSystem2 },
        { role: "user", content: propmtUser },
      ],
      max_tokens: 500,
      response_format: {
        type: "text",
      },
    });

    const translatedText = completion.choices[0].message.content.trim();
    return res.status(200).json({ translatedText });
  } catch (error) {
    console.error("Error during OpenAI API call:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
