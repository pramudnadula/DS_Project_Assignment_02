const { addhall, allHalls } = require('../Controllers/MovieHall');

const router = require('express').Router();



router.post('/', addhall)
router.get('/list', allHalls)


module.exports = router;