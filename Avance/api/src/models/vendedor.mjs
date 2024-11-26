class Vendedor {
    constructor(id = null, name, lastname, phone = null, company = null) {
      this.id = id;
      this.name = name;
      this.lastname = lastname;
      this.phone = phone;
      this.company = company;
    }
  
    static fromObject(obj) {
      const { id, name, lastname, phone, company } = obj;
      return new Vendedor(id, name, lastname, phone, company);
    }
  }
  
  export { Vendedor };