const express = require('express');
const router = express.Router();
const { getPriorityInbox } = require('../controller/priorityInboxController');

router.get('/priority-inbox', getPriorityInbox);

module.exports = router;