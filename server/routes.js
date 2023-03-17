const router = require('express').Router()
const userController = require('./controllers/userController')
const recordController = require('./controllers/recordController')
const commentsController = require('./controllers/commentsController')

router.use('/users', userController)
router.use('/records', recordController)
router.use('/comments', commentsController)

module.exports = router