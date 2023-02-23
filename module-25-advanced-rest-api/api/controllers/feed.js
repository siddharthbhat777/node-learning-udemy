const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({ // 200: success
        posts: [
            {
                _id: '1',
                title: 'First Post',
                content: 'This is the first post!',
                imageUrl: 'images/sekiro.png',
                creator: {
                    name: 'Siddharth'
                },
                createdAt: new Date()
            }
        ]
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: 'Validation failed, entered data is incorrect.', errors: errors.array() })
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/sekiro.png',
        creator: {
            name: 'Siddharth'
        }
    });
    post.save().then((result) => {
        console.log(result);
        res.status(201).json({ // 201: success and resource is created
            message: 'Post created successfully!',
            post: result // result = data
        });
    }).catch((err) => {
        console.log(err);
    });
};