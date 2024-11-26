import { validationResult, matchedData } from "express-validator";
import {DuenoService} from "../services/DueñoService.mjs";

class DuenoController {
  #duenoService;

  constructor() {
    this.#duenoService = new DuenoService();
  }

  createDueno = async (req, res) => {
    
    const validated = validationResult(req);
    if (!validated.isEmpty()) {
      return res.status(400).send({ errors: validated.array() });
    }

    const { name, lastname, phone } = matchedData(req);
    try {
      const message = await this.#duenoService.create({ name, lastname, phone });
      res.status(201).send({ message });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(500).send({ code: error.code, message: error.message });
      }
      res.status(500).send({ message: "Error al crear el dueño" });
    }
  };

  updateDueno = async (req, res) => {
    const { id } = req.params;

    
    const validated = validationResult(req);
    if (!validated.isEmpty()) {
      return res.status(400).send({ errors: validated.array() });
    }

    const { name, lastname, phone } = matchedData(req);
    try {
      const result = await this.#duenoService.update(id, { name, lastname, phone });
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el dueño" });
    }
  };

  getDuenos = async (req, res) => {
    try {
      const dueños = await this.#duenoService.getAll();
      res.status(200).send(dueños);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener dueños" });
    }
  };

  deleteDueno = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "ID del dueño no proporcionado" });
    }

    try {
      const result = await this.#duenoService.delete(id);
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error al eliminar el dueño" });
    }
  };
}

export { DuenoController };