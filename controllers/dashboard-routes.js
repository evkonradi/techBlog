const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
          // use the ID from the session
          user_id: req.session.user_id
        },
        attributes: [
          'id',
          'post_content',
          'title',
          'created_at'],
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
          // serialize data before passing to template
          const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('dashboard', { posts });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.get('/post-edit/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'post_content', 'title', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title']
           }
      }
    ]
  })
  .then(dbPostData => {
    // serialize data before passing to template
    const post = dbPostData.get({ plain: true });
    res.render('post-edit', { post });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/post-add', (req, res) => {
  res.render('post-add');
});


module.exports = router;