import { validationResult, matchedData } from 'express-validator';
import { AnimalService } from "../services/AnimalService.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class AnimalController {
  #animalService;
  constructor() {
    this.#animalService = new AnimalService();
  }

  createAnimal = async (req, res) => {
    const validated = validationResult(req);
    if (!validated.isEmpty()) {
      return res.status(400).send({ errors: validated.array() });
    }

    const { name, species, dueño_id } = matchedData(req);
    try {
      const newAnimal = await this.#animalService.create({ name, species, dueño_id });
      res.status(201).send({ message: newAnimal });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(500).send({ code: error.code, message: error.message });
      }
      res.status(500).send({ message: "Error al crear el animal" });
    }
  };

  updateAnimal = async (req, res) => {
    const { id } = req.params;
    const { name, species, dueño_id } = matchedData(req);

    try {
      const result = await this.#animalService.update(id, { name, species, dueño_id });
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el animal" });
    }
  };

  getAnimals = async (req, res) => {
    try {
      const animals = await this.#animalService.getAll();
      res.status(200).send(animals);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener los animales" });
    }
  };

  deleteAnimal = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ code: 400, message: "Perdida de alguna información" });
    }
    try {
      const result = await this.#animalService.delete(id);
      res.status(200).send({ message: result });
    } catch (error) {
      res.status(500).send({ message: "Error al eliminar el animal" });
    }
  };
}

export { AnimalController };