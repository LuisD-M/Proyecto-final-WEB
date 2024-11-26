import { Db } from "../config/db.mjs";
import { Animal } from "../models/animal.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class AnimalService {
    getAll = async () => {
      try {
        const resultados = await new Db().query("SELECT * FROM animal");
        return resultados.rows.map(
          ({ id, nombre, tipo, edad, dueño_id }) =>
            new Animal(id, nombre, tipo, edad, dueño_id)
        );
      } catch (error) {
        console.error("Error al listar animales", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  
    create = async (animal) => {
      try {
        const { nombre, tipo, edad, dueño_id } = animal;
        await new Db().query(
          "INSERT INTO animal (nombre, tipo, edad, dueño_id) VALUES ($1, $2, $3, $4)",
          [nombre, tipo, edad, dueño_id]
        );
        return "Animal creado con éxito";
      } catch (error) {
        console.error("Error al crear animal", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  
    update = async (id, animal) => {
      try {
        const { nombre, tipo, edad, dueño_id } = animal;
        await new Db().query(
          "UPDATE animal SET nombre = $1, tipo = $2, edad = $3, dueño_id = $4 WHERE id = $5",
          [nombre, tipo, edad, dueño_id, id]
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
  
  export default AnimalService;