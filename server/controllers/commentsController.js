const router = require("express").Router();

const commentsManager = require("../managers/commentsManager");
const parser = require('../utils/parser')

router.get("/:recordId", async (req, res) => {
  try {
    const comments = await commentsManager.getAllCommentsByRecord(req.params.recordId);
    // const comments = await commentsManager.getAll();
    console.log(`---------COMMENTS-----------`)
    console.log(comments)
    res.json(comments);
  } catch (error) {
    res.json(parser.parseError(error))
  }
});



router.post("/", async (req, res) => {
  const commentData = req.body;

  try {
    
    const comment = await commentsManager.create(commentData);

    res.json(comment);
  } catch (error) {
    return res.json(parser.parseError(error))
  }
});

router.post("/:recordId", async (req, res) => {

  try {
    await commentsManager.deleteAllbyUser(req.params.recordId);
    res.json({ ok: true });
  } catch (error) {
        return res.json(parser.parseError(error))
  }
});




module.exports = router;
