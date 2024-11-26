import { Dueno } from "./dueño.mjs";

class Animal {
  constructor(id = null, name, species, dueno = null) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.dueno = dueno;  // Relación con la clase Dueño
  }

  setDueño(dueno) {
    if (!(dueno instanceof Dueno)) {
      throw new Error("Debe ser un objeto de la clase Dueño");
    }
    this.dueno = dueno;
    dueño.addAnimal(this);
  }

  static fromObject(obj) {
    const { id, name, species, dueno_id } = obj;
    return new Animal(id, name, species, dueno_id);
  }
}

export { Animal };