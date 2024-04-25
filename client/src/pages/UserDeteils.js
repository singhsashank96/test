import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

function UserDetails() {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const userId = window.localStorage.getItem('UserId');

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const data = await response.json();
        setEmployeeDetails(data.data); // Set the employee details fetched from the backend
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (userId) {
      fetchEmployeeDetails(); // Fetch employee details when the component mounts
    }
  }, [userId]); // Trigger fetchEmployeeDetails whenever userId changes

  return (
    <div>
      <Navbar />
      {employeeDetails ? (
        <div>
          <h2>User Details</h2>
          <p>Name: {employeeDetails.name}</p>
          <p>Email: {employeeDetails.email}</p>
          <p>Phone Number: {employeeDetails.phoneNumber}</p>
          <p>Address: {employeeDetails.address}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserDetails;
