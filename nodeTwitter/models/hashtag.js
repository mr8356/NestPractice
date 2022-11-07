const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title : {
                allowNull : false,
                type : Sequelize.STRING(15),
                unique : true,
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "Hashtag",
            tableName : "hashtags",
            paranoid : false,
            collate : "utf8_general_ci",
            charset : "utf8",
        })
    }
    static associate(db) {
        db.Hashtag.belongsToMany(db.Post, {through : 'PostHashtag'});
    }
};