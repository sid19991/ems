-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 19, 2017 at 10:27 AM
-- Server version: 5.7.18-0ubuntu0.16.04.1
-- PHP Version: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Userlogin`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` bigint(20) NOT NULL,
  `uid` bigint(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `uid`, `type`, `time`, `date`) VALUES
(1, 24, 'start', '09:17:07', '2017-05-18'),
(2, 24, 'end', '06:26:50', '2017-05-18'),
(3, 24, 'end', '06:29:07', '2017-05-18'),
(4, 24, 'start', '06:29:09', '2017-05-18'),
(5, 24, 'end', '06:29:11', '2017-05-18'),
(6, 24, 'start', '06:29:12', '2017-05-18'),
(7, 24, 'break', '06:29:13', '2017-05-18'),
(8, 24, 'breakout', '06:29:15', '2017-05-18'),
(9, 24, 'end', '06:29:18', '2017-05-18'),
(10, 24, 'end', '06:32:30', '2017-05-18'),
(11, 24, 'start', '06:32:32', '2017-05-18'),
(12, 24, 'break', '06:32:33', '2017-05-18'),
(13, 24, 'breakout', '06:32:34', '2017-05-18'),
(14, 24, 'end', '06:32:36', '2017-05-18'),
(15, 24, 'end', '18:34:37', '2017-05-18'),
(16, 24, 'start', '18:34:39', '2017-05-18'),
(17, 24, 'break', '18:34:40', '2017-05-18'),
(18, 24, 'breakout', '18:34:41', '2017-05-18'),
(19, 24, 'end', '19:05:55', '2017-05-18'),
(20, 1, 'start', '19:05:59', '2017-05-18'),
(21, 1, 'break', '19:06:02', '2017-05-18'),
(22, 1, 'breakout', '19:06:13', '2017-05-18'),
(23, 1, 'end', '19:06:27', '2017-05-18'),
(24, 1, 'start', '19:06:28', '2017-05-18'),
(25, 1, 'break', '19:06:29', '2017-05-18'),
(26, 1, 'breakout', '19:06:30', '2017-05-18'),
(27, 24, 'start', '10:07:42', '2017-05-19'),
(28, 24, 'break', '10:07:43', '2017-05-19'),
(29, 24, 'breakout', '10:07:44', '2017-05-19'),
(30, 24, 'end', '10:07:45', '2017-05-19');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `email` text NOT NULL,
  `phone` bigint(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `firstname`, `lastname`, `email`, `phone`) VALUES
(4, 'saer', 'yuti', 'acd@sef.com', 87878787),
(5, 'sw', 'tw', 'sio@tio.com', 3434343434);

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `uid` bigint(20) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `firstname` text NOT NULL,
  `lastname` text NOT NULL,
  `email` text NOT NULL,
  `contactno` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`uid`, `username`, `password`, `firstname`, `lastname`, `email`, `contactno`) VALUES
(1, 'sid', 'sid', 'siddharth', 'pogul', 'siddharthpogul1999@gmail.com', 0),
(3, 'sdou', 'suioed', 'sio', 'yio', 'sdou@der.com', 2147483647),
(23, 'qwer', 'qweer', 'wer', 'rew', 'suioed@dos.com', 2323232323),
(24, 'serth', 'pouy', 'aqwuip', 'sweert', 'awedag@ghu.com', 2929292929);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `userinfo` (`uid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
