const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { init } = require('./User');

class Post extends Model { 
    static comment(body, models){
        return models.Comment.create({
            user_id: body.user_id,
            post_id: body.post_id,
        }).then( () => {
            return Post.findOne({
                where: {
                    id: body.post_id
                }, 
                attributes: [
                    'id',
                    'title',
                    'body',
                    'created_at',
                    [sequelize.literal('(SELECT * FROM comment WHERE comment.post_id = post.id)'), 'comments'],
                ],
                include: [
                    {
                        model: models.Comment, 
                        attributes: ['id', 'body', 'created_at', 'user_id', 'post_id'],
                        include: {
                            model: models.User,
                            attributes: ['username']
                        }
                    }
                ]
            });
        });
    }
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
); 


module.exports = Post;