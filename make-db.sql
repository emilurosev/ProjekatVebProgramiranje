-- MySQL dump 10.16  Distrib 10.1.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: real_estates
-- ------------------------------------------------------
-- Server version	10.1.38-MariaDB-0+deb9u1

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
-- Table structure for table `realestate`
--

DROP TABLE IF EXISTS `realestate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `realestate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `price` text NOT NULL,
  `other_info` longtext,
  `image_src` text,
  `location` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `realestate_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate`
--

LOCK TABLES `realestate` WRITE;
/*!40000 ALTER TABLE `realestate` DISABLE KEYS */;
INSERT INTO `realestate` VALUES (1,1,'Stan na Detelinari 1','50.000€','Lorem ipsum dolor sit amet, mazim fabulas similique sea no, at consul recusabo eum. Affert volumus assentior id his. An veri latine antiopam quo, ex offendit referrentur est. Nam platonem vulputate scribentur ad. Duo scaevola repudiandae in, eu qui nonumes noluisse philosophia. Eu nec posse persecuti, has quis affert indoctum te.','images/stan_na_detelinari_1.png','Detelinara, Novi Sad'),(2,1,'Stan na Limanu 1','60.000€','Lorem ipsum dolor sit amet, mazim fabulas similique sea no, at consul recusabo eum. Affert volumus assentior id his. An veri latine antiopam quo, ex offendit referrentur est. Nam platonem vulputate scribentur ad. Duo scaevola repudiandae in, eu qui nonumes noluisse philosophia. Eu nec posse persecuti, has quis affert indoctum te.','images/stan_na_limanu_1.png','Liman, Novi Sad'),(3,2,'Kuca na Sajmistu 1','70.000€','Lorem ipsum dolor sit amet, mazim fabulas similique sea no, at consul recusabo eum. Affert volumus assentior id his. An veri latine antiopam quo, ex offendit referrentur est. Nam platonem vulputate scribentur ad. Duo scaevola repudiandae in, eu qui nonumes noluisse philosophia. Eu nec posse persecuti, has quis affert indoctum te. \nLorem ipsum dolor sit amet, mazim fabulas similique sea no, at consul recusabo eum. Affert volumus assentior id his. An veri latine antiopam quo, ex offendit referrentur est. Nam platonem vulputate scribentur ad. Duo scaevola repudiandae in, eu qui nonumes noluisse philosophia. Eu nec posse persecuti, has quis affert indoctum te.','images/kuca_na_sajmistu_1.png','Sajmiste, Novi Sad'),(4,3,'Stan na Grbavici 1','73.000€','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','images/stan_na_grbavici_1.png','Grbavica, Novi Sad'),(5,2,'Kuca na Telepu 1','100.000€','Lorem ipsum dolor sit amet, mazim fabulas similique sea no, at consul recusabo eum. Affert volumus assentior id his. An veri latine antiopam quo, ex offendit referrentur est. Nam platonem vulputate scribentur ad. Duo scaevola repudiandae in, eu qui nonumes noluisse philosophia. Eu nec posse persecuti, has quis affert indoctum te.','/images/kuca_na_telepu_1.png','Telep, Novi Sad');
/*!40000 ALTER TABLE `realestate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(15) NOT NULL,
  `passw` varchar(15) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Petrovic','Petar','petar.petrovic@gmail.com','perap','12345','admin'),(2,'Jovanovic','Jovan','jovan.jovanovic@gmail.com','jovanjo','blablabla','user'),(3,'Nikolic','Jelena','jelena.nikolic22@yahoo.com','jelenan','caocao','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-29 13:16:47
