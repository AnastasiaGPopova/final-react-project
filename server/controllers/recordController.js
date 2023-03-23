const router = require("express").Router();

const recordManager = require("../managers/recordManager");
const parser = require('../utils/parser')

router.get("/", async (req, res) => {
  try {
    const records = await recordManager.getAll().populate('_ownerId');
    res.json(records);
  } catch (error) {
    res.json(parser.parseError(error))
  }
});




router.get("/:recordId", async (req, res) => {

  if(req.params.recordId === "myRecords"){
    const records = await recordManager.getAllRecordsByOwner(req.user._id)
    return res.json(records);
  } else if (req.params.recordId === "wishList") {
    const records = await recordManager.getWishList(req.user._id)
    return res.json(records);
  } else {
    try {
      const record = await recordManager.getOne(req.params.recordId).populate('_ownerId');
      res.json(record);
    } catch (error) {
      return res.json(parser.parseError(error));
    }

  }
});



router.post("/", async (req, res) => {

  // recordName: recordValues.recordName,
  // artist: recordValues.artist,
  // year: recordValues.year,
  // imageUrl: recordValues.imageUrl,
  // description: recordValues.description,
  // rpm: recordValues.rpm,
  // genre: realGenre,

  const {recordName, artist, year, imageUrl, description, genre, rpm} = req.body;

  try {

    if(!recordName || !artist || !year || !imageUrl || !description || !genre || !rpm){
      throw new Error (`All fields are requiered!`)
    }



    const record = await recordManager.create({recordName, artist, year, imageUrl, description, genre, rpm, _ownerId: req.user._id});

    res.json({ _id: record._id });
  } catch (error) {
    return res.json(parser.parseError(error))
  }
});


router.put("/:recordId", async (req, res) => {
  //to DO validations for empty fields
  //const {........} = req.body
  let isOwner = true;
  let currentRecord = await recordManager.getOne(req.params.recordId);
  const {recordName, artist, year, imageUrl, description, genre, rpm, likes, wishingList} = req.body;

    try {

    if(!recordName || !artist || !year || !imageUrl || !description || !genre || !rpm){
        throw new Error (`All fields are requiered!`)
      }

    const updatredRecord =  await recordManager.update(req.params.recordId, {recordName, artist, year, imageUrl, description, genre, rpm, likes, wishingList});

      res.json(updatredRecord);
    } catch (error) {
      console.log(error)
      return res.json(parser.parseError(error))
    }
});

router.delete("/:recordId", async (req, res) => {

  let isOwner = true;
  let currentRecord = await recordManager.getOne(req.params.recordId);
  if(currentRecord._ownerId !== req.user._id){
    isOwner = false
  }
    try {
      // if(!isOwner){
      //   throw new Error(`You are not authotized!`)
      // }
      await recordManager.delete(req.params.recordId);
      res.json({ ok: true });
    } catch (error) {
          return res.json(parser.parseError(error))
    }
});

module.exports = router;
