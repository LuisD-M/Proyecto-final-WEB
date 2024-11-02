-- Estructura de tabla para la tabla admin
CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  nombres VARCHAR(25) NOT NULL,
  apellidos VARCHAR(25) NOT NULL,
  telefono INTEGER NOT NULL,
  correo VARCHAR(30) NOT NULL,
  horario TIME NOT NULL,
  password VARCHAR(120) NOT NULL
);

-- Volcado de datos para la tabla admin
INSERT INTO admin (id, nombres, apellidos, telefono, correo, horario, password) VALUES
(1, 'hola', 'hola', 32, 'hola@gmail.com', '16:21:29', '$2a$10$6.JbSz4cgddCvS8niQOV9eXAR1kmVCHUU1t3tKTNDi8dHPMQpMdnW');

-- Estructura de tabla para la tabla user
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(25) NOT NULL,
  apellidos VARCHAR(25) NOT NULL,
  telefono INTEGER NOT NULL,
  correo VARCHAR(30) NOT NULL,
  direccion VARCHAR(30) NOT NULL,
  password VARCHAR(200) NOT NULL
);

-- Volcado de datos para la tabla user
INSERT INTO "user" (id, nombre, apellidos, telefono, correo, direccion, password) VALUES
(1, 'a', 'a', 3, 'as@gam.xo', 'a', '$2a$10$t46qmxnzAjes2nlWWEVLkO/PXQY1qY8v/LDVrp0rtyemaktEzqFCm'),
(2, 'A', 'A', 2, 'ass@b', 'a', '$2a$10$EHLTdJrlTrAWs9tZywuQbusRZ58HzoXP6SH1pZh3euESP9FqKOtQK'),
(3, 'brayan', 'amaya', 312, 'brayanama987@gmail.com', 'asd', '$2a$10$.KlrDMZlcWiFB1ramEwMRuSh1pk2pOR/WJPtHmbBiQpf0sGe3miiC'),
(5, 'ba', 'sa', 312, 'ads@gmil.co', 'cr 81 c #54-22', '$2a$10$v.64mS1w5CsnjJrVxpHPPuQloF8ECCGgx.b1lzrUnEwmn5L..spOq'),
(6, 'a', 'as', 2, 'AS@g.c', 'a', '$2a$10$CNtqxiqaVMR5qJExcirOVutKNpbDboje7SFzggik9kfram.Sq4PVG');

-- Estructura de tabla para la tabla aliados
CREATE TABLE aliados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(25) NOT NULL,
  responsable VARCHAR(25) NOT NULL,
  direccion VARCHAR(30) NOT NULL,
  pedidos INTEGER NOT NULL
);

-- Estructura de tabla para la tabla productos
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  categoria VARCHAR(17) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  imagen VARCHAR(100) NOT NULL,
  precio INTEGER NOT NULL,
  color VARCHAR(20) NOT NULL,
  materiales VARCHAR(200) NOT NULL,
  medidas VARCHAR(200) NOT NULL,
  descripcion TEXT NOT NULL
);

-- Estructura de tabla para la tabla sugerencias
CREATE TABLE sugerencias (
  id SERIAL PRIMARY KEY,
  id_admin INTEGER REFERENCES admin(id),
  name_user VARCHAR(120),
  categoria VARCHAR(70),
  telefono INTEGER,
  correo_user VARCHAR(120),
  sugerencia TEXT
);

-- Estructura de tabla para la tabla carrito
CREATE TABLE carrito (
  id SERIAL PRIMARY KEY,
  id_user INTEGER NOT NULL REFERENCES "user"(id),
  id_producto INTEGER NOT NULL REFERENCES productos(id),
  id_aliado INTEGER REFERENCES aliados(id)
);

-- Estructura de tabla para la tabla creados
CREATE TABLE creados (
  id SERIAL PRIMARY KEY,
  id_user INTEGER NOT NULL REFERENCES "user"(id),
  id_admin INTEGER NOT NULL REFERENCES admin(id),
  publico CHAR(3),
  aceptado CHAR(3),
  medidas VARCHAR(30) NOT NULL,
  descripcion TEXT NOT NULL,
  precio INTEGER,
  color VARCHAR(20) NOT NULL,
  materiales VARCHAR(20) NOT NULL,
  nombre VARCHAR(20) NOT NULL
);
