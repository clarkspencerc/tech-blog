// Import all models 
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');


// create associations between models

    User.hasMany(Post, {
        foreignKey: 'user_id'
    });

    Post.belongsTo(User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    });

    User.belongsToMany(Post, {
        through: Comment,
        as: 'comments',

        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    });

    Post.belongsToMany(User, {
        through: Comment,
        as: 'comments',
        foreignKey: 'post_id',
        onDelete: 'CASCADE'
    });


    Comment.belongsTo(Post, {
        foreignKey: 'post_id',
        onDelete: 'CASCADE'
    });

    Post.hasMany(Comment, {
        foreignKey: 'post_id',
        onDelete: 'CASCADE'
    });

    Comment.belongsTo(User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
    });

    User.hasMany(Comment, {
        foreignKey: 'user_id',
        ondelete: 'CASCADE'
    });
  
module.exports = { Post, User, Comment };