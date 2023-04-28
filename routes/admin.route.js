const express = require('express');
const { getAdmin, createAdmin } = require('../controllers/admin.controller');

const router = express.Router();

router.post('/admin/login', getAdmin );
router.post('/admin/register', createAdmin );

module.exports = router;