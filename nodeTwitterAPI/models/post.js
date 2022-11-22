const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content : {
                allowNull : false,
                type : Sequelize.STRING(140),
            },
            // 이미지 경로
            img : {
                allowNull : true,
                type : Sequelize.STRING(200),
            },
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "Post",
            tableName : "posts",
            paranoid : false,
            collate : "utf8_general_ci",
            charset : "utf8",
        })
    }
    static associate(db) {
        db.Post.belongsTo(db.User, {foreignKey : 'UserId'});
        db.Post.belongsToMany(db.Hashtag, {through : 'PostHashtag'});
    }
};