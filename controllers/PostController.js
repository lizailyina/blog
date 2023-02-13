import Post from "../models/Post.js"

function unique(arr) {
    let result = [];
  
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
  
    return result;
  }

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

export const getLastTags = async (req, res) => {
    try {
        const posts = await Post.find().limit(5).exec();

        const tags = unique(posts
        .map(obj => obj.tags)
        .flat())
        .slice(0, 5);

        console.log(tags);

        res.json(tags);
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
        ).populate('user');

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
        console.log(req.body);
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
            imageURL: req.body.imageURL,
        });
        console.log(doc);
        const post = await doc.save();
        console.log(post);
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
            imageURL: req.body.imageURL,
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