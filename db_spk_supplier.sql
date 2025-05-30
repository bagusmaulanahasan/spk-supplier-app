SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Tabel criteria
CREATE TABLE `criteria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `type` enum('cost','benefit') NOT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel suppliers
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `initial` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel criteria_values (referensi ke tabel criteria)
CREATE TABLE `criteria_values` (
  `id` int NOT NULL AUTO_INCREMENT,
  `criteria_id` int NOT NULL,
  `value` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `criteria_id` (`criteria_id`),
  CONSTRAINT `criteria_values_ibfk_1` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel supplier_criteria_values (referensi ke tabel suppliers dan criteria)
CREATE TABLE `supplier_criteria_values` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `criteria_id` int NOT NULL,
  `value` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `criteria_id` (`criteria_id`),
  CONSTRAINT `supplier_criteria_values_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `supplier_criteria_values_ibfk_2` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel results (referensi ke tabel suppliers)
CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `score` decimal(10,2) NOT NULL,
  `ranking` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel users
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','kepala bagian') DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tambahkan data users dengan role 'kepala bagian'
INSERT INTO `users` (`id`, `name`, `username`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Kepala Bagian', 'kbgn', '$2b$10$W2yq0PnX/bSOaf64.Wq8IuJJENqMbpNjNHe73.U3/F1PcaO2jBRE2', 'kepala bagian', '2025-05-26 12:33:07', '2025-05-29 02:16:29');

-- Menambahkan kolom untuk jenis metarial yang disupply

CREATE TABLE material_supply_types (
  id INT NOT NULL AUTO_INCREMENT,
  type_name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Ubah tabel untuk menambahkan kolom foreign

ALTER TABLE supplier_criteria_values
  ADD COLUMN material_supply_type_id INT NULL,
  ADD CONSTRAINT fk_material_supply_type_supplier_criteria_values 
    FOREIGN KEY (material_supply_type_id)
    REFERENCES material_supply_types(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

ALTER TABLE results
  ADD COLUMN material_supply_type_id INT NULL,
  ADD CONSTRAINT fk_material_supply_type_results 
    FOREIGN KEY (material_supply_type_id)
    REFERENCES material_supply_types(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

ALTER TABLE suppliers
  ADD COLUMN material_supply_type_id INT NULL,
  ADD CONSTRAINT fk_material_supply_type_suppliers
    FOREIGN KEY (material_supply_type_id)
    REFERENCES material_supply_types(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

