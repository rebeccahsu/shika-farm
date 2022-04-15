/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 8.0.28 : Database - TFD105_G6
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`TFD105_G6` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `TFD105_G6`;

/*Table structure for table `ACTIVITY` */

DROP TABLE IF EXISTS `ACTIVITY`;

CREATE TABLE `ACTIVITY` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) NOT NULL,
  `IMG` varchar(500) NOT NULL,
  `ATTENDANCE` int NOT NULL,
  `OPACITY` int NOT NULL,
  `STATE` varchar(45) NOT NULL,
  `TIME` int NOT NULL,
  `S1_START` varchar(45) NOT NULL,
  `S1_END` varchar(45) NOT NULL,
  `S2_START` varchar(45) NOT NULL,
  `S2_END` varchar(45) NOT NULL,
  `S3_START` varchar(45) NOT NULL,
  `S3_END` varchar(45) NOT NULL,
  `DESC` varchar(200) NOT NULL,
  `CATERGORY` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;

/*Data for the table `ACTIVITY` */

insert  into `ACTIVITY`(`ID`,`NAME`,`IMG`,`ATTENDANCE`,`OPACITY`,`STATE`,`TIME`,`S1_START`,`S1_END`,`S2_START`,`S2_END`,`S3_START`,`S3_END`,`DESC`,`CATERGORY`) values 
(1,'我要當牛仔','./img/activity/riding.jpg',5,10,'上架中',90,'9:30','11:00','13:00','14:30','16:30','18:00','','horse'),
(2,'小豬賽跑','./img/activity/pigrun.jpg',8,15,'上架中',30,'10:00','10:30','13:00','13:30','15:00','15:30','','pig'),
(3,'剃羊毛秀','./img/activity/fur.jpg',16,30,'上架中',30,'9:30','10:30','13:00','14:00','17:00','18:00','','sheep'),
(4,'馬術秀','./img/activity/horseshow.jpg',20,30,'已下架',60,'11:00','12:00','13:00','14:00','16:00','17:00','','horse'),
(5,'草泥馬散步秀','./img/activity/alpacawalk.jpg',6,20,'上架中',90,'10:30','11:30','13:30','14:30','15:30','16:30','','alpaca'),
(11,'DIY ㄋㄟㄋㄟ 肥皂','./img/activity/soap.jpg',0,30,'上架中',90,'09:30','11:00','13:00','14:30','16:00','17:30','喜歡洗澡嗎 ? 簡單三步驟就能讓你完成屬於自己的肥皂 ，讓Sìkha肥皂滲透你的肌膚，享受肌膚絲緞般的觸感，自用送禮兩相宜，還不快來體驗！','sheep');

/*Table structure for table `ADMIN` */

DROP TABLE IF EXISTS `ADMIN`;

CREATE TABLE `ADMIN` (
  `ID` int NOT NULL,
  `NAME` varchar(45) NOT NULL,
  `ACCOUNT` varchar(45) NOT NULL,
  `PASSWORD` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `ADMIN` */

insert  into `ADMIN`(`ID`,`NAME`,`ACCOUNT`,`PASSWORD`) values 
(1,'Andy','andy01@gmail.com','password');

/*Table structure for table `MEMBER` */

DROP TABLE IF EXISTS `MEMBER`;

CREATE TABLE `MEMBER` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(100) NOT NULL,
  `PASSWORD` varchar(16) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `PHONE` varchar(10) NOT NULL,
  `ZIPCODE` varchar(6) NOT NULL,
  `COUNTRY` varchar(6) NOT NULL,
  `DISTRICT` varchar(6) NOT NULL,
  `STREET` varchar(100) NOT NULL,
  `TOKEN` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

/*Data for the table `MEMBER` */

insert  into `MEMBER`(`ID`,`EMAIL`,`PASSWORD`,`NAME`,`PHONE`,`ZIPCODE`,`COUNTRY`,`DISTRICT`,`STREET`,`TOKEN`) values 
(19,'wang_mien@gmail.com','mm00122','王大明','0910993300','406','台中市','北屯區','祥順十街25號',NULL),
(20,'da_tou@gmail.com','datou123','蔡大頭','0988991457','115','臺北市','南港區','永吉路23號',NULL),
(21,'yellow@gmail.com','yellow5566','黃綠紅','0953677159','700','臺南市','中西區','健康路34號',NULL),
(22,'3quuuu@gmail.com','3quuu','謝蟹倪','0988173664','320','桃園市','中壢區','嘉善街35號',NULL),
(23,'white111@gmail.com','a_white','陳阿白','0931122566','265','宜蘭縣','羅東鎮','羅莊街5號',NULL),
(24,'flower666@gmail.com','flower66','林阿花','0927554880','635','雲林縣','東勢鄉','嘉芳南路30號',NULL),
(25,'cc1122356@gmail.com','cc1122','蕭西西','0927554880','356','苗栗縣','後龍鎮','豐富七街25號',NULL),
(26,'angry777@gmail.com','angry777','沈戚戚','0987487487','206','基隆市','七堵區','綠葉街33號',NULL),
(27,'good007@gmail.com','good007','高波羅','0954874874','821','高雄市','路竹區','延平路28號',NULL);

/*Table structure for table `NEWS` */

DROP TABLE IF EXISTS `NEWS`;

CREATE TABLE `NEWS` (
  `ID` int NOT NULL,
  `ADMIN_ID` int NOT NULL,
  `TITLE` varchar(45) NOT NULL,
  `DESCRIPTION` varchar(500) NOT NULL,
  `DATE` date NOT NULL,
  `IMG` varchar(500) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_NEWS_ADMIN_ID_idx` (`ADMIN_ID`),
  CONSTRAINT `FK_NEWS_ADMIN_ID` FOREIGN KEY (`ADMIN_ID`) REFERENCES `ADMIN` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `NEWS` */

insert  into `NEWS`(`ID`,`ADMIN_ID`,`TITLE`,`DESCRIPTION`,`DATE`,`IMG`) values 
(1,1,'歡慶兒童節 帶小孩來牧場放電囉','text','2022-03-15','./img/news/Rectangle 196.png'),
(2,1,'你我一起防疫大作戰','text','2022-03-12','./img/news/Rectangle 1964.png'),
(3,1,'2022春節營運時間及票價優惠','text','2022-01-27','./img/news/Rectangle 1966.png');

/*Table structure for table `ORDER` */

DROP TABLE IF EXISTS `ORDER`;

CREATE TABLE `ORDER` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `MEMBER_ID` int NOT NULL,
  `ORDER_DATE` date NOT NULL,
  `TOTAL` int NOT NULL,
  `PAYMENT` varchar(45) NOT NULL,
  `PAYMENT_STATE` varchar(45) NOT NULL,
  `RECEIVER_ADDRESS` varchar(45) NOT NULL,
  `RECEIVER_NAME` varchar(45) NOT NULL,
  `RECEIVER_PHONE` varchar(45) NOT NULL,
  `LOGISTICS_STATE` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ORDER_CUSTOMER_ID_idx` (`MEMBER_ID`),
  CONSTRAINT `FK_ORDER_MEMBER_ID` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `ORDER` */

/*Table structure for table `ORDER_DETAIL` */

DROP TABLE IF EXISTS `ORDER_DETAIL`;

CREATE TABLE `ORDER_DETAIL` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `PRODUCT_ID` int NOT NULL,
  `ORDER_ID` int NOT NULL,
  `QUANTITY` int NOT NULL,
  `UNIT_PRICE` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ORDER_DETAIL_ORDER_ID_idx` (`ORDER_ID`),
  KEY `FK_ORDER_DETAIL_PRODUCT_ID_idx` (`PRODUCT_ID`),
  CONSTRAINT `FK_ORDER_DETAIL_ORDER_ID` FOREIGN KEY (`ORDER_ID`) REFERENCES `ORDER` (`ID`),
  CONSTRAINT `FK_ORDER_DETAIL_PRODUCT_ID` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `PRODUCT` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `ORDER_DETAIL` */

/*Table structure for table `PRODUCT` */

DROP TABLE IF EXISTS `PRODUCT`;

CREATE TABLE `PRODUCT` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) NOT NULL,
  `COST` int NOT NULL,
  `UNIT_PRICE` int NOT NULL,
  `STOCK` int NOT NULL,
  `PRODUCT_CATEGORY_ID` int NOT NULL,
  `STATE` varchar(5) NOT NULL,
  `UPDATE` datetime NOT NULL,
  `MAIN_PIC` varbinary(1000) NOT NULL,
  `SLOGAN` varchar(60) NOT NULL,
  `DETAIL` varchar(300) NOT NULL,
  `DESCRIPTION` json NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_PRODUCT_PRODUCT_CATEGORY_ID_idx` (`PRODUCT_CATEGORY_ID`),
  CONSTRAINT `FK_PRODUCT_PRODUCT_CATEGORY_ID` FOREIGN KEY (`PRODUCT_CATEGORY_ID`) REFERENCES `PRODUCT_CATEGORY` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

/*Data for the table `PRODUCT` */

insert  into `PRODUCT`(`ID`,`NAME`,`COST`,`UNIT_PRICE`,`STOCK`,`PRODUCT_CATEGORY_ID`,`STATE`,`UPDATE`,`MAIN_PIC`,`SLOGAN`,`DETAIL`,`DESCRIPTION`) values 
(7,'草莓牛奶(六入組)',100,299,30,1,'未上架','2022-04-14 10:07:41','[\"./img/products/strawberry_1200.jpg\",\"./img/products/berry2_1200.jpg\",\"./img/products/berry2_1200.jpg\"]','[原果新鮮草莓牛奶,全部手工現做果汁現煮]','．成分：生乳、水、糖、草莓汁\n．保存期限：冷藏14天','[{\"src\": \"./img/products/cow_1200.jpg\", \"text\": \"放牧牛\"}, {\"src\": \"./img/products/cow_1200.jpg\", \"text\": \"不受拘束\"}]'),
(8,'草莓牛奶(十入組)',100,499,20,1,'未上架','2022-04-14 10:07:41','[\"./img/products/strawberry_1200.jpg\",\"./img/products/berry2_1200.jpg\",\"./img/products/berry2_1200.jpg\"]','[原果新鮮草莓牛奶,全部手工現做果汁現煮]','．成分：生乳、水、糖、草莓汁\n．保存期限：冷藏14天','[{\"src\": \"./img/products/cow_1200.jpg\", \"text\": \"放牧牛\"}, {\"src\": \"./img/products/cow_1200.jpg\", \"text\": \"不受拘束\"}]'),
(9,'鮮奶酪',120,399,30,1,'未上架','2022-04-14 10:07:41','[\"./img/products/panna_cotta.jpg\"]','[\"香濃不甜膩\",\"配新鮮水果好好吃\"]','．成分：生乳、水、糖、海藻抽取物．保存期限：冷藏14天','[{\"src\": \"./img/products/panna_cotta.jpg\", \"text\": \"小朋友與大朋友的最愛\"}, {\"src\": \"./img/products/berry_1200.jpg\", \"text\": \"當季限定！新鮮草莓在裡面！\"}]'),
(10,'羊毛毯（黃）',200,549,10,2,'未上架','2022-04-14 10:07:54','[\"./img/products/blanket_y.jpg\"]','[\"天然羊毛製成\",\"MIT染色最安心\"]','．成分：羊毛100%\n．保存期限：10年','[{\"src\": \"./img/products/blanket_y2.jpg\", \"text\": \"追劇耍廢神器\"}, {\"src\": \"./img/products/sheep2_1200.jpg\", \"text\": \"原料來自本牧場的快樂羊咩咩\"}]');

/*Table structure for table `PRODUCT_CATEGORY` */

DROP TABLE IF EXISTS `PRODUCT_CATEGORY`;

CREATE TABLE `PRODUCT_CATEGORY` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `PRODUCT_CATEGORY` */

insert  into `PRODUCT_CATEGORY`(`ID`,`NAME`) values 
(1,'冷凍冷藏'),
(2,'日常用品');

/*Table structure for table `RESERVATION` */

DROP TABLE IF EXISTS `RESERVATION`;

CREATE TABLE `RESERVATION` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ACTIVITY_ID` int NOT NULL,
  `MEMBER_ID` int NOT NULL,
  `DATE` date NOT NULL,
  `TIME` varchar(45) NOT NULL,
  `ATTENDANCE` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_RESERVATION_MEMBER_ID_idx` (`MEMBER_ID`),
  KEY `FK_RESERVATION_ACTIVITY_ID_idx` (`ACTIVITY_ID`),
  CONSTRAINT `FK_RESERVATION_ACTIVITY_ID` FOREIGN KEY (`ACTIVITY_ID`) REFERENCES `ACTIVITY` (`ID`),
  CONSTRAINT `FK_RESERVATION_MEMBER_ID` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `RESERVATION` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
