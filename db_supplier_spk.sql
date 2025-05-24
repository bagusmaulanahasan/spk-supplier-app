-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 18, 2025 at 01:10 AM
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
(1, 'Harga', 'Harga dari produk yang ditawarkan oleh supplier', 'cost', 0.40, '2025-04-28 04:45:05', '2025-05-03 05:17:14'),
(2, 'Kualitas Produk', 'Kualitas produk yang ditawarkan oleh supplier', 'benefit', 0.30, '2025-04-28 04:45:05', '2025-05-03 05:17:14'),
(3, 'Lama Waktu Produksi', 'Lama waktu yang dibutuhkan supplier untuk memproduksi barang', 'cost', 0.20, '2025-04-28 04:45:05', '2025-05-03 05:17:14'),
(4, 'Kualitas Pelayanan', 'Kualitas pelayanan yang diberikan oleh supplier, termasuk komunikasi dan respon terhadap permintaan', 'benefit', 0.10, '2025-04-28 04:45:05', '2025-05-03 05:17:14');

-- --------------------------------------------------------

--
-- Table structure for table `criteria_values`
--

CREATE TABLE `criteria_values` (
  `id` int NOT NULL,
  `criteria_id` int NOT NULL,
  `value` int NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `criteria_values`
--

INSERT INTO `criteria_values` (`id`, `criteria_id`, `value`, `description`) VALUES
(1, 1, 5, 'Sangat Baik (Harga sangat kompetitif)'),
(2, 1, 3, 'Biasa Saja (Harga standar)'),
(3, 1, 1, 'Kurang (Harga terlalu tinggi)'),
(4, 2, 5, 'Sangat Baik (Produk berkualitas tinggi)'),
(5, 2, 3, 'Biasa Saja (Produk cukup baik, ada beberapa kekurangan)'),
(6, 2, 1, 'Kurang (Produk buruk atau banyak cacat)'),
(7, 3, 5, 'Sangat Baik (Waktu produksi cepat dan sesuai jadwal)'),
(8, 3, 3, 'Biasa Saja (Waktu produksi cukup lama)'),
(9, 3, 1, 'Kurang (Waktu produksi sangat lama atau sering terlambat)'),
(10, 4, 5, 'Sangat Baik (Pelayanan sangat cepat dan responsif)'),
(11, 4, 3, 'Biasa Saja (Pelayanan standar, tidak terlalu cepat)'),
(12, 4, 1, 'Kurang (Pelayanan buruk, tidak responsif)');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int NOT NULL,
  `supplier_id` int NOT NULL,
  `score` decimal(10,2) NOT NULL,
  `ranking` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `supplier_id`, `score`, `ranking`, `created_at`) VALUES
(81, 3, 0.86, 1, '2025-05-17 04:35:31'),
(82, 7, 0.80, 2, '2025-05-17 04:35:31'),
(83, 1, 0.74, 3, '2025-05-17 04:35:31'),
(84, 2, 0.73, 4, '2025-05-17 04:35:31'),
(85, 3, 0.86, 1, '2025-05-17 05:25:33'),
(86, 7, 0.80, 2, '2025-05-17 05:25:33'),
(87, 1, 0.74, 3, '2025-05-17 05:25:33'),
(88, 2, 0.73, 4, '2025-05-17 05:25:33'),
(89, 3, 0.86, 1, '2025-05-17 07:21:38'),
(90, 7, 0.80, 2, '2025-05-17 07:21:38'),
(91, 1, 0.74, 3, '2025-05-17 07:21:38'),
(92, 2, 0.73, 4, '2025-05-17 07:21:38'),
(93, 3, 0.86, 1, '2025-05-17 08:39:09'),
(94, 7, 0.80, 2, '2025-05-17 08:39:09'),
(95, 1, 0.74, 3, '2025-05-17 08:39:09'),
(96, 2, 0.73, 4, '2025-05-17 08:39:09'),
(97, 8, 0.76, 1, '2025-05-17 21:00:45'),
(98, 7, 0.67, 2, '2025-05-17 21:00:45'),
(99, 3, 0.66, 3, '2025-05-17 21:00:45'),
(100, 1, 0.61, 4, '2025-05-17 21:00:45'),
(101, 2, 0.59, 5, '2025-05-17 21:00:45');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int NOT NULL,
  `initial` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `initial`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Supplier A', 'PT Ahyiong', '2025-04-28 04:45:33', '2025-04-28 04:45:33'),
(2, 'Supplier B', 'PT Bintang Abadi', '2025-04-28 04:45:33', '2025-04-28 04:45:33'),
(3, 'Supplier C', 'PT Cahaya Indah', '2025-04-28 04:45:33', '2025-04-28 04:45:33'),
(7, 'Supplier D', 'PT Mulyanto Hadirin', '2025-05-17 03:23:55', '2025-05-17 03:23:55'),
(8, 'Supplier E', 'PT Cokolemon', '2025-05-17 05:50:30', '2025-05-17 05:50:30');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_criteria_values`
--

CREATE TABLE `supplier_criteria_values` (
  `id` int NOT NULL,
  `supplier_id` int NOT NULL,
  `criteria_id` int NOT NULL,
  `value` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `supplier_criteria_values`
--

INSERT INTO `supplier_criteria_values` (`id`, `supplier_id`, `criteria_id`, `value`) VALUES
(2, 1, 2, 4),
(3, 1, 3, 3),
(4, 1, 4, 5),
(5, 2, 1, 3),
(6, 2, 2, 5),
(7, 2, 3, 4),
(8, 2, 4, 3),
(9, 3, 1, 2),
(10, 3, 2, 3),
(11, 3, 3, 2),
(12, 3, 4, 4),
(16, 1, 1, 3),
(17, 7, 1, 3),
(18, 7, 2, 5),
(19, 7, 3, 3),
(20, 7, 4, 5),
(21, 8, 1, 1),
(22, 8, 2, 3),
(23, 8, 3, 5),
(24, 8, 4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('super_admin','manager','admin') DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Isnaeni Ariandi', '$2b$10$4YQAY76tKOWy1FsllIdVuOe4ISdzOd0g4RKa24m2/y2hCJEUipvuC', 'manager', '2025-05-03 09:05:44', '2025-05-03 09:05:44'),
(2, 'Elsa  Khairunisa', '$2b$10$B48NlUoD1TeqM7Cv3gJKCOC2n3N4c9.PQDGjjQyczX0lCB.t5lPrm', 'admin', '2025-05-03 11:37:21', '2025-05-03 11:37:21'),
(3, 'teronima', '$2b$10$LQ.w1/ea57k8F3qCKxrPBe98YxA/Kn.sg1INzZs5/E5MM6u5pnjFm', 'admin', '2025-05-03 11:37:47', '2025-05-17 18:03:44'),
(4, 'chitos', '$2b$10$lpFldxFXJl/mYu3QpTOLQe.hMhVKkGSjxt6xmsVn22tJdujDt2vbC', 'admin', '2025-05-17 18:10:15', '2025-05-17 18:10:15'),
(5, 'joi', '$2b$10$8R6fi7SXj6lz4ZP7y813he57jTp.Cvqp8m81ASXM3JPEct7NFhl3q', 'manager', '2025-05-17 19:30:23', '2025-05-17 19:30:23');

-- --------------------------------------------------------

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
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier_criteria_values`
--
ALTER TABLE `supplier_criteria_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `criteria_id` (`criteria_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `criteria_values`
--
ALTER TABLE `criteria_values`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `supplier_criteria_values`
--
ALTER TABLE `supplier_criteria_values`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `supplier_criteria_values`
--
ALTER TABLE `supplier_criteria_values`
  ADD CONSTRAINT `supplier_criteria_values_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `supplier_criteria_values_ibfk_2` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
