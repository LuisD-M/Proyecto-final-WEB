import { Db } from "../config/db.mjs";
import { Dueño } from "../models/dueño.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class DueñoService {
    getAll = async () => {
      try {
        const resultados = await new Db().query("SELECT * FROM dueño");
        return resultados.rows.map(
          ({ id, nombre, direccion, telefono }) =>
            new Dueño(id, nombre, direccion, telefono)
        );
      } catch (error) {
        console.error("Error al listar dueños", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  
    create = async (dueño) => {
      try {
        const { nombre, direccion, telefono } = dueño;
        await new Db().query(
          "INSERT INTO dueño (nombre, direccion, telefono) VALUES ($1, $2, $3)",
          [nombre, direccion, telefono]
        );
        return "Dueño creado con éxito";
      } catch (error) {
        console.error("Error al crear dueño", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  
    update = async (id, dueño) => {
      try {
        const { nombre, direccion, telefono } = dueño;
        await new Db().query(
          "UPDATE dueño SET nombre = $1, direccion = $2, telefono = $3 WHERE id = $4",
          [nombre, direccion, telefono, id]
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
  
  export default DueñoService;