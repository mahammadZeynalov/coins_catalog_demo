use coins_collection;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: coins_collection
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `coinId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (69,1,0),(70,1,1),(71,1,1),(72,1,1),(73,1,2),(74,1,3),(75,70,78),(76,70,27),(77,70,23),(78,70,20),(79,70,28),(80,70,27),(81,70,26),(82,70,28),(83,70,27);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coins`
--

DROP TABLE IF EXISTS `coins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `face_value` text NOT NULL,
  `issue_year` int NOT NULL,
  `price` int NOT NULL,
  `country` text NOT NULL,
  `metal` text NOT NULL,
  `short_description` text NOT NULL,
  `full_description` text NOT NULL,
  `quality` text NOT NULL,
  `weight` double NOT NULL,
  `image_averse` text NOT NULL,
  `image_reverse` text NOT NULL,
  `coin_type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coins`
--

LOCK TABLES `coins` WRITE;
/*!40000 ALTER TABLE `coins` DISABLE KEYS */;
INSERT INTO `coins` VALUES (0,'Looney','1 dollar',1970,65,'CANADA','Gold','Looney. Unique coin with the image of a goat. Canadian dollar symbol.\"','The reverse of the coin depicts a black goat - a symbol of Canada and an inscription divided into the lower and upper semicircle Canadian dollar.\"','BU',5.4,'Looney_1.png','Looney_2.png','memorial'),(1,'Jefferson','5 cents',1966,35,'UNITED STATES OF AMERICA','Nickel','Unique coin featuring Thomas Jefferson, the 3rd American president. Face value - 5 cents.','The obverse of the coin depicts a bust of the 3rd American president, Thomas Jefferson. The inscription on the right semicircle IN GOD WE TRUST. Below is the inscription ?FREEDOM? and the year of minting. Under the image of Jefferson was a monogram of an engraver. The initials of the engraver FS first appeared on coins in 1966.\"','BU',3.54,'Jefferson_1.png','Jefferson_2.png','memorial'),(2,'Kennedi','0.5 dollar',1963,43,'UNITED STATES OF AMERICA','Nickel','The unique coin is made in honor of the assassination of the 35th president of Texas.','On November 22, 1963, in connection with the assassination of the 35th President John F. Kennedy in Dallas (Texas), it was decided to perpetuate the memory of President Kennedy on a coin.','BU',4.3,'Kennedy_1.png','Kennedy_2.png','memorial'),(3,'Canadian Cent','1 cent',1965,8,'CANADA','Steel','Canadian cent. A unique coin with the image of maple leaves - symbols of Canada. Face value - 1 cent.\"','On May 3, 2012, the Department of the Treasury of Canada announced the cessation of production of a 1 cent coin. The latest issues of the famous 1-cent maple leaf were minted in 2012.','BU',2.7,'Canadian_Cent_1.png','Canadian_Cent_2.png','memorial'),(4,'A penny','1 cent',1793,8,'UNITED STATES OF AMERICA','Steel','A penny. A unique coin with a shield image with 13 vertical stripes\"','Minted from 1793 to the present day.','BU',5.1,'A_penny_1.png','A_penny_2.png','memorial'),(6,'Dim Sum','10 cents',1946,10,'UNITED STATES OF AMERICA','Nickel','Dim Sum is a 10-cent coin of the United States that has been minted from 1946 to the present. This is a unique coin with the image of a torch, oak and olive branches.','The obverse of the coin depicts a portrait of the 32nd President of the United States, Franklin D. Roosevelt, and the reverse depicts a torch, oak and olive branches above the motto ?E pluribus unum? - ?Out of many.?','BU',4.25,'Dim_Sum_1.png','Dim_Sum_2.png','memorial'),(7,'Canadian Beaver','5 cents',1965,40,'CANADA','Nickel','Canadian beaver\". Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.\"','In the center of the obverse is a portrait of Queen Elizabeth II, the profile is directed to the right. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is a mint mark.    In the center of the coin reverse is a Canadian beaver on a rock sticking out of the water. At the top is a semicircle with the inscription 5 cents\" between two maple leaves. At the bottom in two lines is the inscription CANADA (CANADA) and the year of minting.\"','BU',4.54,'Canadian_Beaver_1.png','Canadian_Beaver_2.png','memorial'),(8,'South Vietnamese Dong','1 dong',1955,56,'the Republic of Vietnam','Nickel','Currency of the Republic of Vietnam in 1955-1975 Coin with the image of wheat.','Currency of the Republic of Vietnam in 1955-1975.','BU',5.05,'South_Vietnamese_Dong_1.png','South_Vietnamese_Dong_2.png','invested'),(9,'The British Antelope','0.5 pound',1952,78,'British South Africa','Gold','Unique coin depicting an antelope. British South African gold coin with a face value of 1/2 pound. It has been produced since 1952.','On one side of the coin is the head of King George VI, turned to the left. Also at the top in a semicircle is the inscription GEORGIVS SEXTVS REX.','BU',6.3,'The_British_Antelope_1.png','The_British_Antelope_2.png','invested'),(10,'Stork','2 francs',1997,54,'France','Steel','Unique coin with the image of a flying stork. French coin at 2 two francs 1997.','Two francs by Georges Gynemer - a commemorative coin of two French francs, issued in 1997 in honor of the famous pilot of the First World War, Georges Gynemer, on the occasion of the 80th anniversary of the officer cross of the Legion of Honor and his death: shot down in flight by a German plane.','BU',6.57,'Stork_1.png','Stork_2.png','invested'),(11,'Gyeonggi','1 dollar',1984,97,'Australia','Gold','Gyeonggi. Coin with the image of five kangaroos - symbols of Australia.\"','The first Australian coin with a nominal value of 1 dollar was introduced on May 13, 1984 to replace a one-dollar banknote.','BU',4.76,'Gyeonggi_1.png','Gyeonggi_2.png','invested'),(12,'Bolivian Peso','1 PESO',1988,54,'Bolivia','Steel','Boliviano Coin with the image of Bolivia','By 1987, the Bolivian peso had completely depreciated and was replaced by a new boliviano during another monetary reform.','BU',3.62,'Bolivian_Peso_1.png','Bolivian_Peso_2.png','invested'),(13,'Botswana','1 thebe',1976,62,'Botswana','Steel','Botswana. Coin with the image of a bird.\"','Coin of state of Botswana 1976.','BU',4.28,'Botswana_1.png','Botswana_2.png','invested'),(14,'Virginia','5 dollars',2014,108,'British Virgin Islands','Nickel','Virginia Coin with the image of a seahorse. Coin created during the reign of Elizabeth II.','The obverse depicts Her Majesty Queen Elizabeth II. At the top of the coin is the inscription British Virgin Islands Queen Elizabeth II 2014.','BU',6.98,'Virginia_1.png','Virginia_2.png','invested'),(15,'Theobroma Cocoa','20 pesewas',1962,54,'Ghana','Steel','Coin with a lion in the center of the shield. Ghana coin, published in 1967.','The reverse depicts a runaway lion in the center of a shield divided into four parts, separating the date and the face value. The inscription at the top of the coin is TWENTY','BU',4.76,'Theobroma_Cocoa_1.png','Theobroma_Cocoa_2.png','invested'),(16,'Coin of the Weimar Republic','5 Mark',1927,142,'the Weimar Republic','Silver','The Hindenburg Coin with the coat of arms of the Weimar Republic.','On the obverse, in the center of the coin, at the top is the coat of arms of the Weimar Republic. In the center below is the coat of arms of the Hindenburg family. This is a shield divided into 4 fields - in the upper left and lower right corners there is a head of a bull.','BU',4.76,'Coin_of_the_Weimar_Republic_1.png','Coin_of_the_Weimar_Republic_2.png','invested'),(17,'Scientist','1 pound',1981,112,'Egypt','Silver','Silver Egyptian coin with the image of the god Thoth. Silver Egyptian coin.','Face value one pound. It has been produced since 1981.','BU',3.95,'Scientist_1.png','Scientist_2.png','invested'),(19,'Lion sedge','1 rupee',1975,76,'India','Steel','Indian coin with the image of a lion Ashoka. Face value 1 one rupee. 1975 edition.','It depicts the lion Ashok on his pedestal. It is surrounded by the inscription of the name of the country in two languages, meaning and date, surrounded by stylized stalks of grain.','BU',4.95,'Lion_sedge_1.png','Lion_sedge_2.png','exclusive'),(20,'Rial','5000 dinars',1928,98,'Iran','Silver','Iranian silver coin with the image of a lion. Face value 5000 five thousand dinars (5 five taps). 1928 year.','It depicts a bust of Reza Shah, whose head is turned to the right.','BU',6.12,'Rial_1.png','Rial_2.png','exclusive'),(21,'ISK','1 Icelandic krona',2007,78,'Iceland','Nickel','Icelandic coin with a picture of a fish. Face value 1 Icelandic krona','Initially, the krone consisted of 100 Eire (ISL. EYRIR, MN. CH. ISL. Aurar), but since January 1, 1995 Eire has not been used in monetary circulation.','BU',5.42,'ISK_1.png','ISK_2.png','exclusive'),(22,'Yemen','25 fils',1964,69,'Yemen','Nickel','Coin of South Arabia (Yemen) with the image of a viral boat. Coin in 25 twenty five fils.','An octagonal star with dots is depicted on one side of the coin.','BU',0.47,'Yemen_1.png','Yemen_2.png','exclusive'),(23,'Woman','1 yuan',1986,48,'China','Nickel','1 yuan Chinese coin with a picture of a woman. 1986 edition.','On one side of the coin is a woman sitting on a stone. Doves fly around her','BU',6.02,'Woman_1.png','Woman_2.png','exclusive'),(24,'Alligator','5 yuan',1998,78,'China','Nickel','Chinese coin with the image of an alligator. 5 yuan Chinese coin. 1998 edition.','It depicts a Chinese alligator on the banks of the river.','BU',7.24,'Alligator_1.png','Alligator_2.png','exclusive'),(25,'The Golden Panda','5 yuan',1993,82,'China','Nickel','Chinese coin with the image of two pandas. 5 yuan Chinese coin. 1993 edition.','On one side of the coin are two pandas. At the top of the coin are Chinese characters in an arc.','BU',7.24,'The_Golden_Panda_1.png','The_Golden_Panda_2.png','exclusive'),(26,'Costa Rica','100 columns',1974,78,'Costa Rica','Nickel','Costa - African coin with the image of manatee. Costa Rican coin of 100 columns. It has been produced since 1974.','On one side of the coin is a shield with a sailing ship in front of the mountains. Below is the release date of the coin.','BU',5.24,'Costa_Rica_1.png','Costa_Rica_2.png','exclusive'),(27,'Year of the children','100 columns',1979,72,'Costa Rica','Nickel','Costa is an African coin depicting three chicks in a nest. Costa Rican coin of 100 columns. It has been produced since 1979.','On one side of the coin are 3 chicks in a nest, symbolizing the International Year of Children.','BU',5.24,'Year_of_the_children_1.png','Year_of_the_children_2.png','exclusive'),(28,'Sailboat','5 escudos',1933,134,'Portugal','Silver','Portuguese silver coin with the image of a sailing ship.','Portuguese silver coin in 5 five escudos. It has been produced since 1933.','BU',4.4,'Sailboat_1.png','Sailboat_2.png','exclusive'),(91,'Mahammad Zeynalov','123',1234,123,'Azerbaijan','1234','123','123','213',567,'image_averse_1590428416249.png','image_reverse_1590428416271.png','567'),(92,'Mahammad Zeynalov','123',123,123,'Azerbaijan','12','123','123','213',1234,'image_averse_1590429698423.png','image_reverse_1590429698447.png','123'),(93,'Mahammad Zeynalov','123',123,123,'Azerbaijan','12','123','123','213',1234,'image_averse_1590429706776.png','image_reverse_1590429706822.png','123'),(94,'Mahammad Zeynalov','1324',213,123,'Azerbaijan','675467','1324','123','123',123,'image_averse_1590429841661.png','image_reverse_1590429841674.png','123'),(95,'Mahammad Zeynalov','1324',123,123,'Azerbaijan','12','1324','4567456','1234',567,'image_averse_1590429914066.png','image_reverse_1590429914084.png','1234'),(96,'Mahammad Zeynalov','123',1234,2213,'Azerbaijan','1234','123','123','123',1234,'image_averse_1590429969676.png','image_reverse_1590429969687.png','1234'),(97,'Mahammad Zeynalov','123',123,123,'Azerbaijan','1234','123','123','1234',1234,'image_averse_1590430066314.png','image_reverse_1590430066334.png','1234'),(98,'Mahammad Zeynalov','1324',123,2213,'Azerbaijan','12','1324','123','123',1234,'image_averse_1590430139195.png','image_reverse_1590430139207.png','567');
/*!40000 ALTER TABLE `coins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mahammad','mahammad.zeynalov1997@gmail.com','$2b$10$jCcE5w4Un20lFNvbzv/.sO.ZiE9DS/PqdHK029uxIhvvO0mbDkY6m',1),(69,'Bingo','hello@mail.ru','$2b$10$Apd1EDEJgc4SPBlqlUv6yOkEAS5x3GZXRy8KWc/ubnZNFFg/kFfD6',0),(70,'Ahmed','ahmed@gmail.com','$2b$10$F4HFzvLiieSn128hxSzXrek6WW9LAO57JlOZ4IqFHzoYh6Ems1I2e',0),(71,'Elhan','misterElhan@box.az','$2b$10$oPElK1oLLX2a2fbCyH/pDu0W1/F8wGLU.fkkVcbOlHKwvVgpQwhfO',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-25 23:47:28
