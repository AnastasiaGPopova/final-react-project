const router = require('express').Router()
const parser = require('../utils/parser')

const userManager = require('../managers/userManager');

router.post('/register', async (req, res) => {
    const { email, password, rePassword, gender } = req.body;
    try{
    const result = await userManager.register(email, password, rePassword, gender);
    res.json(result);
    }catch(err){
        const erM = parser.parseError(err)
        console.log(erM)
        res.json(parser.parseError(err))
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await userManager.login(email, password);
    console.log(result)
    res.json(result);
});

router.get('/logout', (req, res) => {
    res.json({ok: true});
});


router.get('/', async (req, res) => {
    const {userEmail} = req.body
    console.log(req.body)
    const result = await userManager.getCurrentUser(req.user.email)
    console.log(result)
    res.json(result)
});




module.exports = router