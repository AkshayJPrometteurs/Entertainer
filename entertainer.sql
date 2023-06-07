-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2023 at 03:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `entertainer`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_shows_details`
--

CREATE TABLE `all_shows_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shows_type` varchar(255) DEFAULT NULL,
  `shows_name` varchar(255) DEFAULT NULL,
  `shows_slug` varchar(255) DEFAULT NULL,
  `shows_image` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_slug` varchar(255) DEFAULT NULL,
  `show_on_user_page` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `category_slug`, `show_on_user_page`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Movies', 'movies', 'yes', 'active', '2023-05-09 03:20:57', '2023-05-09 03:20:57'),
(2, 'TV Shows', 'tv-shows', 'yes', 'active', '2023-05-09 03:21:28', '2023-05-09 03:21:28'),
(3, 'Sports', 'sports', 'yes', 'active', '2023-05-09 03:21:58', '2023-05-09 03:21:58'),
(4, 'Web Series', 'web-series', 'yes', 'active', '2023-06-06 00:56:12', '2023-06-06 00:56:12');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(7, '2023_05_09_070233_create_categories_table', 2),
(9, '2023_05_11_054108_create_sub_categories_table', 4),
(11, '2023_05_10_060029_create_videos_table', 5),
(12, '2023_05_11_113757_create_watchlists_table', 6),
(13, '2023_06_03_143758_create_plan_details_table', 7),
(14, '2023_06_03_145718_create_plan_details_table', 8),
(15, '2023_06_04_140346_create_video_languages_table', 9),
(16, '2023_06_04_145405_create_t_v_channels_table', 10),
(17, '2023_06_05_090530_create_t_v_shows_table', 11),
(18, '2023_06_07_121048_create_all_shows_details_table', 12);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(8, 'App\\Models\\User', 3, 'signup', '993dc9e60a734978c0c7e232e2dbffc685b529e700722a299ad7d9fe24967062', '[\"*\"]', NULL, NULL, '2023-06-03 12:29:34', '2023-06-03 12:29:34'),
(9, 'App\\Models\\User', 4, 'signup', 'bf726f27110707f4915815fccb4b50303ee34c8036ae5937eb3fb1a3c8152278', '[\"*\"]', NULL, NULL, '2023-06-03 12:34:38', '2023-06-03 12:34:38'),
(10, 'App\\Models\\User', 4, 'signin', '02dba7bf477045b616bbe8dce42298cf896bcc5d88001ab4cbc8dfbcac503fd7', '[\"*\"]', '2023-06-04 10:06:03', NULL, '2023-06-03 12:37:08', '2023-06-04 10:06:03'),
(11, 'App\\Models\\User', 1, 'admin-login', 'b5b0d4bb0718d3da48cdaae54691177a42893bd91819973b2114c117fce0ed39', '[\"*\"]', '2023-06-04 10:09:28', NULL, '2023-06-04 00:46:56', '2023-06-04 10:09:28'),
(12, 'App\\Models\\User', 2, 'signin', '8674bd8eb72c1f52064b08ef717b8cc18bd7940fa677bb5118e2aabcd57a4f93', '[\"*\"]', '2023-06-07 07:20:50', NULL, '2023-06-05 00:51:00', '2023-06-07 07:20:50'),
(13, 'App\\Models\\User', 1, 'admin-login', '023e9e86c62a0a83ebe28508f313c831941a6f5fbd9055a7d25a762541ebc304', '[\"*\"]', '2023-06-07 07:20:52', NULL, '2023-06-05 01:35:36', '2023-06-07 07:20:52');

-- --------------------------------------------------------

--
-- Table structure for table `plan_details`
--

CREATE TABLE `plan_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `plan_name` varchar(255) DEFAULT NULL,
  `plan_validity` varchar(255) DEFAULT NULL,
  `plan_expired_on` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `plan_details`
--

INSERT INTO `plan_details` (`id`, `user_id`, `plan_name`, `plan_validity`, `plan_expired_on`, `created_at`, `updated_at`) VALUES
(1, 4, 'premium', '4Year', '4 June 2027, 11:31:09 AM', '2023-06-03 12:34:38', '2023-06-04 00:31:12');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `sub_category_name` varchar(255) DEFAULT NULL,
  `sub_category_slug` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `category`, `sub_category_name`, `sub_category_slug`, `icon`, `status`, `created_at`, `updated_at`) VALUES
(1, '3', 'Cricket', 'cricket', NULL, 'active', '2023-05-11 00:23:11', '2023-05-11 00:23:11'),
(2, '3', 'Vollyball', 'vollyball', NULL, 'active', '2023-05-11 00:23:44', '2023-05-11 00:23:44'),
(3, '3', 'Football', 'football', NULL, 'active', '2023-05-11 00:23:57', '2023-05-11 00:23:57'),
(4, '3', 'Basketball', 'basketball', NULL, 'active', '2023-05-11 00:24:14', '2023-05-11 00:24:14'),
(5, '3', 'Kabaddi', 'kabaddi', NULL, 'active', '2023-05-11 00:24:36', '2023-05-11 00:24:36'),
(6, '1', 'Drama', 'drama', NULL, 'active', '2023-05-11 01:26:57', '2023-05-11 01:26:57'),
(7, '3', 'Tennis', 'tennis', NULL, 'active', '2023-05-31 00:33:54', '2023-05-31 00:33:54'),
(8, '3', 'Hockey', 'hockey', NULL, 'active', '2023-05-31 00:38:48', '2023-05-31 00:38:48'),
(9, '3', 'Rugby', 'rugby', NULL, 'active', '2023-05-31 00:39:24', '2023-05-31 00:39:24'),
(11, '3', 'test', 'test', 'IconName_1141344267.ico', 'active', '2023-05-31 00:59:11', '2023-05-31 00:59:11'),
(12, '1', 'Action', 'action', 'IconName_8115961462.ico', 'active', '2023-05-31 03:53:50', '2023-05-31 03:53:50'),
(13, '2', 'Drama', 'drama', 'IconName_7956244081.jpg', 'active', '2023-06-04 00:49:48', '2023-06-04 00:49:48'),
(14, '2', 'Comedy', 'comedy', 'IconName_3403607822.jpg', 'active', '2023-06-04 00:50:04', '2023-06-04 00:50:04'),
(15, '2', 'Crime', 'crime', 'IconName_4305195308.jpg', 'active', '2023-06-04 00:56:57', '2023-06-04 00:56:57'),
(16, '4', 'Drama', 'drama', 'IconName_4148594961.jpg', 'active', '2023-06-06 05:44:33', '2023-06-06 05:44:33'),
(17, '4', 'Comedy', 'comedy', 'IconName_3608329736.jpg', 'active', '2023-06-06 05:45:06', '2023-06-06 05:45:06'),
(18, '4', 'Thriller', 'thriller', 'IconName_1140125646.jpg', 'active', '2023-06-06 05:45:22', '2023-06-06 05:45:22'),
(19, '4', 'Mystery', 'mystery', 'IconName_8615819727.jpg', 'active', '2023-06-06 05:46:08', '2023-06-06 05:46:08'),
(20, '4', 'Horror', 'horror', 'IconName_3331045377.jpg', 'active', '2023-06-06 05:46:22', '2023-06-06 05:46:22'),
(21, '4', 'Sci-Fi', 'sci-fi', 'IconName_8462154443.jpg', 'active', '2023-06-06 05:47:03', '2023-06-06 05:47:03'),
(22, '1', 'Horror', 'horror', 'IconName_4430789388.jpg', 'active', '2023-06-06 05:47:36', '2023-06-06 05:47:36'),
(23, '1', 'Sci-Fi', 'sci-fi', 'IconName_4391231915.jpg', 'active', '2023-06-06 05:47:50', '2023-06-06 05:47:50');

-- --------------------------------------------------------

--
-- Table structure for table `t_v_channels`
--

CREATE TABLE `t_v_channels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tv_channel_name` varchar(255) DEFAULT NULL,
  `tv_channel_slug` varchar(255) DEFAULT NULL,
  `tv_channel_image` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `t_v_channels`
--

INSERT INTO `t_v_channels` (`id`, `tv_channel_name`, `tv_channel_slug`, `tv_channel_image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Sony', 'sony', 'TV_Channel_383749.png', 'active', '2023-06-04 10:07:13', '2023-06-04 10:07:13'),
(2, 'Star Pravah', 'star-pravah', 'TV_Channel_283543.webp', 'active', '2023-06-04 10:08:42', '2023-06-04 10:08:42'),
(3, 'Star Plus', 'star-plus', 'TV_Channel_177711.webp', 'active', '2023-06-04 10:09:26', '2023-06-04 10:09:26'),
(4, 'Entertainer Premium', 'entertainer-premium', 'TV_Channel_526193.png', 'active', '2023-06-05 04:06:05', '2023-06-05 04:06:05'),
(5, 'Other', 'other', 'TV_Channel_429339.png', 'active', '2023-06-05 04:10:26', '2023-06-05 04:10:26');

-- --------------------------------------------------------

--
-- Table structure for table `t_v_shows`
--

CREATE TABLE `t_v_shows` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tv_shows_name` varchar(255) DEFAULT NULL,
  `tv_shows_slug` varchar(255) DEFAULT NULL,
  `tv_shows_image` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `t_v_shows`
--

INSERT INTO `t_v_shows` (`id`, `tv_shows_name`, `tv_shows_slug`, `tv_shows_image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'CID', 'cid', 'TV_Shows_563836.png', 'active', '2023-06-05 03:58:05', '2023-06-05 03:58:05'),
(2, 'Yeh Rishta Kya Kehlata Hai', 'yeh-rishta-kya-kehlata-hai', 'TV_Shows_767676.png', 'active', '2023-06-05 04:02:21', '2023-06-05 04:02:21'),
(3, 'Devyani', 'devyani', 'TV_Shows_677583.png', 'active', '2023-06-05 04:02:40', '2023-06-05 04:02:40'),
(4, 'Criminal Justice', 'criminal-justice', 'TV_Shows_635652.jpg', 'active', '2023-06-05 04:06:24', '2023-06-05 04:06:24'),
(5, 'Others', 'others', 'TV_Shows_433664.png', 'active', '2023-06-05 04:10:46', '2023-06-05 04:10:46'),
(6, 'Money Heist', 'money-heist', 'TV_Shows_696317.png', 'active', '2023-06-06 06:07:46', '2023-06-06 06:07:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `profile_image` longtext DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `access_type` varchar(255) DEFAULT NULL,
  `otp_verification` bigint(20) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `gender`, `dob`, `profile_image`, `email_verified_at`, `password`, `access_type`, `otp_verification`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '0000000000', NULL, NULL, NULL, NULL, '$2y$10$0YXFW6gDsXpb.SWubzlXqOK.KubJAl.EpxThOs.3NzG7L7OoqIBPm', 'admin', 3696206, NULL, '2023-05-08 11:57:31', '2023-05-31 07:26:22'),
(2, 'Akshay Jadhav', 'akshay.j@gmail.com', '9874563210', 'male', '2010-12-27', 'ProfileImage_155928.jpg', NULL, '$2y$10$9pcVzrb4.PzCkgMiaekvJu0e0C5UtUA5rRn5RdXTun6FRT3OCIJ2S', 'user', NULL, NULL, '2023-05-08 22:27:11', '2023-06-05 00:51:00'),
(4, 'Sardar Kadam', 'sardar@gmail.com', '9632587410', NULL, NULL, NULL, NULL, '$2y$10$UW4RZfkaPILZ5dLKXVCr9uwzj6cwHIlMJnUvlgcuy8ru.Shf294Wu', 'user', NULL, NULL, '2023-06-03 12:34:38', '2023-06-04 00:13:02');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category` bigint(20) DEFAULT NULL,
  `subcategory` bigint(20) DEFAULT NULL,
  `video_title` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `video_slug` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `released_year` varchar(255) DEFAULT NULL,
  `star_casts` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `tv_channel` varchar(255) DEFAULT NULL,
  `tv_shows` varchar(255) DEFAULT NULL,
  `web_series_title` varchar(255) DEFAULT NULL,
  `seasons` int(11) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `captions` longtext DEFAULT NULL,
  `p_t_status` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `upload_video` longtext DEFAULT NULL,
  `upload_video_url` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `category`, `subcategory`, `video_title`, `poster`, `video_slug`, `duration`, `released_year`, `star_casts`, `director`, `tv_channel`, `tv_shows`, `web_series_title`, `seasons`, `language`, `captions`, `p_t_status`, `status`, `upload_video`, `upload_video_url`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 6, 'Mission Mangal', '87656398690.webp', 'mission-mangal', '2 Hrs', '2019', 'Akshay Kumar, Vidya Balan, Dilip Kulkarni, Sharman Joshi', 'Jagan Shakti', NULL, NULL, NULL, NULL, 'hindi', '#Mission Mangal # 2019 #full movie', 'popular', 'active', NULL, 'https://www.youtube.com/embed/ZWHA7J7aGaw', 'Mission Mangal (English: \"Mission Mars\") is a 2019 Indian Hindi-language drama film directed by Jagan Shakti and produced by Cape of Good Films, Hope Productions, Fox Star Studios, Aruna Bhatia and Anil Naidu. Loosely based on the life of scientists at the Indian Space Research Organization who contributed to India\'s first interplanetary expedition Mars Orbiter Mission, it stars an ensemble cast of Akshay Kumar, Vidya Balan, Sonakshi Sinha, Taapsee Pannu, Nithya Menen, Kirti Kulhari and Sharman Joshi in lead roles alongside H. G. Dattatreya, Vikram Gokhale, Dalip Tahil, Sanjay Kapoor and Mohammed Zeeshan Ayyub amongst others in supporting roles.', '2023-05-11 01:32:32', '2023-05-11 01:32:32'),
(2, 3, 1, 'Playing Cricket', '33178501501.webp', 'playing-cricket', '1 Min', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'english', '#cricket', 'trending', 'active', '1722517747.mp4', NULL, 'Cricket', '2023-05-11 01:47:03', '2023-05-11 01:47:03'),
(3, 3, 3, 'Real Madrid 1 - 1 Manchester City', '25227020436.webp', 'real-madrid-1-1-manchester-city', '8 Mins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'english', 'Real Madrid 1 - 1 Manchester City | Highlights | UEFA Champions League | 10th May 2023', 'popular', 'active', NULL, 'https://www.youtube.com/embed/SJWeoE1xQrs', 'Real Madrid and Manchester City battled it out at the Santiago Bernabeu in the first leg of the semi-final. Even though Manchester City had more possession, Real Madrid scored the opening goal in the 36th minute thanks to Vinicus Jr. The visitors fought hard and equalized in the 67th minute with a Kevin De Bruyne special. The match ended with a 1 - 1 scoreline and a cracker of a match awaits in the second leg at the Etihad Stadium.', '2023-05-11 06:56:29', '2023-05-11 06:56:29'),
(4, 3, 2, 'India National Volleyball Team', '74059519392.jpg', 'india-national-volleyball-team', '11 Mins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'hindi', 'This is The Reason Why We Love India National Volleyball Team !!!', 'trending', 'active', NULL, 'https://www.youtube.com/embed/cDASJ7cq2-4', 'This is The Reason Why We Love India National Volleyball Team !!!', '2023-05-11 23:23:07', '2023-05-11 23:23:07'),
(5, 3, 1, 'Extended Highlights | FINAL | Barbados Royals vs Jamaica Tallawahs | CPL 2022', '35431475877.jpg', 'extended-highlights-final-barbados-royals-vs-jamaica-tallawahs-cpl-2022', '8 Mins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'english', '#CPL22 #BiggestPartyInSport #CricketPlayedLouder', 'popular', 'active', NULL, 'https://www.youtube.com/embed/-JrQ-9hS-1w', 'Extended highlights between Barbados Royals and Jamaica Tallawahs in the CPL 2022 at Providence Stadium in Guyana.', '2023-05-12 03:00:40', '2023-05-12 03:00:40'),
(6, 1, 12, 'The Detective', '80711104947.jpg', 'the-detective', '2 Hrs', '2022', 'Jason Statham, Ryan Phillippe, Wesley Snipes Etc.', 'Tony Giglio', NULL, NULL, NULL, NULL, 'english', '#HollywoodMovies #thedetective #ActionMovie', 'trending', 'active', NULL, 'https://www.youtube.com/embed/NAIzQFZACcw', 'Synopsis:\r\nA veteran detective is teamed with a rookie cop when they are sent to negotiate with a bunch of criminals holding a bank hostage. It transpires that a master thief has planted a computer virus that will drain funds from the bank\'s accounts. The detective faces a race against time to catch the thief and stop the randomly evolving computer virus, which models its behavior\'s on the bewildering principles of chaos theory.', '2023-05-31 03:58:57', '2023-05-31 03:58:57'),
(7, 2, 15, 'Vasai Fort', '32050899108.jpg', 'vasai-fort', '42 Mins', '2023', 'Shivaji Satam, Dinesh Phadnis, Dayanand Shetty, Aditya Srivastava', 'BP Singh', 'sony', 'cid', NULL, 1, 'hindi', '#CID #सीआईडी #CID2023', 'popular', 'active', NULL, 'https://www.youtube.com/embed/b-hzvtkMDws', 'Travelers Neha Alisha went missing in a remote fort far from the city. CID receives word from their pals and immediately starts looking for the two missing females. However, it seems something else going in Vasai Fort. What is the mystery of the fort? How will CID get the girl? Watch the episode to know.', '2023-06-04 01:00:44', '2023-06-04 01:00:44'),
(8, 2, 13, 'YRKKH - Makar Sankranti Special', '21188533848.jpg', 'yrkkh-makar-sankranti-special', '12Mins', '2022', 'Shivangi Joshi, Mohsin Khan, Pranali Rathod, Harshad Chopda', 'Romesh Kalra, Rishi Mandial, Ram Pandey', 'star-plus', 'yeh-rishta-kya-kehlata-hai', NULL, 1, 'hindi', '#yehrishtanairakartikka #drama #kartik  #naira  #akshara #starplus #makarsankranti  #patang', 'trending', 'active', '8211840818.mp4', NULL, 'Kartik Goenka Udaipur aata hai aur hojata hai usey chulbuli Naira se pyaar. Pehle toh Naira rehti hai confused par hojata hai usey bhi Kartik se pyaar. Dono kar lete hain shaadi. Naira laati hai Kartik ko apne parivaar ke kareeb. Kartik deta hai Naira ka saath uske sapne poore karne mai. \r\nIss rishtey ne dekhe bohot utaar chadhaav par kam na hua inka pyaar. Kai baar mile aur bichde Naira aur Kartik phir basaya dono ne pyaara sansaar. Unke pyaar ki nishaani hai unke do bacche, Kairav aur Akshara.', '2023-06-04 02:11:55', '2023-06-04 02:11:55'),
(9, 2, 15, 'Criminal Justice', '42035299204.jpg', 'criminal-justice', '24 Mins', '2020', 'Forensic', 'Forensic', 'entertainer-premium', 'criminal-justice', NULL, 1, 'hindi', '#criminal justice #savvyforensics #savvy #forensics #forensicScience #forensicToxicology #CriminalJusticeSystem #ForensicBallistics #questioned documents #traceEvidences #forensicJobs #vacancyAlert #forensicVacancy', 'popular', 'active', NULL, 'https://www.youtube.com/embed/DxwQLrXhS0M', 'Criminal Justice System|All about process of justice system in INDIA|@SavvyForensics', '2023-06-05 04:17:59', '2023-06-05 04:17:59'),
(11, 2, 15, 'Criminal Justice1', '81383506219.jpg', 'criminal-justice1', '24 Mins', '2022', 'Forensic', 'Forensic', 'entertainer-premium', 'criminal-justice', NULL, 1, 'hindi', '#forensic', 'trending', 'active', NULL, 'https://www.youtube.com/embed/DxwQLrXhS0M', 'test', '2023-06-05 06:34:36', '2023-06-05 06:34:36'),
(12, 2, 15, 'Criminal Justice2', '13156580452.jpg', 'criminal-justice2', '1 Min', '2022', 'Forensic', 'Forensic', 'entertainer-premium', 'criminal-justice', NULL, 2, 'hindi', '#forensic', 'popular', 'active', NULL, 'https://www.youtube.com/embed/ZWHA7J7aGaw', 'sadsadasdasdasd', '2023-06-05 06:52:08', '2023-06-05 06:52:08'),
(13, 4, 18, 'Money Heist S1 : E1', '50871803485.png', 'money-heist-s1-e1', '47 Mins', '2017', 'Úrsula Corberó, Álvaro Morte, Paco Tous', 'Jesús Colmenar', NULL, 'money-heist', '', 1, 'english', '#money heist', 'trending', 'active', NULL, 'https://www.youtube.com/embed/KW_AVaFXxT8', 'Under Section 107 of the Copyright Act 1976, allowance is made for \'fair use\' for purposes such as criticism, comment, news reporting, teaching, scholarship, and research. Fair use is a use permitted by copyright statute that might otherwise be infringing. Non-profit, educational or personal use tips the balance in favor of fair use.\"', '2023-06-06 00:33:20', '2023-06-06 00:33:20');

-- --------------------------------------------------------

--
-- Table structure for table `video_languages`
--

CREATE TABLE `video_languages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `languages_name` varchar(255) DEFAULT NULL,
  `languages_slug` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `video_languages`
--

INSERT INTO `video_languages` (`id`, `languages_name`, `languages_slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'English', 'english', 'active', '2023-06-04 08:52:07', '2023-06-04 08:52:07'),
(2, 'Hindi', 'hindi', 'active', '2023-06-04 08:53:13', '2023-06-04 08:53:13'),
(3, 'Marathi', 'marathi', 'active', '2023-06-04 08:53:21', '2023-06-04 08:53:21'),
(4, 'Gujarathi', 'gujarathi', 'active', '2023-06-04 08:53:34', '2023-06-04 08:53:34'),
(5, 'Telugu', 'telugu', 'active', '2023-06-04 08:54:02', '2023-06-04 08:54:02'),
(6, 'Kannada', 'kannada', 'active', '2023-06-04 08:54:26', '2023-06-04 08:54:26'),
(7, 'Tamil', 'tamil', 'active', '2023-06-04 08:55:25', '2023-06-04 08:55:25'),
(8, 'Malayalam', 'malayalam', 'active', '2023-06-04 08:58:04', '2023-06-04 08:58:04');

-- --------------------------------------------------------

--
-- Table structure for table `watchlists`
--

CREATE TABLE `watchlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `video_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `watchlists`
--

INSERT INTO `watchlists` (`id`, `user_id`, `video_id`, `created_at`, `updated_at`) VALUES
(10, '2', '6', '2023-05-31 07:18:38', '2023-05-31 07:18:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_shows_details`
--
ALTER TABLE `all_shows_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `all_shows_details_shows_name_unique` (`shows_name`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_category_name_unique` (`category_name`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `plan_details`
--
ALTER TABLE `plan_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_v_channels`
--
ALTER TABLE `t_v_channels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `t_v_channels_tv_channel_name_unique` (`tv_channel_name`);

--
-- Indexes for table `t_v_shows`
--
ALTER TABLE `t_v_shows`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `t_v_shows_tv_shows_name_unique` (`tv_shows_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_mobile_unique` (`mobile`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `videos_video_title_unique` (`video_title`);

--
-- Indexes for table `video_languages`
--
ALTER TABLE `video_languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `video_languages_languages_name_unique` (`languages_name`);

--
-- Indexes for table `watchlists`
--
ALTER TABLE `watchlists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all_shows_details`
--
ALTER TABLE `all_shows_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `plan_details`
--
ALTER TABLE `plan_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `t_v_channels`
--
ALTER TABLE `t_v_channels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `t_v_shows`
--
ALTER TABLE `t_v_shows`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `video_languages`
--
ALTER TABLE `video_languages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `watchlists`
--
ALTER TABLE `watchlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
