import { Db } from "../config/db.mjs";
import { Animal } from "../models/animal.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class AnimalService {
  getAll = async () => {
    try {
      const resultados = await new Db().query("SELECT * FROM animal");
      return resultados.rows.map(
        ({ id, name, species, dueno_id }) =>
          new Animal(id, name, species, dueno_id)  // Asociamos el dueño_id al animal
      );
    } catch (error) {
      console.error("Error al listar animales", error);
      throw new CustomError(error.code, error.detail);
    }
  };


  create = async (animal) => {
    try {
      const { name, species, dueno_id } = animal;

      await new Db().query(
        "INSERT INTO animal (name, species, dueño_id) VALUES ($1, $2, $3)",
        [name, species, dueno_id]
      );
      return "Animal creado con éxito";
    } catch (error) {
      console.error("Error al crear animal", error);
      throw new CustomError(error.code, error.detail);
    }
  };


  update = async (id, animal) => {
    try {
      const { name, species, dueno_id } = animal;

      await new Db().query(
        "UPDATE animal SET name = $1, species = $2, dueño_id = $3 WHERE id = $4",
        [name, species, dueno_id, id]
      );
      return "Animal actualizado con éxito";
    } catch (error) {
      console.error("Error al actualizar animal", error);
      throw new CustomError(error.code, error.detail);
    }
  };


  delete = async (id) => {
    try {
      await new Db().query("DELETE FROM animal WHERE id = $1", [id]);
      return "Animal eliminado con éxito";
    } catch (error) {
      console.error("Error al eliminar animal", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export {AnimalService};