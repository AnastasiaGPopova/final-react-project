const Record = require('../models/Record');

exports.getAllRecordsByOwner = (ownerId) => Record.find({ "_ownerId": `${ownerId}` })


// exports.getAll =() => Record.find()

exports.getOne = (id) => Record.findById(id);

exports.getAll = () => Record.find().sort({createdAt: -1})

exports.create = (recordData) => Record.create(recordData);

exports.update = (id, recordData) => Record.findByIdAndUpdate(id, recordData, {runValidators: true});

exports.delete = (id) => Record.findByIdAndDelete(id);

exports.getSearchedbyArtist = (item) => Record.find(
        { "artist": { "$regex": `${item}`, "$options": "i" } },

);


exports.getSearchedbyArtistOrRecord = (item) => Record.find(
    {$or: [{ "artist": { "$regex": `${item}`, "$options": "i" } }, { "recordName": { "$regex": `${item}`, "$options": "i" } }]},
);


exports.getSearchedbyYear1980to2020 = () => Record.find(
    {$or: [{ "year": {$lt: 2021} }, { "year": {$gt: 1979} }]}
);

exports.getSearchedbyYear2021andNewer = () => Record.find(
    { "year": {$gt: 2020} }
);

exports.getSearchedbyYear1980andOlder = () => Record.find(
    { "year": {$lt: 1980} }
);

exports.getbyGenre = (item) => Record.find({ "genre": { "$regex": `${item}`, "$options": "i" } })

exports.getbyRPM = (item) => Record.find({ "rpm": `${item}` })


