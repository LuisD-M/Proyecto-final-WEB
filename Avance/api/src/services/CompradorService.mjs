import { Db } from "../config/db.mjs";
import { Comprador } from "../models/comprador.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class CompradorService {
  getAll = async () => {
    try {
      const resultados = await new Db().query("SELECT * FROM comprador");
      return resultados.rows.map(
        ({ id, name, lastname, phone, company }) =>
          new Comprador(id, name, lastname, phone, company)
      );
    } catch (error) {
      console.error("Error al listar compradores", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  create = async (comprador) => {
    try {
      const { name, lastname, phone, company } = comprador;

      await new Db().query(
        "INSERT INTO comprador (name, lastname, phone, company) VALUES ($1, $2, $3, $4)",
        [name, lastname, phone, company]
      );
      return "Comprador creado con éxito";
    } catch (error) {
      console.error("Error al crear comprador", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  update = async (id, comprador) => {
    try {
      const { name, lastname, phone, company } = comprador;

      await new Db().query(
        "UPDATE comprador SET name = $1, lastname = $2, phone = $3, company = $4 WHERE id = $5",
        [name, lastname, phone, company, id]
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

export {CompradorService};