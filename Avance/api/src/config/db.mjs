import pg from "pg";
import { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } from "./config.mjs";
const { Client } = pg;

class Db {
  #client;
  static conn;
  constructor() {
    const db_options = {
      user: DB_USER,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: DB_PORT,
    };
    this.#client = new Client(db_options);
    console.log("db client CREATEd");
  }

  static getInstance() {
    if (!Db.conn) {
      Db.conn = new Db();
    }
    return Db.conn;
  }

  get client() {
    return this.#client;
  }

  query = async (query, values = []) => {
    try {
      await this.#client.connect();
      console.log(query);
      const resultados = await this.#client.query(query, values);
      return resultados;
    } catch (err) {
      throw err;
    } finally {
      await this.#client.end();
    }
  };
}

export { Db };