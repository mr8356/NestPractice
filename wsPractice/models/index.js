const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Chat = require('./chat')
const Room = require('./room')

Room.init(sequelize);
Chat.init(sequelize)
Hashtag.init(sequelize)

db.Chat = Chat
db.Room = Room

Room.associate(db);
Chat.associate(db);

module.exports = db;