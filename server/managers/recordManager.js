const Record = require('../models/Record');

exports.getAllRecordsByOwner = (ownerId) => Record.find({ "_ownerId": `${ownerId}` })


// exports.getAll =() => Record.find()

exports.getOne = (id) => Record.findById(id);

exports.getAll = () => Record.find().sort({createdAt: -1})

exports.create = (recordData) => Record.create(recordData);

exports.getExisting = (recordname) => Record.findOne({"recordName": `${recordname}`});

exports.update = (id, recordData) => Record.findByIdAndUpdate(id, recordData, {runValidators: true});

exports.delete = (id) => Record.findByIdAndDelete(id);

exports.getWishList = (userId) => Record.find({ wishingList: userId })


//--------------SEARCH-------------

exports.itemandYear1980to2020 = (item) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$gt: 1979, $lt: 2021}},
);


exports.itemandYear1980andOlder = (item) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$lt: 1980}},
);


exports.itemandYear2020andNewer = (item) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$gt: 2020}},
);


exports.itemandGenre = (item, genre) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "genre": { "$regex": `${genre}`, "$options": "i" }},
);



exports.globalTEST = (searchItem, year, genres, rpm) => Record.find(
    {"artist": { "$regex": `${searchItem}`, "$options": "i" }, "genre": { "$regex": `${genres}`, "$options": "i" }, "rpm": `${rpm}`},
);


exports.itemandRPM = (item, rpm) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "rpm": `${rpm}`},
);

exports.itemRPMYear1980to2020 = (item, rpm) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$gt: 1979, $lt: 2021},"rpm": `${rpm}`},
);



exports.itemRPMYear1980andOlder = (item, rpm) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$lt: 1980}, "rpm": `${rpm}`},
);

exports.itemRPMYear2020andNewer = (item, rpm) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$gt: 2020}, "rpm": `${rpm}`},
);


exports.itemGenreYear1980to2020 = (item, genres) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$gt: 1979, $lt: 2021},"genre": { "$regex": `${genres}`, "$options": "i" }},
);


exports.itemGenreYearear1980andOlder = (item, genres) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$lt: 1980}, "genre": { "$regex": `${genres}`, "$options": "i" }},
);

exports.itemGenreYear2020andNewer = (item, genres) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$gt: 2020}, "genre": { "$regex": `${genres}`, "$options": "i" }},
);

//---With all fields
exports.allYear1980to2020 = (item, genres, rpm) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$gt: 1979, $lt: 2021},"genre": { "$regex": `${genres}`, "$options": "i" }, "rpm": `${rpm}`},
);

exports.allYear1980andOlder = (item, genres, rpm) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$lt: 1980},"genre": { "$regex": `${genres}`, "$options": "i" }, "rpm": `${rpm}`},
);

exports.allYear2020andNwer = (item, genres, rpm) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" }, "year": {$gt: 2020},"genre": { "$regex": `${genres}`, "$options": "i" }, "rpm": `${rpm}`},
);


///---With item, genre and rpm

exports.itemGenreRPM = (item, genres, rpm) => Record.find(
    {"artist": { "$regex": `${item}`, "$options": "i" },"genre": { "$regex": `${genres}`, "$options": "i" }, "rpm": `${rpm}`},
);



//year and prm

exports.RPMYear1980to2020 = (rpm) => Record.find(
    {"year": {$gt: 1979, $lt: 2021}, "rpm": `${rpm}`},
);

exports.RPMYear1980andOlder = (rpm) => Record.find(
    {"year": {$lt: 1980}, "rpm": `${rpm}`},
);

exports.RPMYear2020andNewer = (rpm) => Record.find(
    {"year": {$gt: 2020}, "rpm": `${rpm}`},
);

//year and genre
exports.genre1980to2020 = (genres) => Record.find(
    {"year": {$gt: 1979, $lt: 2021},"genre": { "$regex": `${genres}`, "$options": "i" }},
);


exports.genre1980andOlder = (genres) => Record.find(
    {"year": {$lt: 1980},"genre": { "$regex": `${genres}`, "$options": "i" }},
);

exports.genre2020andNewer = (genres) => Record.find(
    {"year": {$gt: 2020},"genre": { "$regex": `${genres}`, "$options": "i" }},
);

//ganre and rpm
exports.genreandRPM = (genres, rpm) => Record.find(
    {"genre": { "$regex": `${genres}`, "$options": "i" },"rpm": `${rpm}`},
);

//genre+year+rpm
exports.genreRPM1980to2020 = (genres, rpm) => Record.find(
    {"year": {$gt: 1979, $lt: 2021},"genre": { "$regex": `${genres}`, "$options": "i" },"rpm": `${rpm}`},
);

exports.genreRPM1980andOlder = (genres, rpm) => Record.find(
    {"year": {$lt: 1980},"genre": { "$regex": `${genres}`, "$options": "i" },"rpm": `${rpm}`},
);

exports.genreRPM2020andNewer = (genres, rpm) => Record.find(
    {"year": {$gt: 2020},"genre": { "$regex": `${genres}`, "$options": "i" },"rpm": `${rpm}`},
);







exports.getSearchedbyArtist = (item) => Record.find(
        { "artist": { "$regex": `${item}`, "$options": "i" } },

);


exports.getSearchedbyArtistOrRecord = (item) => Record.find(
    {$or: [{ "artist": { "$regex": `${item}`, "$options": "i" } }, { "recordName": { "$regex": `${item}`, "$options": "i" } }]},
);


exports.getSearchedbyYear1980to2020 = () => Record.find(
    { "year": {$gt: 1979, $lt: 2021}}
);
exports.getSearchedbyYear2021andNewer = () => Record.find(
    { "year": {$gt: 2020} }
);

exports.getSearchedbyYear1980andOlder = () => Record.find(
    { "year": {$lt: 1980} }
);

exports.getbyGenre = (item) => Record.find({ "genre": { "$regex": `${item}`, "$options": "i" } })

exports.getbyRPM = (item) => Record.find({ "rpm": `${item}` })



