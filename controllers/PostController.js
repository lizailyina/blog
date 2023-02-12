import Post from "../models/Post.js"

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate('user').exec();

        res.json(posts);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Error getting posts",
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        Post.findOneAndUpdate({
           _id: postId,
        }, {
            $inc: {viewsCount: 1},
        },
        {
            returnDocument: 'after',
        },
        (err, doc) => {
            if(err) {
                console.status(500).log(err);
                return res.json({
                    message: "Error getting a post",
                }) 
            }

            if(!doc) {
                return res.status(404).json({
                    message: "Post not found",
                })
            }

            res.json(doc);
        }
        )

    } catch(err) {
        console.log(err);
        res.json({
            message: "Error getting a post",
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        Post.findOneAndDelete({
           _id: postId,
        }, (err, doc) => {
            if(err) {
                console.status(500).log(err);
                return res.json({
                    message: "Error deleting a post",
                }) 
            }

            if(!doc) {
                return res.status(404).json({
                    message: "Post not found",
                })
            }

            res.json({
                success: true,
            });
        }
        )

    } catch(err) {
        console.log(err);
        res.json({
            message: "Error getting a post",
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });
        const post = await doc.save();

        res.json(post);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Error creating a post",
        })  
    }
}

export const update = async(req, res) => {
    try {
        const postId = req.params.id;
        
        await Post.updateOne({
            _id: postId,
        }, 
        {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        },);
        res.json({
            succes: true,
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Error updating a post",
        })
    }
}