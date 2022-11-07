const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = require('./user')
const Post = require('./post')
const Hashtag = require('./hashtag')

Post.init(sequelize);
User.init(sequelize)
Hashtag.init(sequelize)

db.User = User
db.Post = Post
db.Hashtag = Hashtag

User.associate(db);
Post.associate(db);
Hashtag.associate(db)

module.exports = db;

// 실행결과
// Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'posts' AND TABLE_SCHEMA = 'nodeTwitter'
// Executing (default): CREATE TABLE IF NOT EXISTS `posts` (`id` INTEGER NOT NULL auto_increment , `content` VARCHAR(140) NOT NULL, `img` VARCHAR(200), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
// Executing (default): SHOW INDEX FROM `posts` FROM `nodeTwitter`
// Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'users' AND TABLE_SCHEMA = 'nodeTwitter'
// Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `email` VARCHAR(40) UNIQUE, `nick` VARCHAR(15) NOT NULL, `provider` VARCHAR(10) NOT NULL DEFAULT 'local', `snsId` VARCHAR(40), `password` VARCHAR(100) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deletedAt` DATETIME, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
// Executing (default): SHOW INDEX FROM `users` FROM `nodeTwitter`
// Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'hashtags' AND TABLE_SCHEMA = 'nodeTwitter'
// Executing (default): CREATE TABLE IF NOT EXISTS `hashtags` (`id` INTEGER NOT NULL auto_increment , `title` VARCHAR(15) NOT NULL UNIQUE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
// Executing (default): SHOW INDEX FROM `hashtags` FROM `nodeTwitter`

// 연결
// Executing (default): CREATE TABLE IF NOT EXISTS `Follow` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `FollowingId` INTEGER , `Followers` INTEGER , PRIMARY KEY (`FollowingId`, `Followers`), FOREIGN KEY (`FollowingId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`Followers`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
// Executing (default): SHOW INDEX FROM `Follow` FROM `nodeTwitter`
// Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'PostHashtag' AND TABLE_SCHEMA = 'nodeTwitter'
// Executing (default): CREATE TABLE IF NOT EXISTS `PostHashtag` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `PostId` INTEGER , `HashtagId` INTEGER , PRIMARY KEY (`PostId`, `HashtagId`), FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`HashtagId`) REFERENCES `hashtags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;
// Executing (default): SHOW INDEX FROM `PostHashtag` FROM `nodeTwitter`