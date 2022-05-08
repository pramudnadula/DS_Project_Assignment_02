const { allcategory, createCategory } = require('../Controllers/Category');

const router = require('express').Router();



router.get('/list', allcategory)
router.post("/create", createCategory)

module.exports = router;