const express = require('express');
const router = express.Router();
const { createTenant } = require('../controllers/tenantController');

// create a new tenant
router.post('/create', createTenant);

module.exports = router;