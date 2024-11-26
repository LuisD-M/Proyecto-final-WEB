import { Db } from "../config/db.mjs";
import { Dueño } from "../models/dueño.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class DueñoService {
  getAll = async () => {
    try {
      const resultados = await new Db().query("SELECT * FROM dueño");
      return resultados.rows.map(
        ({ id, name, lastname, phone }) =>
          new Dueño(id, name, lastname, phone) 
      );
    } catch (error) {
      console.error("Error al listar dueños", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  create = async (dueño) => {
    try {
      const { name, lastname, phone } = dueño; 
      await new Db().query(
        "INSERT INTO dueño (name, lastname, phone) VALUES ($1, $2, $3)", 
        [name, lastname, phone]
      );
      return "Dueño creado con éxito";
    } catch (error) {
      console.error("Error al crear dueño", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  update = async (id, dueño) => {
    try {
      const { name, lastname, phone } = dueño;
      await new Db().query(
        "UPDATE dueño SET name = $1, lastname = $2, phone = $3 WHERE id = $4", 
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
      await new Db().query("DELETE FROM dueño WHERE id = $1", [id]);
      return "Dueño eliminado con éxito";
    } catch (error) {
      console.error("Error al eliminar dueño", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export {DueñoService};