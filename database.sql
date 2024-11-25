-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for tugreats
CREATE DATABASE IF NOT EXISTS `tugreats` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `tugreats`;

-- Dumping structure for table tugreats.answers
CREATE TABLE IF NOT EXISTS `answers` (
  `ForumID` text DEFAULT NULL,
  `IDAnswer` text DEFAULT NULL,
  `answer` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.answers: ~1 rows (approximately)
INSERT INTO `answers` (`ForumID`, `IDAnswer`, `answer`) VALUES
	('263073', '6610742303', 'asd'),
	('263073', '6610742303', 'อากงมึงก็ยังจะเอาเนอะ');

-- Dumping structure for table tugreats.examresult
CREATE TABLE IF NOT EXISTS `examresult` (
  `Result_number` int(11) NOT NULL AUTO_INCREMENT,
  `ID` text DEFAULT NULL,
  `round` text DEFAULT NULL,
  `Expiration_date` date DEFAULT NULL,
  PRIMARY KEY (`Result_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.examresult: ~0 rows (approximately)
INSERT INTO `examresult` (`Result_number`, `ID`, `round`, `Expiration_date`) VALUES
	(1, '6610742303', '3/2566_RS_PT1 (กรกฎาคม 2566)', '2024-11-22');

-- Dumping structure for table tugreats.forums
CREATE TABLE IF NOT EXISTS `forums` (
  `ForumID` text DEFAULT NULL,
  `ID` text DEFAULT NULL,
  `text` text DEFAULT NULL,
  `answer` int(11) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.forums: ~2 rows (approximately)
INSERT INTO `forums` (`ForumID`, `ID`, `text`, `answer`, `likes`) VALUES
	('263073', '6610742303', 'พรุ่งนี้อากงจะมาหาผมควรเตรียมถุงยางรอไว้มั้ยครับ', 2, 12),
	('90658', '6610742303', 'CN204 ที่เธอล้อ วันนี้มันจะล่อคุณแล้ว', 0, 11);

-- Dumping structure for table tugreats.question
CREATE TABLE IF NOT EXISTS `question` (
  `Question` text DEFAULT NULL,
  `Answer` text DEFAULT NULL,
  `ShowQuestion` enum('true','false') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.question: ~11 rows (approximately)
INSERT INTO `question` (`Question`, `Answer`, `ShowQuestion`) VALUES
	('ถ้าเบรินแล้วมีกลิ่นปลาเค็ม ผมควรเอาข้าวต้มกุ๋ยมากินคู่ด้วยมั้ยครับ', 'ควรนำสารส้มมาใช้ขัดหีบ้างนะครับ', 'true'),
	('สอนเย็ดตูดหมา', '', 'false'),
	('ถ้าเอารถดูดส้วมมาดูด รูสิวที่หน้าจะเป็นยังไงครับ', 'ดูดได้ครับ แต่ควรปรับความแรงตามระดับที่เหมาะสมเพื่อบรรเทาอาการช้ำด้วยนะครับ', 'true'),
	('พรุ่งนี้ผมจะขับรถไปล่อแม่คุณ', '', 'false'),
	('หมาหน้าเซเว่นมาขอข้าวผมกิน ผมควรเอายาเบื่อไปให้มันกินคู่ด้วยมั้ยครับ', '', 'false'),
	('ถ้าห้องผมมีเอเลนเยเกอร์ มันจะแปลงร่างมั้ย', '', 'false'),
	('ผมติดเด็ก N ผมอยากจะทิ้งลูกทิ้งเมีย มีวิธีมั้ยครับ', 'สามารถเริ่มทำได้เลยครับ ให้ตามขั้นตอนของพ่อคุณเป็นตัวอย่างครับ', 'true'),
	('ถ้าเทเลอร์ล่อมิ้นจะผิดมั้ยครับ', 'ไม่ผิดครับอันนี้ผมสนับสนุนด้วยนะ เพื่อได้ค่าจ้างเป็นคนถ่ายคลิปให้ครับ', 'true'),
	('เวลาที่คนใกล้เสร็จมันจะมีเสียงอะไรออกมาหรอครับ', '', 'false'),
	('ถ้าแคมมันดำควรเริ่มจากเอากระดาษทรายมาขัดก่อนใช่มั้ยครับ', 'หากมีรอยทำที่ไม่เยอะมากควรขัดแบบเบาๆ เพื่อบัดสิ่งสกปรกออกแจกแคมของคุณ แต่หากเยอะคล้ายๆคอของพวกไอ้อ้วนความขัดแรงๆเพื่อนำออกโดยเร็วไม่งั้นจะติดถาวร', 'true');

-- Dumping structure for table tugreats.register
CREATE TABLE IF NOT EXISTS `register` (
  `Register_number` int(11) NOT NULL AUTO_INCREMENT,
  `ID` text DEFAULT NULL,
  `Examcenter` text DEFAULT NULL,
  `Date` text DEFAULT NULL,
  `Time` text DEFAULT NULL,
  `Coupon` enum('true','false') DEFAULT NULL,
  `Createat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Register_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.register: ~0 rows (approximately)
INSERT INTO `register` (`Register_number`, `ID`, `Examcenter`, `Date`, `Time`, `Coupon`, `Createat`) VALUES
	(1, '6610742303', 'รังสิต', '08/09/2567', '09:00 - 12:00 น.', 'false', '2024-09-08 02:14:14');

-- Dumping structure for table tugreats.teamleader
CREATE TABLE IF NOT EXISTS `teamleader` (
  `Result_number` text DEFAULT NULL,
  `L` text DEFAULT NULL,
  `M` text DEFAULT NULL,
  `Exempt` enum('true','false') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.teamleader: ~0 rows (approximately)
INSERT INTO `teamleader` (`Result_number`, `L`, `M`, `Exempt`) VALUES
	('1', '3', '3', 'true');

-- Dumping structure for table tugreats.tu100
CREATE TABLE IF NOT EXISTS `tu100` (
  `Result_number` text DEFAULT NULL,
  `D` text DEFAULT NULL,
  `V` text DEFAULT NULL,
  `G` text DEFAULT NULL,
  `Exempt` enum('true','false') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.tu100: ~0 rows (approximately)
INSERT INTO `tu100` (`Result_number`, `D`, `V`, `G`, `Exempt`) VALUES
	('1', '2', '2', '2', 'false');

-- Dumping structure for table tugreats.tu101
CREATE TABLE IF NOT EXISTS `tu101` (
  `Result_number` text DEFAULT NULL,
  `H` text DEFAULT NULL,
  `Z` text DEFAULT NULL,
  `Y` text DEFAULT NULL,
  `C` text DEFAULT NULL,
  `T` text DEFAULT NULL,
  `Exempt` enum('true','false') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.tu101: ~0 rows (approximately)
INSERT INTO `tu101` (`Result_number`, `H`, `Z`, `Y`, `C`, `T`, `Exempt`) VALUES
	('1', '3', '1', '1', '1', '1', 'false');

-- Dumping structure for table tugreats.tu102
CREATE TABLE IF NOT EXISTS `tu102` (
  `Result_number` text DEFAULT NULL,
  `U` text DEFAULT NULL,
  `A` text DEFAULT NULL,
  `P` text DEFAULT NULL,
  `Exempt` enum('true','false') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.tu102: ~0 rows (approximately)
INSERT INTO `tu102` (`Result_number`, `U`, `A`, `P`, `Exempt`) VALUES
	('1', '2', '2', '2', 'false');

-- Dumping structure for table tugreats.tu103
CREATE TABLE IF NOT EXISTS `tu103` (
  `Result_number` text DEFAULT NULL,
  `I` text DEFAULT NULL,
  `S` text DEFAULT NULL,
  `O` text DEFAULT NULL,
  `Exempt` enum('true','false') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.tu103: ~0 rows (approximately)
INSERT INTO `tu103` (`Result_number`, `I`, `S`, `O`, `Exempt`) VALUES
	('1', '3', '3', '3', 'true');

-- Dumping structure for table tugreats.tu106
CREATE TABLE IF NOT EXISTS `tu106` (
  `Result_number` text DEFAULT NULL,
  `R` text DEFAULT NULL,
  `B` text DEFAULT NULL,
  `W` text DEFAULT NULL,
  `E` text DEFAULT NULL,
  `Exempt` enum('true','flase') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.tu106: ~0 rows (approximately)
INSERT INTO `tu106` (`Result_number`, `R`, `B`, `W`, `E`, `Exempt`) VALUES
	('1', '3', '3', '3', '3', 'true');

-- Dumping structure for table tugreats.users
CREATE TABLE IF NOT EXISTS `users` (
  `ID` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `Coupon` enum('true','false') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table tugreats.users: ~0 rows (approximately)
INSERT INTO `users` (`ID`, `name`, `password`, `Coupon`) VALUES
	('6610742303', 'ธนวัฒน์ ภาคาพรต', 'asd', 'false'),
	('6610742071', 'อานัส กรีมละ', '555', 'true');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
