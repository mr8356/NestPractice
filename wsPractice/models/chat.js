const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            RoomId : {
                type : Sequelize.INTEGER,
                allowNull : false,
            },
            user : {
                type : Sequelize.STRING(40),
                allowNull : false,
            },
            chat : {
                type : Sequelize.STRING(100),
                allowNull : false
            },
            gif : {
                type : Sequelize.STRING(100),
                allowNull : true
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "Chat",
            tableName : "chats",
            paranoid : true,
            collate : "utf8_general_ci",
            charset : "utf8",
        })
    }
    static associate(db) {
        db.Chat.belongsTo(db.Room, {foreignKey : 'RoomId'});
    }
}