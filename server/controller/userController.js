const User = require('../model/usermodel');

exports.register = async (req, res) => {
  try {
    const { name, email, phoneNumber, address, role, password, department } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      phoneNumber,
      address,
      role,
      password,
      department // Optionally include department
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If login successful, respond with name, email, and id
    res.status(200).json({ name: user.name, email: user.email, id: user._id , role:user.role});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('-password');
    res.status(200).json({ data: employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber, address, department } = req.body;
      console.log(req.body)
  
      const employee = await User.findById(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      employee.name = name;
      employee.email = email;
      employee.phoneNumber = phoneNumber;
      employee.address = address;
      employee.department = department; 
  
      await employee.save();
  
      res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.deleteEmployee = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.searchEmployees = async (req, res) => {
    try {
      const { name, address } = req.params; // Assuming name and address are provided as route parameters
      const query = {};
  
      if (name) {
        query.name = { $regex: new RegExp(name, 'i') };
      }
      if (address) {
        query.address = { $regex: new RegExp(address, 'i') };
      }
  
      const employees = await User.find(query);
      res.json({ data: employees });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  exports.filterEmployees = async (req, res) => {
    try {
      const { location, name, sortOrder } = req.query;
      let query = {};
      if (location) {
        query.location = location;
      }
      if (name) {
        query.name = { $regex: new RegExp(name, 'i') };
      }
      let employees = await User.find(query);
      if (sortOrder === 'asc') {
        employees = employees.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOrder === 'desc') {
        employees = employees.sort((a, b) => b.name.localeCompare(a.name));
      }
      res.json({ data: employees });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.updateDepartment = async (req, res) => {
    console.log("test")
    try {
      const { id } = req.params;
      const { department } = req.body;
  
      // Find the user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the department
      user.department = department;
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ message: 'Department updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };