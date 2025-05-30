-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 30, 2025 at 01:03 AM
-- Server version: 8.0.41-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_supplier_spk`
--

-- --------------------------------------------------------

--
-- Table structure for table `criteria`
--

CREATE TABLE `criteria` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `type` enum('cost','benefit') NOT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `criteria`
--

INSERT INTO `criteria` (`id`, `name`, `description`, `type`, `weight`, `created_at`, `updated_at`) VALUES
(6, 'C1', 'Tingkat Diskon', 'benefit', 0.30, '2025-05-29 03:24:49', '2025-05-29 21:11:59'),
(7, 'C2', 'Kualitas Produk', 'benefit', 0.30, '2025-05-29 03:24:49', '2025-05-29 03:24:49'),
(8, 'C3', 'Lamanya Produksi', 'cost', 0.20, '2025-05-29 04:23:20', '2025-05-29 04:23:20'),
(9, 'C4', 'Kualitas Pelayanan', 'benefit', 0.20, '2025-05-29 04:23:20', '2025-05-29 21:41:47');

-- --------------------------------------------------------

--
-- Table structure for table `criteria_values`
--

CREATE TABLE `criteria_values` (
  `id` int NOT NULL,
  `criteria_id` int NOT NULL,
  `value` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `criteria_values`
--

INSERT INTO `criteria_values` (`id`, `criteria_id`, `value`, `description`, `created_at`, `updated_at`) VALUES
(14, 6, 1, '< 5%', '2025-05-29 06:15:18', '2025-05-29 06:15:18'),
(15, 6, 2, '6% - 10%', '2025-05-29 06:43:00', '2025-05-29 06:43:00'),
(16, 6, 3, '> 10', '2025-05-29 06:43:00', '2025-05-29 06:43:00'),
(17, 7, 1, 'Banyak cacat, tidak sesuai desain', '2025-05-29 06:43:00', '2025-05-29 06:43:00'),
(18, 7, 2, 'Banyak cacat, cukup sesuai desain', '2025-05-29 17:34:00', '2025-05-29 17:34:00'),
(19, 7, 3, 'Sangat detail, sesuai desain', '2025-05-29 17:37:18', '2025-05-29 17:37:18'),
(20, 8, 1, '> 20 hari', '2025-05-29 17:37:54', '2025-05-29 17:37:54'),
(21, 8, 2, '11 - 20 hari', '2025-05-29 17:38:34', '2025-05-29 17:38:34'),
(23, 9, 1, 'Respon lambat, susah diajak diskusi', '2025-05-29 17:43:57', '2025-05-29 17:43:57'),
(24, 9, 2, 'Respon cukup cepat, kadang kurang informatif', '2025-05-29 17:44:51', '2025-05-29 17:44:51'),
(25, 8, 3, '<= 10 hari', '2025-05-29 18:10:48', '2025-05-29 18:10:48'),
(26, 9, 3, 'Cepat, komunikatif, mudah diskusi perubahan', '2025-05-29 18:32:40', '2025-05-29 18:32:40');

-- --------------------------------------------------------

--
-- Table structure for table `material_supply_types`
--

CREATE TABLE `material_supply_types` (
  `id` int NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `material_supply_types`
--

INSERT INTO `material_supply_types` (`id`, `type_name`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Stainless', 'Stainless', '2025-05-29 02:50:50', '2025-05-29 02:50:50'),
(5, 'Plano Kertas', 'Test Perhitungan SPK SAW', '2025-05-30 00:57:14', '2025-05-30 00:57:14');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int NOT NULL,
  `supplier_id` int NOT NULL,
  `score` decimal(10,2) NOT NULL,
  `ranking` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `material_supply_type_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `supplier_id`, `score`, `ranking`, `created_at`, `material_supply_type_id`) VALUES
(4, 9, 0.78, 1, '2025-05-29 22:43:33', 2),
(5, 8, 0.72, 2, '2025-05-29 22:43:33', 2),
(6, 11, 0.70, 3, '2025-05-29 22:43:33', 2),
(7, 10, 0.68, 4, '2025-05-29 22:43:33', 2),
(8, 7, 0.62, 5, '2025-05-29 22:43:33', 2),
(9, 12, 0.55, 6, '2025-05-29 22:43:33', 2),
(10, 13, 0.55, 7, '2025-05-29 22:43:33', 2),
(11, 9, 0.78, 1, '2025-05-29 22:48:19', 2),
(12, 8, 0.72, 2, '2025-05-29 22:48:19', 2),
(13, 11, 0.70, 3, '2025-05-29 22:48:19', 2),
(14, 10, 0.68, 4, '2025-05-29 22:48:19', 2),
(15, 7, 0.62, 5, '2025-05-29 22:48:19', 2),
(16, 12, 0.55, 6, '2025-05-29 22:48:19', 2),
(17, 13, 0.55, 7, '2025-05-29 22:48:19', 2);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `material_supply_type_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `created_at`, `updated_at`, `material_supply_type_id`) VALUES
(7, 'Santosa', '2025-05-29 03:16:27', '2025-05-29 05:34:37', 2),
(8, 'Nurhadi', '2025-05-29 03:16:27', '2025-05-29 05:35:12', 2),
(9, 'Dian', '2025-05-29 03:16:27', '2025-05-29 03:16:27', 2),
(10, 'Dwi', '2025-05-29 03:16:27', '2025-05-29 03:16:27', 2),
(11, 'Dadi', '2025-05-29 03:16:27', '2025-05-29 03:16:27', 2),
(12, 'Dedi', '2025-05-29 03:16:27', '2025-05-29 03:16:27', 2),
(13, 'Edo', '2025-05-29 03:16:27', '2025-05-29 03:16:27', 2);

-- --------------------------------------------------------

--
-- Table structure for table `supplier_criteria_values`
--

CREATE TABLE `supplier_criteria_values` (
  `id` int NOT NULL,
  `supplier_id` int NOT NULL,
  `criteria_id` int NOT NULL,
  `value` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `material_supply_type_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `supplier_criteria_values`
--

INSERT INTO `supplier_criteria_values` (`id`, `supplier_id`, `criteria_id`, `value`, `created_at`, `updated_at`, `material_supply_type_id`) VALUES
(16, 7, 6, 1, '2025-05-29 18:52:09', '2025-05-29 18:52:09', 2),
(17, 7, 7, 2, '2025-05-29 18:52:09', '2025-05-29 18:52:09', 2),
(18, 7, 8, 1, '2025-05-29 18:52:09', '2025-05-29 18:52:09', 2),
(19, 7, 9, 1, '2025-05-29 18:52:09', '2025-05-29 21:51:22', 2),
(20, 8, 6, 1, '2025-05-29 19:39:14', '2025-05-29 19:39:14', 2),
(21, 8, 7, 3, '2025-05-29 19:39:14', '2025-05-29 19:39:14', 2),
(22, 8, 8, 3, '2025-05-29 19:39:14', '2025-05-29 19:39:14', 2),
(23, 8, 9, 3, '2025-05-29 19:39:14', '2025-05-29 19:39:29', 2),
(32, 9, 6, 1, '2025-05-29 21:36:53', '2025-05-29 21:36:53', 2),
(33, 9, 7, 3, '2025-05-29 21:36:53', '2025-05-29 21:36:53', 2),
(34, 9, 8, 1, '2025-05-29 21:36:53', '2025-05-29 21:36:53', 2),
(35, 9, 9, 2, '2025-05-29 21:36:53', '2025-05-29 21:36:53', 2),
(36, 10, 6, 1, '2025-05-29 21:36:53', '2025-05-29 21:36:53', 2),
(37, 10, 7, 3, '2025-05-29 21:36:53', '2025-05-29 21:36:53', 2),
(38, 10, 8, 2, '2025-05-29 21:36:53', '2025-05-29 21:36:53', 2),
(39, 10, 9, 2, '2025-05-29 21:36:53', '2025-05-29 21:36:53', 2),
(52, 11, 6, 2, '2025-05-29 22:30:23', '2025-05-29 22:30:23', 2),
(53, 11, 7, 2, '2025-05-29 22:30:23', '2025-05-29 22:30:23', 2),
(54, 11, 8, 3, '2025-05-29 22:30:23', '2025-05-29 22:30:23', 2),
(55, 11, 9, 2, '2025-05-29 22:30:23', '2025-05-29 22:30:23', 2),
(56, 12, 6, 1, '2025-05-29 22:30:23', '2025-05-29 22:30:23', 2),
(57, 12, 7, 2, '2025-05-29 22:30:23', '2025-05-29 22:30:23', 2),
(58, 12, 8, 3, '2025-05-29 22:30:23', '2025-05-29 22:30:23', 2),
(59, 12, 9, 2, '2025-05-29 22:30:23', '2025-05-29 22:30:23', 2),
(80, 13, 6, 1, '2025-05-29 22:40:42', '2025-05-29 22:40:42', 2),
(81, 13, 7, 2, '2025-05-29 22:40:42', '2025-05-29 22:40:42', 2),
(82, 13, 8, 3, '2025-05-29 22:40:42', '2025-05-29 22:40:50', 2),
(83, 13, 9, 2, '2025-05-29 22:40:42', '2025-05-29 22:40:42', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','kepala bagian') DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `role`, `created_at`, `updated_at`) VALUES
(2, 'Kepala Bagian', 'kbgn', '$2b$10$W2yq0PnX/bSOaf64.Wq8IuJJENqMbpNjNHe73.U3/F1PcaO2jBRE2', 'kepala bagian', '2025-05-26 12:33:07', '2025-05-29 02:16:29'),
(3, 'Elsa Khairunisa', 'elskhr', '$2b$10$b1nFa32Yux/7V/HHX1rajOPek5yyjZhyRezL6knBH6OANTQ.nnBeu', 'admin', '2025-05-29 02:14:59', '2025-05-29 02:14:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `criteria_values`
--
ALTER TABLE `criteria_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `criteria_id` (`criteria_id`);

--
-- Indexes for table `material_supply_types`
--
ALTER TABLE `material_supply_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `fk_material_supply_type_results` (`material_supply_type_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_material_supply_type_suppliers` (`material_supply_type_id`);

--
-- Indexes for table `supplier_criteria_values`
--
ALTER TABLE `supplier_criteria_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `criteria_id` (`criteria_id`),
  ADD KEY `fk_material_supply_type_supplier_criteria_values` (`material_supply_type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `criteria_values`
--
ALTER TABLE `criteria_values`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `material_supply_types`
--
ALTER TABLE `material_supply_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `supplier_criteria_values`
--
ALTER TABLE `supplier_criteria_values`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `criteria_values`
--
ALTER TABLE `criteria_values`
  ADD CONSTRAINT `criteria_values_ibfk_1` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `fk_material_supply_type_results` FOREIGN KEY (`material_supply_type_id`) REFERENCES `material_supply_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD CONSTRAINT `fk_material_supply_type_suppliers` FOREIGN KEY (`material_supply_type_id`) REFERENCES `material_supply_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `supplier_criteria_values`
--
ALTER TABLE `supplier_criteria_values`
  ADD CONSTRAINT `fk_material_supply_type_supplier_criteria_values` FOREIGN KEY (`material_supply_type_id`) REFERENCES `material_supply_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `supplier_criteria_values_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `supplier_criteria_values_ibfk_2` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
