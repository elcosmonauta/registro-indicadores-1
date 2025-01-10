const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Conectar a MongoDB Atlas
mongoose.connect("mongodb+srv://italocamposmontenegro:AFmGm2QLxK0VwO1A@cluster0.fw5de.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB Atlas");
});

// Definir el esquema para los indicadores
const IndicadorSchema = new mongoose.Schema({
  userId: String,          // Identificador único del usuario
  tiempoUso: Number,       // Tiempo total de uso (en minutos)
  fechaHora: Date,         // Fecha y hora de la interacción
  frecuencia: Number,      // Frecuencia de uso
});

// Crear el modelo para la colección "indicadores"
const Indicador = mongoose.model("Indicador", IndicadorSchema);

// Ruta principal de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Ruta para obtener todos los indicadores
app.get("/obtener-indicadores", async (req, res) => {
  try {
    const indicadores = await Indicador.find(); // Obtener todos los documentos
    res.json(indicadores); // Enviar como respuesta JSON
  } catch (error) {
    res.status(500).send("Error al obtener los indicadores");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
