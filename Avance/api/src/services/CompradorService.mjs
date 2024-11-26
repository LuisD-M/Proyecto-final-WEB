import { Db } from "../config/db.mjs";
import { Comprador } from "../models/comprador.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class CompradorService {
    getAll = async () => {
      try {
        const resultados = await new Db().query("SELECT * FROM comprador");
        return resultados.rows.map(
          ({ id, nombre, direccion, telefono }) =>
            new Comprador(id, nombre, direccion, telefono)
        );
      } catch (error) {
        console.error("Error al listar compradores", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  
    create = async (comprador) => {
      try {
        const { nombre, direccion, telefono } = comprador;
        await new Db().query(
          "INSERT INTO comprador (nombre, direccion, telefono) VALUES ($1, $2, $3)",
          [nombre, direccion, telefono]
        );
        return "Comprador creado con éxito";
      } catch (error) {
        console.error("Error al crear comprador", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  
    update = async (id, comprador) => {
      try {
        const { nombre, direccion, telefono } = comprador;
        await new Db().query(
          "UPDATE comprador SET nombre = $1, direccion = $2, telefono = $3 WHERE id = $4",
          [nombre, direccion, telefono, id]
        );
        return "Comprador actualizado con éxito";
      } catch (error) {
        console.error("Error al actualizar comprador", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  
    delete = async (id) => {
      try {
        await new Db().query("DELETE FROM comprador WHERE id = $1", [id]);
        return "Comprador eliminado con éxito";
      } catch (error) {
        console.error("Error al eliminar comprador", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  }
  
  export default CompradorService;