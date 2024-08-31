// controllers/contactController.js
const express = require('express');
const router = express.Router();
const { getContacts, insertContact } = require('../models/contactModel');

router.get('/api/contact', async (req, res) => {
    try {
        const contacts = await getContacts();
        res.json({ statusCode: 200, data: contacts, message: 'Data retrieved successfully' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Failed to retrieve data', error: err });
    }
});

router.post('/api/contact', async (req, res) => {
    try {
        const contact = req.body;
        const result = await insertContact(contact);
        res.json({ statusCode: 201, data: result, message: 'Contact data inserted successfully' });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: 'Failed to insert contact data', error: err });
    }
});

module.exports = router;
