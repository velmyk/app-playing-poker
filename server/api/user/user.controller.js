const
    path = require('path'),
    q = require('q'),
    _lodash = require('lodash'),
    jwt = require('jsonwebtoken');

const
    OK = 200,
    CREATED = 201,
    NOT_FOUND = 404;

const
    User = require('./user.model');


const
    getCurrentUser = (req, res) => {
        return q.Promise(
            (resolve, reject) => {
                if (!req.user || !req.user._id) {
                    reject();
                } else {
                    resolve(req.user._id);
                }
            })
            .then(userId => {
                return User.findById(userId);
            })
            .then(result => {
                res.status(OK).json(result);
            })
            .catch(err => {
                res.status(NOT_FOUND).json(err);
            });
    };

const
    get = (req, res) => {
        return User.find(req.params)
            .then(result => {
                res.status(OK).json({
                    status: 'success',
                    total: result.length,
                    responses: result
                });
            })
            .catch(err => {
                res.status(NOT_FOUND).json(err);
            });
    };

const
    me = (req, res) => {
        var token = req.cookies.token.slice(1,-1);
        var id = jwt.decode(token, 'my-secret');

        User.findById(id).exec().then(user => res.send(user));
    };

const
    add = (req, res) => {
        var modelInstance = new User(req.body);
        return modelInstance.save()
            .then(result => {
                res.status(CREATED).json({
                    status: 'success',
                    response: result
                });
            })
            .catch(err => {
                res.send(err);
            });
    };

const
    getById = (req, res) => {
        return User.findById(req.params.id)
            .then(result => {
                res.status(OK).json(result);
            })
            .catch(err => {
                res.status(NOT_FOUND).json(err);
            });
    };

const
    update = (req, res) => {
        return User.findById(req.params.id)
            .then(modelInstance => {
                var updatedInstance = _lodash.extend(modelInstance, req.body);
                return updatedInstance.save();
            })
            .then(result => {
                res.status(OK).json({
                    status: 'success',
                    response: result
                });
            })
            .catch(err => {
                res.status(NOT_FOUND).json(err);
            });
    };

const
    updateImage = (req, res) => {
        res.send('Nice image, but uploading is not implemented yet');
    };

const
    remove = (req, res) => {
        return User.remove({_id: req.params.id})
            .then(result => {
                res.json({
                    status: 'success',
                    response: result
                });
            })
            .catch(err => {
                res.send(err);
            });
    };

module.exports = {
    getCurrentUser: getCurrentUser,
    get: get,
    add: add,
    getById: getById,
    update: update,
    remove: remove,
    me: me,
    updateImage: updateImage
}