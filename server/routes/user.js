const express = require('express');
const { register, login, getAllEmployees, getUserById  , updateEmployee , updateDepartment , deleteEmployee , searchEmployees , filterEmployees} = require('../controller/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/employees', getAllEmployees);
router.get('/:id', getUserById);
router.put('/update/:id', updateEmployee);
router.put('/update/department/:id', updateDepartment);
router.delete('/delete/:id', deleteEmployee); 
router.get('/search', searchEmployees); 
router.get('/filter', filterEmployees); 
module.exports = router;
