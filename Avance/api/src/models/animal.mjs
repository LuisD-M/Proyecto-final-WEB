import { Dueño } from "./dueño.mjs";

class Animal {
  constructor(id = null, name, species, dueño = null) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.dueño = dueño;  // Relación con la clase Dueño
  }

  setDueño(dueño) {
    if (!(dueño instanceof Dueño)) {
      throw new Error("Debe ser un objeto de la clase Dueño");
    }
    this.dueño = dueño;
    dueño.addAnimal(this);
  }

  static fromObject(obj) {
    const { id, name, species, dueño_id } = obj;
    return new Animal(id, name, species, dueño_id);
  }
}

export { Animal };