import { validationResult, matchedData } from 'express-validator';
import { VendedorService } from "../services/VendedorService.mjs";

class VendedorController {
  #vendedorService;

  constructor() {
    this.#vendedorService = new VendedorService();
  }

  createVendedor = async (req, res) => {
    
    const validated = validationResult(req);
    if (!validated.isEmpty()) {
      return res.status(400).send({ errors: validated.array() });
    }
    const { name, lastname, phone, company } = matchedData(req);
    try {
      const newVendedor = await this.#vendedorService.create({ name, lastname, phone, company });
      res.status(201).send({ message: newVendedor });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(500).send({ code: error.code, message: error.message });
      }
      res.status(500).send({ message: "Error al crear el vendedor" });
    }
  };

  updateVendedor = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, phone, company } = matchedData(req);
    try {
      const result = await this.#vendedorService.update(id, { name, lastname, phone, company });
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el vendedor" });
    }
  };

  getVendedores = async (req, res) => {
    try {
      const vendedores = await this.#vendedorService.getAll();
      res.status(200).send(vendedores);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener vendedores" });
    }
  };

  deleteVendedor = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ code: 400, message: "Perdida de alguna informacion" });
      }

    try {
      const result = await this.#vendedorService.delete(id);
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error al eliminar el vendedor" });
    }
  };
}

export { VendedorController };