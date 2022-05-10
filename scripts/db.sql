CREATE TABLE `usuarios` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipo_doc` ENUM('Cedula Ciudadanía', 'Nit', 'Cedula de Extranjería', 'Pasaporte', 'Pase Diplomático', 'Carnet Diplomático', 'Tarjeta de Identidad', 'Rut', 'Número único de Identificación Personal', 'Nit de Extranjería') NULL,
  `num_doc` VARCHAR(255) NULL,
  `nombre` VARCHAR(255) NULL,
  `celular` VARCHAR(45) NULL,
  `email` VARCHAR(128) NULL,
  `password` VARCHAR(64) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `codigos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NULL,
  `codigo` VARCHAR(6) NOT NULL,
  `estado` ENUM('PROCESO', 'CONFIRMADO') NULL DEFAULT 'PROCESO',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`));

