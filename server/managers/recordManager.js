const Record = require('../models/Record');

exports.getAllCreatedByUser = (ownerId) => {
    let filter = {};

    if (ownerId) {
        filter._ownerId = ownerId;
    }

    return Record.find(filter);
};


// exports.getAll =() => Record.find()

exports.getOne = (id) => Record.findById(id);

exports.getAll = () => Record.find().sort({createdAt: -1})

exports.create = (recordData, userId) => Record.create({ ...recordData, _ownerId: userId });

exports.update = (id, recordData) => Record.findByIdAndUpdate(id, {...recordData}, {runValidators: true});

exports.delete = (id) => Record.findByIdAndDelete(id);