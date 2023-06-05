-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: storage_system
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ms_items`
--

DROP TABLE IF EXISTS `ms_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ms_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) DEFAULT NULL,
  `item_type` varchar(255) DEFAULT NULL,
  `storage_id` int DEFAULT NULL,
  `item_stock` int DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_items`
--

LOCK TABLES `ms_items` WRITE;
/*!40000 ALTER TABLE `ms_items` DISABLE KEYS */;
INSERT INTO `ms_items` VALUES (1,'Hole puncher','Electronic',0,4),(2,'Stapler','Paper',0,3),(3,'Notepad','Paper',0,2),(4,'Printer ink','Consumable',0,6),(5,'Paper clip','Paper',0,7),(6,'Flashlight','Electronic',0,6),(7,'Whiteboard marker','Consumable',0,7),(8,'Printer paper','Paper',0,6),(9,'USB cable','Electronic',0,7),(10,'Glue stick','Consumable',0,7),(11,'Binder clip','Paper',0,7),(12,'Headphones','Electronic',0,0),(13,'Highlighter','Consumable',0,0),(14,'Sticky note','Paper',0,0),(15,'Power strip','Electronic',0,0),(16,'Envelopes','Paper',0,0),(17,'Batteries','Electronic',0,0),(18,'Eraser','Consumable',0,0),(19,'Binder','Paper',0,0),(20,'Hole puncher','Electronic',0,0),(21,'Kain','Consumable',0,0),(22,'Motor','Kendaraan',0,0),(23,'Test','Test',0,0);
/*!40000 ALTER TABLE `ms_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05  8:07:51
