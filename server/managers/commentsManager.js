const Comment = require('../models/Comment');

exports.getAllCreatedByUser = (ownerId) => {
    let filter = {};

    if (ownerId) {
        filter._ownerId = ownerId;
    }

    return Record.find(filter);
};



exports.getAll = () => Comment.find().sort({createdAt: -1})

exports.create = (commentData) => Comment.create({ ...commentData });

exports.getAllCommentsByRecord = (recordId) => Comment.find({}).where('recordId').equals(`${recordId}`)
                                                               .sort({createdAt: -1})

exports.deleteAllbyUser = (id) => Comment.deleteMany({recordId: id});