
BEGIN;

INSERT INTO dueno (name, lastname, phone) VALUES
('Juan', 'Pérez', '123456789'),
('Ana', 'Gómez', '987654321'),
('Carlos', 'Martínez', '555123456'),
('Laura', 'Sánchez', '777888999'),
('José', 'Torres', '444555666');

INSERT INTO animal (name, species, dueno_id) VALUES
('Rex', 'Perro', 1),
('Tommy', 'Gato', 2),
('Bobby', 'Caballo', 3),
('Luna', 'Conejo', 4),
('Max', 'Perro', 5);

INSERT INTO vendedor (name, lastname, phone, company) VALUES
('Pedro', 'López', '1122334455', 'Granja S.A.'),
('Lucía', 'Fernández', '2233445566', 'Agropecuaria L&F'),
('Carlos', 'Alvarez', '3344556677', 'Ganadería C.A.'),
('María', 'Mendoza', '4455667788', 'Comercializadora M&M'),
('Sergio', 'Vázquez', '5566778899', 'Agroventas S.A.');

INSERT INTO comprador (name, lastname, phone, company) VALUES
('María', 'Rodríguez', '3344556677', 'Comercial R&V'),
('Luis', 'Jiménez', '4455667788', 'Distribuidora J&L'),
('Antonio', 'García', '5566778899', 'Agroexportadora A&G'),
('Sofía', 'Hernández', '6677889900', 'Alimentos S.A.'),
('Roberto', 'Ruiz', '7788990011', 'Productos del Campo');

COMMIT;