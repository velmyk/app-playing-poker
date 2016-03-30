const
    jwt = require('jsonwebtoken');

const
    OK = 200,
    CREATED = 201,
    NOT_FOUND = 404;

const
    Room = require('./room.model'),
    User = require('../user/user.model');

const
    createRoom = (req, res) => {
        const roomId = new Date().getTime();
        res.send({
            id: roomId
        });
    };

const
    add = (req, res) => {
        const
            modelInstance = new Room(req.body);

        modelInstance.save()
            .then(result => {
                const
                    token = req.cookies.token.slice(1,-1),
                    id = jwt.decode(token, process.env.SEACRETS_SESSION)._id;

                User.findById(id)
                    .then(user => {
                        user.savedStories.push(result._id);
                        user.save();
                    });
                res.status(CREATED).json({
                    status: 'success',
                    response: result
                });
            })
            .catch(err => {
                res.send(err);
            });
    };

// const
//     getAll = (req, res) => {
//         commentsQuery.options = {
//             limit: req.query.commentsLimit
//         };

//         Room
//             .find()
//             .limit(req.query.postsLimit)
//             .skip(req.query.postsSkip)
//             .populate(populateQuery)
//             .exec(function(err, items){
//                 if(err){ return next(err); }

//                 res.json(items);
//             });

//     };

// const 
//     authorQuery = {
//         path: 'author',
//         select: 'username image'
//     };

// const
//     commentsQuery = {
//         path: 'comments',
//         select: 'body author post',
//         populate: authorQuery
//     };

// const
//     populateQuery = [
//         authorQuery,
//         commentsQuery
//     ];

module.exports = {
    add: add,
    // getAll: getAll,
    createRoom: createRoom
}