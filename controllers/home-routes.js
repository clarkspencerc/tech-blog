const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1, 
        title: 'Homepage test comment',
        body: 'This is a test comment',
        created_at: new Date(),
        vote_cout: 1,
        comments: [{}, {}],
        user: {
            username: 'test_user'
        }
    });
}); 

module.exports = router;