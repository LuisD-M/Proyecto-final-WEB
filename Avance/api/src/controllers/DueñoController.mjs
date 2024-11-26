import { validationResult, matchedData } from "express-validator";
import DueñoService from "../services/DueñoService.mjs";

class DueñoController {
  #dueñoService;

  constructor() {
    this.#dueñoService = new DueñoService();
  }

  createDueño = async (req, res) => {
    // Validación de los datos de entrada
    const validated = validationResult(req);
    if (!validated.isEmpty()) {
      return res.status(400).send({ errors: validated.array() });
    }

    const { name, lastname, phone } = matchedData(req);
    try {
      const message = await this.#dueñoService.create({ name, lastname, phone });
      res.status(201).send({ message });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(500).send({ code: error.code, message: error.message });
      }
      res.status(500).send({ message: "Error al crear el dueño" });
    }
  };

  updateDueño = async (req, res) => {
    const { id } = req.params;

    // Validación de los datos de entrada
    const validated = validationResult(req);
    if (!validated.isEmpty()) {
      return res.status(400).send({ errors: validated.array() });
    }

    const { name, lastname, phone } = matchedData(req);
    try {
      const result = await this.#dueñoService.update(id, { name, lastname, phone });
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el dueño" });
    }
  };

  getDueños = async (req, res) => {
    try {
      const dueños = await this.#dueñoService.getAll();
      res.status(200).send(dueños);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener dueños" });
    }
  };

  deleteDueño = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "ID del dueño no proporcionado" });
    }

    try {
      const result = await this.#dueñoService.delete(id);
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error al eliminar el dueño" });
    }
  };
}

export { DueñoController };