-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 12, 2022 at 08:27 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id18905711_restomiam`
--

CREATE DATABASE id18905711_restomiam;
-- --------------------------------------------------------
--
-- Table structure for table `full_recette`
--
USE id18905711_restomiam;
-- --------------------------------------------------------
CREATE TABLE `full_recette` (
	`IdFullRecette` int(11) NOT NULL,
	`idIngredient` int(11) NOT NULL,
	`idRecette` int(11) NOT NULL) ENGINE = MyISAM DEFAULT CHARSET = latin1;

--
-- Dumping data for table `full_recette`
--

INSERT INTO `full_recette` (`IdFullRecette`, `idIngredient`, `idRecette`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 4, 1),
(4, 4, 1),
(5, 8, 1),
(6, 9, 1),
(7, 1, 2),
(8, 2, 2),
(9, 3, 2),
(10, 6, 2),
(12, 10, 5),
(13, 11, 5);

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `idIngredient` int(11) NOT NULL,
  `nomIngredient` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`idIngredient`, `nomIngredient`) VALUES
(1, 'oeuf'),
(2, 'beurre'),
(3, 'Crème liquide'),
(4, 'Sucre'),
(6, 'Sel'),
(8, 'Levure'),
(9, 'Cacao'),
(10, 'Eau'),
(11, 'Nutella');

-- --------------------------------------------------------

--
-- Table structure for table `recette`
--

CREATE TABLE `recette` (
  `idRecette` int(11) NOT NULL,
  `nomRecette` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `origine` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(2048) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `recette`
--

INSERT INTO `recette` (`idRecette`, `nomRecette`, `origine`, `description`) VALUES
(1, 'Café viennois', 'Autriche', '1- Montez la crème en chantilly bien ferme avec le sucre en poudre, au fouet électrique.\r\n\r\n2- Versez le café dans deux tasses.\r\n\r\n'),
(2, 'Tarte au sucre', 'Belgique', '1- Quelques heures avant de la déguster, préparez votre pâte à tarte : faites tiédir le lait dans une casserole, puis ajoutez 1 c. à soupe de sucre et la levure boulangère hors du feu, et délayez-le tout jusqu\'à obtenir un mélange homogène. Versez ensuite la farine dans un saladier, faites un puits, mettez-y le sucre restant, le sel, le beurre fondu ou ramolli et l\'oeuf.\r\n\r\n2- Amalgamez l\'ensemble de ces ingrédients les uns avec les autres en les travaillant du bout des doigts, puis ajoutez le lait, et pétrissez rapidement jusqu\'à obtenir une boule de pâte souple mais pas trop collante (au besoin, ajoutez un peu de farine).'),
(5, 'test', 'test', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(2048) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `nom`, `prenom`, `email`, `password`) VALUES
(1, 'jean', 'dupont', 'jean-dupont@mail.com', 'lahonda');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `full_recette`
--
ALTER TABLE `full_recette`
  ADD PRIMARY KEY (`IdFullRecette`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`idIngredient`);

--
-- Indexes for table `recette`
--
ALTER TABLE `recette`
  ADD PRIMARY KEY (`idRecette`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `full_recette`
--
ALTER TABLE `full_recette`
  MODIFY `IdFullRecette` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `idIngredient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `recette`
--
ALTER TABLE `recette`
  MODIFY `idRecette` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
