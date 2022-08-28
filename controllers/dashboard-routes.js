const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
        ], include: [
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
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { 
            posts,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.redirect("login");
    });
});

router.get("/new", withAuth, (req, res) => {
    res.render("single-post", { layout: "dashboard" });
});

router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
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
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                res.render("edit-post", {
                    post, 
                    loggedIn: true,
                });
            } else {
                res.status(404).json({ message: 'No post found with this id'});
                return;
            }
        }).catch(err => {
            res.status(500).json(err);
        }); 
    }); 


module.exports = router;