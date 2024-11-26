const studentValidator = [
    body("dni").trim().notEmpty().scape(),
    body("names").trim().notEmpty().scape(),
    body("lastname").trim().notEmpty().scape(),
    body("dateOfBirth").trim().isDate().optional(),
  ];
  
  export { studentValidator };