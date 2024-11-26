import { Db } from "../config/db.mjs";
import { Vendedor } from "../models/vendedor.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class VendedorService {
    getAll = async () => {
      try {
        const resultados = await new Db().query("SELECT * FROM vendedor");
        return resultados.rows.map(
          ({ id, nombre, especialidad, telefono }) =>
            new Vendedor(id, nombre, especialidad, telefono)
        );
      } catch (error) {
        console.error("Error al listar vendedores", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  
    create = async (vendedor) => {
      try {
        const { nombre, especialidad, telefono } = vendedor;
        await new Db().query(
          "INSERT INTO vendedor (nombre, especialidad, telefono) VALUES ($1, $2, $3)",
          [nombre, especialidad, telefono]
        );
        return "Vendedor creado con éxito";
      } catch (error) {
        console.error("Error al crear vendedor", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  
    update = async (id, vendedor) => {
      try {
        const { nombre, especialidad, telefono } = vendedor;
        await new Db().query(
          "UPDATE vendedor SET nombre = $1, especialidad = $2, telefono = $3 WHERE id = $4",
          [nombre, especialidad, telefono, id]
        );
        return "Vendedor actualizado con éxito";
      } catch (error) {
        console.error("Error al actualizar vendedor", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  
    delete = async (id) => {
      try {
        await new Db().query("DELETE FROM vendedor WHERE id = $1", [id]);
        return "Vendedor eliminado con éxito";
      } catch (error) {
        console.error("Error al eliminar vendedor", error);
        throw new CustomError(error.code, error.detail);
      }
    };
  }
  
  export default VendedorService;