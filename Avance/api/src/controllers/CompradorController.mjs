import { validationResult, matchedData } from 'express-validator';
import { CompradorService } from "../services/CompradorService.mjs";

class CompradorController {
  #compradorService;
  constructor() {
    this.#compradorService = new CompradorService();
  }

  createComprador = async (req, res) => {
    const validated = validationResult(req);
    if (!validated.isEmpty()) {
      return res.status(400).send({ errors: validated.array() });
    }

    const { name, lastname, phone, company } = matchedData(req);
    try {
      const newComprador = await this.#compradorService.create({ name, lastname, phone, company });
      res.status(201).send({ message: newComprador });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(500).send({ code: error.code, message: error.message });
      }
      res.status(500).send({ message: "Error al crear el comprador" });
    }
  };

  updateComprador = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, phone, company } = matchedData(req);

    try {
      const result = await this.#compradorService.update(id, { name, lastname, phone, company });
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el comprador" });
    }
  };

  getCompradores = async (req, res) => {
    try {
      const compradores = await this.#compradorService.getAll();
      res.status(200).send(compradores);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener compradores" });
    }
  };

  deleteComprador = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ code: 400, message: "Perdida de alguna información" });
    }

    try {
      const result = await this.#compradorService.delete(id);
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error al eliminar el comprador" });
    }
  };
}

export { CompradorController };