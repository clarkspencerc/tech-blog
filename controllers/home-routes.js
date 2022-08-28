const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

router.get("/", (req, res) => {
    Post.findAll({ 
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render("homepage", { 
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch((err) => {
        res.status(500).json(err);
    }); 
}); 

router.get("/post/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then((dbPostData) => {
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            res.render("single-post", { 
                post,
                loggedIn: req.session.loggedIn
             });
        } else {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        } 
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
}); 

router.get("/login", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render("login");
});

// router.get("/signup", (req, res) => {
//     if(req.session.loggedIn) {
//         res.redirect("/");
//         return;
//     }
//     res.render("signup");
// } );

module.exports = router;