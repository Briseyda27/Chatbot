import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Clave de OpenAI desde Render (variable de entorno)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Ruta del chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Eres un asistente experto en mascotas que da consejos de emergencias." },
          { role: "user", content: userMessage }
        ],
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Error al conectar con la IA:", error);
    res.status(500).json({ reply: "Hubo un error al conectar con la IA." });
  }
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
