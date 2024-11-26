/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.8-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: videojuegos
-- ------------------------------------------------------
-- Server version	10.11.8-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito` (
  `id_carrito` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `fechaPago` int(11) DEFAULT NULL,
  `formato_Pago` int(11) DEFAULT NULL,
  `id_registroPago` int(11) DEFAULT NULL,
  `total` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_carrito`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_registroPago` (`id_registroPago`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id_registroPago`) REFERENCES `registroPago` (`id_registroPago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consola`
--

DROP TABLE IF EXISTS `consola`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consola` (
  `id_consola` int(11) NOT NULL,
  `precio` decimal(5,2) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_consola`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consola`
--

LOCK TABLES `consola` WRITE;
/*!40000 ALTER TABLE `consola` DISABLE KEYS */;
INSERT INTO `consola` VALUES
(1,299.99,'Xbox'),
(2,199.99,'PSP'),
(3,349.99,'Nintendo Switch');
/*!40000 ALTER TABLE `consola` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadoJuegos`
--

DROP TABLE IF EXISTS `estadoJuegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadoJuegos` (
  `id_carrito` int(11) NOT NULL,
  `id_juego` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id_carrito`,`id_juego`),
  KEY `id_juego` (`id_juego`),
  CONSTRAINT `estadoJuegos_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`),
  CONSTRAINT `estadoJuegos_ibfk_2` FOREIGN KEY (`id_juego`) REFERENCES `juego` (`id_juego`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadoJuegos`
--

LOCK TABLES `estadoJuegos` WRITE;
/*!40000 ALTER TABLE `estadoJuegos` DISABLE KEYS */;
/*!40000 ALTER TABLE `estadoJuegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juego`
--

DROP TABLE IF EXISTS `juego`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `juego` (
  `id_juego` int(11) NOT NULL,
  `precio_usuario` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_juego`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juego`
--

LOCK TABLES `juego` WRITE;
/*!40000 ALTER TABLE `juego` DISABLE KEYS */;
INSERT INTO `juego` VALUES
(1,49.99),
(2,59.99),
(3,39.99),
(4,69.99),
(5,54.99),
(6,49.99),
(7,39.99),
(8,69.99),
(9,59.99),
(10,64.99),
(11,79.99),
(12,49.99),
(13,69.99),
(14,54.99);
/*!40000 ALTER TABLE `juego` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegoConsola`
--

DROP TABLE IF EXISTS `juegoConsola`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `juegoConsola` (
  `id_consola` int(11) DEFAULT NULL,
  `id_juego` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `precio_real` decimal(5,2) DEFAULT NULL,
  `precio_usuario` decimal(5,2) DEFAULT NULL,
  KEY `id_consola` (`id_consola`),
  KEY `id_juego` (`id_juego`),
  CONSTRAINT `juegoConsola_ibfk_1` FOREIGN KEY (`id_consola`) REFERENCES `consola` (`id_consola`),
  CONSTRAINT `juegoConsola_ibfk_2` FOREIGN KEY (`id_juego`) REFERENCES `juego` (`id_juego`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegoConsola`
--

LOCK TABLES `juegoConsola` WRITE;
/*!40000 ALTER TABLE `juegoConsola` DISABLE KEYS */;
INSERT INTO `juegoConsola` VALUES
(1,1,5,30.00,49.00),
(1,2,5,40.00,59.99),
(1,3,5,25.00,39.99),
(1,4,5,35.00,69.99),
(1,5,5,35.00,54.99),
(2,6,5,30.00,49.99),
(2,7,5,40.00,39.99),
(2,8,5,25.00,69.99),
(2,9,5,35.00,59.99),
(2,10,5,30.00,64.99),
(3,11,5,40.00,79.99),
(3,12,5,25.00,49.99),
(3,13,5,30.00,69.99),
(3,14,5,35.00,54.99);
/*!40000 ALTER TABLE `juegoConsola` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodoPago`
--

DROP TABLE IF EXISTS `metodoPago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metodoPago` (
  `modo_pago` int(11) NOT NULL,
  `tarjeta` tinyint(1) DEFAULT NULL,
  `transferencia` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`modo_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodoPago`
--

LOCK TABLES `metodoPago` WRITE;
/*!40000 ALTER TABLE `metodoPago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodoPago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registroPago`
--

DROP TABLE IF EXISTS `registroPago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registroPago` (
  `id_registroPago` int(11) NOT NULL AUTO_INCREMENT,
  `id_pago` int(11) DEFAULT NULL,
  `modo_pago` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_registroPago`),
  KEY `modo_pago` (`modo_pago`),
  CONSTRAINT `registroPago_ibfk_1` FOREIGN KEY (`modo_pago`) REFERENCES `metodoPago` (`modo_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registroPago`
--

LOCK TABLES `registroPago` WRITE;
/*!40000 ALTER TABLE `registroPago` DISABLE KEYS */;
/*!40000 ALTER TABLE `registroPago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `rol_user_id` int(11) DEFAULT NULL,
  `rol_chef_id` int(11) DEFAULT NULL,
  KEY `rol_user_id` (`rol_user_id`),
  KEY `rol_chef_id` (`rol_chef_id`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`rol_user_id`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `roles_ibfk_2` FOREIGN KEY (`rol_chef_id`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES
(2,'MissionApolo18','cliente','$2a$10$Pz421qy/5zXgGBKHmwosBu06kkcGVUzFrMGIpbeTgc4NGJfx8OzIi','ateneagutierrez17@aragon.unam.mx'),
(3,'PoloSur','cliente','$2a$10$FsMuukSQSnjypBBVLDwVH.u6.BLYvK1y5tXW2sOVl6j4XfWBRUYU2','saasdfg@gmail.com');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 23:30:59
