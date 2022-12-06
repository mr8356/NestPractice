const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title : {
                type : Sequelize.STRING(40),
                allowNull : false,
                unique : true
            },
            max : {
                type : Sequelize.INTEGER,
                allowNull : false,
                defaultValue : 10,
            },
            owner : {
                type : Sequelize.STRING(40),
                allowNull : false
            },
            password : {
                type : Sequelize.STRING(100),
                allowNull : true,
            },
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "Room",
            tableName : "rooms",
            paranoid : true,
            collate : "utf8_general_ci",
            charset : "utf8",
        })
    }
    static associate(db) {
        db.Room.hasMany(db.Chat, {foreignKey : 'RoomId', sourceKey : 'id'});
    }
}