-- MySQL dump 10.13  Distrib 5.7.24, for Win64 (x86_64)
--
-- Host: typetesterdb.mysql.database.azure.com    Database: typetest_db
-- ------------------------------------------------------
-- Server version	5.6.39.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `login_ID` int(11) NOT NULL AUTO_INCREMENT,
  `user_ID` int(11) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`login_ID`),
  KEY `FK_login_user_idx` (`user_ID`),
  CONSTRAINT `FK_login_user` FOREIGN KEY (`user_ID`) REFERENCES `user` (`user_ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `results` (
  `result_ID` int(11) NOT NULL AUTO_INCREMENT,
  `user_ID` int(11) NOT NULL,
  `date_taken` datetime NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`result_ID`),
  KEY `FK_results_user_idx` (`user_ID`),
  CONSTRAINT `FK_results_user` FOREIGN KEY (`user_ID`) REFERENCES `user` (`user_ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `top_misspelled`
--

DROP TABLE IF EXISTS `top_misspelled`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `top_misspelled` (
  `user_ID` int(11) NOT NULL,
  `word_ID` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`user_ID`,`word_ID`),
  KEY `FK_mis_word_idx` (`word_ID`),
  CONSTRAINT `FK_mis_user` FOREIGN KEY (`user_ID`) REFERENCES `user` (`user_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_mis_word` FOREIGN KEY (`word_ID`) REFERENCES `word` (`word_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `top_misspelled`
--

LOCK TABLES `top_misspelled` WRITE;
/*!40000 ALTER TABLE `top_misspelled` DISABLE KEYS */;
/*!40000 ALTER TABLE `top_misspelled` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word`
--

DROP TABLE IF EXISTS `word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `word` (
  `word_ID` int(11) NOT NULL AUTO_INCREMENT,
  `word` varchar(45) NOT NULL,
  PRIMARY KEY (`word_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word`
--

LOCK TABLES `word` WRITE;
/*!40000 ALTER TABLE `word` DISABLE KEYS */;
INSERT INTO `word` VALUES (1,'mask'),(2,'duck'),(3,'mountian'),(4,'align'),(5,'microphone'),(6,'monitor'),(7,'speak'),(8,'guitar'),(9,'trap'),(10,'olive'),(11,'return'),(12,'operate'),(13,'append'),(14,'terminate'),(15,'love'),(16,'marker'),(17,'treasure'),(18,'soil'),(19,'sensor'),(20,'electrical'),(21,'computer'),(22,'harp'),(23,'mouse'),(24,'giraffe'),(25,'bird'),(26,'mini'),(27,'blind'),(28,'continent'),(29,'ocean'),(30,'vile'),(31,'pound'),(32,'portal'),(33,'lambda'),(34,'quiet'),(35,'zero'),(36,'daze'),(37,'dazzle'),(38,'apple'),(39,'gravity'),(40,'yawn'),(41,'knew'),(42,'morose'),(43,'edible'),(44,'dance'),(45,'theatre'),(46,'acting'),(47,'market'),(48,'location'),(49,'prestige'),(50,'mellow'),(51,'mundane'),(52,'forgot'),(53,'foreman'),(54,'whip'),(55,'stone'),(56,'masonry'),(57,'brick'),(58,'aluminum'),(59,'magnetism'),(60,'drinks'),(61,'club'),(62,'concert'),(63,'leather'),(64,'jargon'),(65,'jumble'),(66,'happy'),(67,'sunshine'),(68,'shoulder'),(69,'knee'),(70,'elbow'),(71,'follicle'),(72,'rabid'),(73,'badger'),(74,'newt'),(75,'fire'),(76,'arm'),(77,'tree'),(78,'rescue'),(79,'bored'),(80,'lonely'),(81,'overwhelmed'),(82,'tired'),(83,'call'),(84,'lazy'),(85,'get'),(86,'post'),(87,'delete'),(88,'put'),(89,'heuristic'),(90,'scream'),(91,'smile'),(92,'frown'),(93,'emotion'),(94,'kinetic'),(95,'energy'),(96,'engine'),(97,'capacitor'),(98,'resistor'),(99,'program'),(100,'inductive'),(101,'hypothesis'),(102,'proof'),(103,'theory'),(104,'current'),(105,'power'),(106,'torque'),(107,'lever'),(108,'handle'),(109,'wire'),(110,'serial'),(111,'peripheral'),(112,'interface'),(113,'sync'),(114,'forrest'),(115,'ancient'),(116,'beast'),(117,'enormous'),(118,'because'),(119,'insane'),(120,'demon'),(121,'angel'),(122,'heaven'),(123,'abyss'),(124,'tunnel'),(125,'empty'),(126,'docile'),(127,'sheep'),(128,'cane'),(129,'lack'),(130,'bag'),(131,'never'),(132,'end'),(133,'income'),(134,'effort'),(135,'wooden'),(136,'objective'),(137,'cigar'),(138,'dulcimer'),(139,'snare'),(140,'fedora'),(141,'arch'),(142,'beaver'),(143,'soccer'),(144,'baseball'),(145,'lord'),(146,'kingdom'),(147,'empire'),(148,'construct'),(149,'wealth'),(150,'vast'),(151,'expansive'),(152,'metro'),(153,'train'),(154,'redemption'),(155,'bandit'),(156,'outlaw'),(157,'country'),(158,'duke'),(159,'baron');
/*!40000 ALTER TABLE `word` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-26 17:23:34
