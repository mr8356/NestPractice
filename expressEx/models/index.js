const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require('./user')
const Comment = require('./comment')

User.init(sequelize);
Comment.init(sequelize);

db.User = User
db.Comment = Comment

User.associate(db);
Comment.associate(db);


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
