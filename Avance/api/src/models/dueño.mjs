import { Animal } from "./animal.mjs";

class Dueno {
  constructor(id = null, name, lastname, phone = null) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.animals = new Set();
  }

  addAnimal(animal) {
    if (!(animal instanceof Animal)) {
      throw new Error("Debe ser un objeto de la clase Animal");
    }
    this.animals.add(animal);
    animal.setDueño(this);
  }

  static fromObject(obj) {
    const { id, name, lastname, phone } = obj;
    return new Dueno(id, name, lastname, phone);
  }
}

export { Dueno };