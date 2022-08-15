const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { includes } = require('lodash');

router.get('/', (req, res) => {

    Post.findAll({
        attributes: [
            'id',
            'title',
            'body',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.post_id = post.id)'), 'comments'],
        ],
        include: [
                {
                    model: Comment,
                    attributes: ['id', 'body', 'created_at', 'user_id', 'post_id'],
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
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'body',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.post_id = post.id)'), 'comments'],
        ],
        include: [
                {
                    model: Comment,
                    attributes: ['id', 'body', 'created_at', 'user_id', 'post_id'],
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
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData); 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }); 
}); 


router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user.id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}); 

// might need a router.put for commenting on a post


router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
        title: req.body.title,
        },
        {
            where: {
            id: req.params.id
            }
        }
    )   
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

