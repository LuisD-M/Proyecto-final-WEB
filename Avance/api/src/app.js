import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";

import { setContentType } from "./middlewares/middleware.mjs";

import {AnimalRoutes} from "./routes/AnimalRoutes.mjs";
import {CompradorRoutes} from "./routes/CompradorRoutes.mjs";
import {DuenoRoutes} from "./routes/DueñoRoutes.mjs";
import {VendedorRoutes} from "./routes/VendedorRoutes.mjs";

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Comercio animales",
      description: "backend",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.mjs"],
};

const spec = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

app.get("/api-docs.json", (req, res) => {
  res.send(spec);
});

app.use(express.json());
app.use(setContentType);

const animalRoutes = new AnimalRoutes();
const compradorRoutes = new CompradorRoutes();
const duenoRoutes = new DuenoRoutes();
const vendedorRoutes = new VendedorRoutes();


app.use("/animal", animalRoutes.router);
app.use("/comprador", compradorRoutes.router);
app.use("/dueno", duenoRoutes.router);
app.use("/vendedor", vendedorRoutes.router);

app.all("*", (req, res) => {
  res.status(404).send(JSON.stringify({ message: "invalid path" }));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});