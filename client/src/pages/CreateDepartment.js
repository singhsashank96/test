import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CreateDepartment() {
  const userId = window.localStorage.getItem("UserId");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    departmentName:'', departmentType:'', developerID:userId 
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/departments/departments');
      const data = await response.json();
      setDepartments(data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewDepartment({
      departmentName: '',
      departmentType: '',
      developerID: userId
    });
  };
  
  const handleClickOpen1 = (id) => {
    setSelectedDepartmentId(id);
    setOpen1(true);
    
    const selectedDepartment = departments.find(dep => dep._id === id);

    if (selectedDepartment) {
      setNewDepartment({
        departmentName: selectedDepartment.departmentName || '',
        departmentType: selectedDepartment.departmentType || '',
        developerID: userId
      });
    } else {
      console.error('Department not found');
    }
  };
  
  const handleClose1 = () => {
    setOpen1(false);
    setNewDepartment({
      departmentName: '',
      departmentType: '',
      developerID: userId
    });
  };

  const handleChange = (e) => {
    setNewDepartment({ ...newDepartment, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:5000/departments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDepartment)
      });
      if (response.ok) {
        fetchDepartments(); 
        handleClose();
      } else {
        console.error('Failed to create department');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/departments/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchDepartments(); // Refresh the department list
      } else {
        console.error('Failed to delete department');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/departments/update/${selectedDepartmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDepartment)
      });
      if (response.ok) {
        fetchDepartments(); // Refresh the department list
        setOpen1(false); // Close the dialog
        setNewDepartment({ // Reset newDepartment state
          departmentName: '',
          departmentType: '',
          developerID: userId
        });
      } else {
        console.error('Failed to update department');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '58px', margin: 'auto', width: '70vw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '58px' }}>
          <div>
            <h2 style={{ textAlign: 'center' }}>Department List</h2>
          </div>
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Add Department
            </Button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
          {departments.map((department, index) => (
            <tr key={department._id}>
              <th scope="row">{index + 1}</th>
              <td>{department.departmentName}</td>
              <td>{department.departmentType}</td>
              <td>
                <button onClick={() => handleClickOpen1(department._id)}>Update</button>
                <button onClick={() => handleDelete(department._id)}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>

        <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form' }}>
          <DialogTitle>Create Department</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="departmentName"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={newDepartment.departmentName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="type"
              name="departmentType"
              label="Type"
              type="text"
              fullWidth
              variant="standard"
              value={newDepartment.departmentType}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogActions>
        </Dialog>
        
        <Dialog open={open1} onClose={handleClose1} PaperProps={{ component: 'form' }}>
          <DialogTitle>Update Department</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="departmentName"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={newDepartment.departmentName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="type"
              name="departmentType"
              label="Type"
              type="text"
              fullWidth
              variant="standard"
              value={newDepartment.departmentType}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>
  );
}

export default CreateDepartment;
