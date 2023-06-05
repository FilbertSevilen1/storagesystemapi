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
-- Table structure for table `ms_users`
--

DROP TABLE IF EXISTS `ms_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ms_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_gender` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `user_birthday` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_users`
--

LOCK TABLES `ms_users` WRITE;
/*!40000 ALTER TABLE `ms_users` DISABLE KEYS */;
INSERT INTO `ms_users` VALUES (1,'Budi','1234','Male','Admin','1990-01-01'),(2,'Sari','1234','Female','User','1995-05-15'),(3,'Wawan','1234','Male','User','1988-08-08'),(4,'Rina','1234','Female','User','1999-12-31'),(5,'Dedi','1234','Male','User','1992-03-17'),(6,'Lia','1234','Female','User','1997-07-07'),(7,'Yanto','1234','Male','User','1985-02-28'),(8,'Rani','1234','Female','User','1993-09-10'),(9,'Joko','1234','Male','User','1989-11-25'),(10,'Nina','1234','Female','User','1998-04-22'),(11,'Firman','1234','Male','User','1991-06-12'),(12,'Sinta','1234','Female','User','1996-08-23'),(13,'Bowo','1234','Male','User','1987-10-05'),(14,'Dina','1234','Female','User','1994-12-20'),(15,'Ari','1234','Male','User','1986-01-30'),(16,'Test','$2b$10$p15Q/t8k80Q3U.NPAsXsKO.qZHDqrlCjY.y7Shu0bh7gD0LaCKQ4G','Male','User','2023-05-02'),(17,'Klee','$2b$10$L.kj1OxDk35BWRAvBvnDaO/p96JJpIE8BIo8eGxCtSln6h1mw29.e','Female','User','2023-05-02'),(18,'Kaiba','$2b$10$cwtkPfot0lqOrAfOLGv7MuYg992jPcEkdhUGtlxMqA8B2vVdKSLfS','Male','User','2023-05-01'),(19,'Klee','$2b$10$xYw9ShCWJBwAJylYd3aKrewFab9uwph3NVWMc9SQJs97DtsY3w7.y','Female','User',''),(20,'Klee','$2b$10$V7ivHIm7i/JN5cShbBZAmOUn.HQsHghfCaW7QH4vp7NiFRaTQ8rKG','Female','User','2023-05-01'),(21,'Klee','$2b$10$KJucU1MiNXWEzlHJHm24lO2UzYOyvRifnPxPGmgs6kHzsANmchaqe','Female','User','2023-05-01'),(22,'Klee','$2b$10$fAWKnVxOXOAkbXuCuWNLCOFAzqjI.Vq3w64F4iOi0ahV2uU6J/Vmi','Female','User','2023-05-01'),(23,'Klee','$2b$10$ybRozhEZKeS/cJKrIKTF/ujkivv56sTyV8sSS/qSygTbNjbthV5oq','Female','User','2023-05-01'),(24,'Klee','$2b$10$REPVWR0T04YgKGjCGOcFcuMSkdV3jwk7.W3X3K9h9WhzcndT.06FK','Female','User','2023-05-01');
/*!40000 ALTER TABLE `ms_users` ENABLE KEYS */;
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
