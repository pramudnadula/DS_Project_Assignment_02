const { allshows, createShow, specificshows, getoneshow } = require('../Controllers/Show');

const router = require('express').Router();



router.post('/', createShow)
router.post("/all", allshows)
router.get("/all/:id", specificshows)
router.get('/getone/:id', getoneshow)

module.exports = router;