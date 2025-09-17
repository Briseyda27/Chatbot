import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------
// RESPUESTAS SIMULADAS
// -------------------------
function getSimulatedReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("perro")) {
    return "🐶 Para tu perro, mantén la calma y revisa signos vitales como pulso y respiración.";
  } 
  if (msg.includes("gato")) {
    return "🐱 Para tu gato, observa su pecho y asegúrate de que respire correctamente.";
  }
  if (msg.includes("conejo")) {
    return "🐰 Mantén a tu conejo tranquilo, revisa temperatura y signos de estrés.";
  }
  if (msg.includes("loro")) {
    return "🦜 Revisa que el loro tenga jaula limpia y agua fresca, y controla su respiración.";
  }
  if (msg.includes("gallina")) {
    return "🐔 Para gallinas, observa heridas leves y aisla si hay problemas respiratorios.";
  }

  return "🤖 Lo siento, aún no tengo información sobre eso. Intenta con otro animal o pregunta más específica.";
}

// -------------------------
// ENDPOINT DEL CHATBOT
// -------------------------
app.post("/api/chat", (req, res) => {
  const userMessage = req.body.message || "";
  const reply = getSimulatedReply(userMessage);
  res.json({ reply });
});

// -------------------------
// PUERTO
// -------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
