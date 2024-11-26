import { Db } from "../config/db.mjs";
import { Dueno } from "../models/dueño.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class DuenoService {
  getAll = async () => {
    try {
      const resultados = await new Db().query("SELECT * FROM dueno");
      return resultados.rows.map(
        ({ id, name, lastname, phone }) =>
          new Dueno(id, name, lastname, phone) 
      );
    } catch (error) {
      console.error("Error al listar dueños", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  create = async (dueno) => {
    try {
      const { name, lastname, phone } = dueno; 
      await new Db().query(
        "INSERT INTO dueno (name, lastname, phone) VALUES ($1, $2, $3)", 
        [name, lastname, phone]
      );
      return "Dueño creado con éxito";
    } catch (error) {
      console.error("Error al crear dueño", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  update = async (id, dueno) => {
    try {
      const { name, lastname, phone } = dueno;
      await new Db().query(
        "UPDATE dueno SET name = $1, lastname = $2, phone = $3 WHERE id = $4", 
        [name, lastname, phone, id]
      );
      return "Dueño actualizado con éxito";
    } catch (error) {
      console.error("Error al actualizar dueño", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  delete = async (id) => {
    try {
      await new Db().query("DELETE FROM dueno WHERE id = $1", [id]);
      return "Dueño eliminado con éxito";
    } catch (error) {
      console.error("Error al eliminar dueño", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export {DuenoService};