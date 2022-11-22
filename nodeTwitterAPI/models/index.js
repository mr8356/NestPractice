const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize;
db.Sequelize = Sequelize;
const User = require('./user')
const Post = require('./post')
const Hashtag = require('./hashtag');
const Domain = require('./domain')
User.init(sequelize)
Post.init(sequelize)
Hashtag.init(sequelize)
Domain.init(sequelize)
db.User = User
db.Post = Post
db.Hashtag = Hashtag
db.Domain = Domain
User.associate(db)
Post.associate(db)
Hashtag.associate(db)
Domain.associate(db)
module.exports = db;
