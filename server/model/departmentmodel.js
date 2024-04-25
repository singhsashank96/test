const mongoose = require('mongoose');

const departmentInfoSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true
    },
    departmentType: {
        type: String,
        required: true
    },
    developerID: {
        type: String,
        required: true
    }
});

const DepartmentInfo = mongoose.model('DepartmentInfo', departmentInfoSchema);

module.exports = DepartmentInfo;
