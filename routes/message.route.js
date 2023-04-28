const express = require('express');
const {getAllMessage, getSinglseMessage, saveMessage, deleteMessage} = require('../controllers/message.controller');

const router = express.Router();

router.get('/message', getAllMessage);
router.get('/message/:id', getSinglseMessage);
router.post('/message', saveMessage);
router.delete('/message/:id', deleteMessage);

module.exports = router;