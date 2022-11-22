const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            email : {
                allowNull : true,
                type : Sequelize.STRING(40),
                unique : true,
            },
            nick : {
                allowNull : false,
                type : Sequelize.STRING(15),
            },
            provider : {
                allowNull : false,
                type : Sequelize.STRING(10),
                defaultValue : 'local'
            },
            snsId : {
                allowNull : true,
                type : Sequelize.STRING(40),
            },
            password : {
                allowNull : true,
                type : Sequelize.STRING(100)
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "User",
            tableName : "users",
            paranoid : true,
            collate : "utf8_general_ci",
            charset : "utf8",
        })
    }
    static associate(db) {
        db.User.hasMany(db.Post, {foreignKey : 'UserId', sourceKey : 'id'});
        db.User.belongsToMany(db.User , {
            as : 'Followers',
            foreignKey : 'FollowingId',
            through : 'Follow',
        });
        db.User.belongsToMany(db.User, {
            as : 'Followings',
            foreignKey : 'FollowerId',
            through : 'Follow',
        });
        db.User.hasMany(db.Domain);
    }
};