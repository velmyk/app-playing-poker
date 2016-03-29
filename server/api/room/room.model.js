const
    mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

const
    RoomSchema = new Schema({
        storyDescription: String,
        storyEstimation: Number,
        marks: Object
    }, {collection: 'rooms'});

module.exports = mongoose.model('Room', RoomSchema);