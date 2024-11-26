import { Db } from "../config/db.mjs";
import { Vendedor } from "../models/vendedor.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class VendedorService {
  getAll = async () => {
    try {
      const resultados = await new Db().query("SELECT * FROM vendedor");
      return resultados.rows.map(
        ({ id, name, lastname, phone, company }) =>
          new Vendedor(id, name, lastname, phone, company)
      );
    } catch (error) {
      console.error("Error al listar vendedores", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  create = async (vendedor) => {
    try {
      const { name, lastname, phone, company } = vendedor;
      await new Db().query(
        "INSERT INTO vendedor (name, lastname, phone, company) VALUES ($1, $2, $3, $4)",
        [name, lastname, phone, company]
      );
      return "Vendedor creado con éxito";
    } catch (error) {
      console.error("Error al crear vendedor", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  update = async (id, vendedor) => {
    try {
      const { name, lastname, phone, company } = vendedor;
      await new Db().query(
        "UPDATE vendedor SET name = $1, lastname = $2, phone = $3, company = $4 WHERE id = $5",
        [name, lastname, phone, company, id]
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

export {VendedorService};