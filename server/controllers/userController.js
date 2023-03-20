const router = require('express').Router()

const userManager = require('../managers/userManager');

router.post('/register', async (req, res) => {
    const { email, password, rePassword, gender } = req.body;
    const result = await userManager.register(email, password, rePassword, gender);

    res.json(result);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await userManager.login(email, password);
    res.json(result);
});

router.get('/logout', (req, res) => {
    res.json({ok: true});
});




module.exports = router