const express = require('express');
const router = express.Router();
const { createDepartment, updateDepartment, deleteDepartment, getAllDepartments } = require('../controller/departmentController');

// Routes for department operations
router.post('/create', createDepartment); // Create department API
router.put('/update/:id', updateDepartment); // Update department API
router.delete('/delete/:id', deleteDepartment); // Delete department API
router.get('/departments', getAllDepartments); // Get all departments API

module.exports = router;
