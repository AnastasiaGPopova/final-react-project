const router = require('express').Router()
const userController = require('./controllers/userController')
const recordController = require('./controllers/recordController')
const commentsController = require('./controllers/commentsController')
const searchController = require('./controllers/searchController')

router.use('/users', userController)
router.use('/records', recordController)
router.use('/comments', commentsController)
router.use('/search', searchController)

module.exports = router