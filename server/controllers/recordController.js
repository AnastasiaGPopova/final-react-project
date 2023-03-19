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
  try {
    const record = await recordManager.getOne(req.params.recordId).populate('_ownerId');
    res.json(record);
  } catch (error) {
    return res.json(parser.parseError(error));
  }
});



router.post("/", async (req, res) => {
  const recordData = req.body;

  try {
    const record = await recordManager.create(recordData, req.user._id);

    res.json({ _id: record._id });
  } catch (error) {
    return res.json(parser.parseError(error))
  }
});

router.put("/:recordId", async (req, res) => {
  //to DO validations for empty fields
  //const {........} = req.body
  let isOwner = false;
  let currentRecord = await recordManager.getOne(req.params.recordId);
  const recordData = req.body;

    try {
    const updatredRecord =  await recordManager.update(req.params.recordId, recordData);

      res.json(updatredRecord);
    } catch (error) {
      console.log(error)
      return res.json(parser.parseError(error))
    }
});

router.delete("/:recordId", async (req, res) => {
  let isOwner = false;
  let currentRecord = await recordManager.getOne(req.params.recordId);
    try {
      await recordManager.delete(req.params.recordId);
      res.json({ ok: true });
    } catch (error) {
        let response = {
            errors: {},
            message: error.message,
          };
          return response;
    }
});

module.exports = router;
