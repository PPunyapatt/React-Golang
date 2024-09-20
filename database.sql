-- Create database if it does not exist
USE banking;
SET time_zone = '+00:00';

-- Table structure for `articles`
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `body` text,
  `title` varchar(100) DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert data into `articles`
INSERT INTO `articles` (`id`, `user_id`, `body`, `title`, `create_at`, `image`) VALUES
(1, 15, 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.', 'Test Title', '2024-09-13 08:10:40', ''),
(3, 15, 'The default value is only used if the size prop is missing or if you pass size={undefined}. But if you pass size={null} or size={0}, the default value will not be used.', 'Specifying a default value', '2024-09-13 08:11:11', ''),
(5, 3, 'Recently, the use of container technology for applications has become commonplace. The advantages of this technology allow you to quickly develop and implement new services and applications in any programming language. The Kubernetes platform is the most popular container orchestration tool and is widely used for application development and deployment. Kubernetes not only allows you to deploy applications, but also performs functions such as load balancing, storage organization, secret storage and much more. However, experts pay attention to possible security problems when using Kubernetes. Attackers can use application containers in Kubernetes not only to obtain data processed by the application, but also to form an entry point into the company\'s infrastructure for a subsequent attack on the company\'s internal assets. The configuration requirements of the containerization platform cannot fully protect against malicious actions from containers, so it is necessary to supplement the protection system with tools that could track actions in the container in real time. This article will compare several Kubernetes real-time cluster security solutions and show their advantages and disadvantages.', 'An Overview of Container Security in a Kubernetes Cluster', '2024-09-13 15:35:47', NULL);

-- Table structure for `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Insert data into `users`
INSERT INTO `users` (`username`, `password`, `role`, `id`) VALUES
('2000', 'abc123', 'user', 1),
('2001', 'abc123', 'user', 2),
('a', '$2a$08$6m8VA81c8V7P/f5yGO4s5eIK5Uzr98c6Ur49aVgniZrYfcp6sho6q', NULL, 3),
('admin', 'abc123', 'admin', 4),
('Kit', '1234', 'user', 5),
('kuy', 'hee', 'user', 6),
('tortamc', '4321', NULL, 8),
('test', '$2a$08$Q/Yso1AAWj3o5CWaUzbfe.nhMwCf6WPtKuoK0zxZ4bL66xWZ4NaiW', NULL, 15);
