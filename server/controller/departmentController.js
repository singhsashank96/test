const DepartmentInfo = require('../model/departmentmodel');

exports.createDepartment = async (req, res) => {
  try {
    const { departmentName, departmentType, developerID } = req.body;

    const newDepartmentInfo = new DepartmentInfo({ departmentName, departmentType, developerID });
    await newDepartmentInfo.save();

    res.status(201).json({ message: 'Department info created successfully', data: newDepartmentInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName, departmentType, developerID } = req.body;

    const updatedDepartmentInfo = await DepartmentInfo.findByIdAndUpdate(id, { departmentName, departmentType, developerID }, { new: true });

    if (!updatedDepartmentInfo) {
      return res.status(404).json({ message: 'Department info not found' });
    }

    res.status(200).json({ message: 'Department info updated successfully', data: updatedDepartmentInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDepartmentInfo = await DepartmentInfo.findByIdAndDelete(id);

    if (!deletedDepartmentInfo) {
      return res.status(404).json({ message: 'Department info not found' });
    }

    res.status(200).json({ message: 'Department info deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departmentInfos = await DepartmentInfo.find();
    res.status(200).json({ data: departmentInfos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


