// Import all models 
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');


// create associations between models
    User.hasMany(Post, {foreignKey: 'user_id'});

    Post.belongsTo(User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL'
    });

    User.belongsToMany(Post, {
        through: Comment,
        as: 'comments',

        foreignKey: 'user_id',
        onDelete: 'SET NULL'    
    });

    Post.belongsToMany(User, {
        through: Comment,
        as: 'comments',
        foreignKey: 'post_id',
        onDelete: 'SET NULL'
    });

    Comment.belongsTo(User, {
        foreignKey: 'user_id',
        onDelete: 'SET NULL'
    });

    Comment.belongsTo(Post, {
        foreignKey: 'post_id',
        onDelete: 'SET NULL'
    });

    User.hasMany(Comment, {
        foreignKey: 'user_id',
        ondelete: 'SET NULL'
    });

    Post.hasMany(Comment, {foreignKey: 'post_id'});

  
module.exports = { Post, User, Comment };