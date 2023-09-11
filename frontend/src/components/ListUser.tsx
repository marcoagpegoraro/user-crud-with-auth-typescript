import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import showNotification from '../utils/Notification';


export default function ListUser() {
  const [users, setUsers] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      const token = localStorage.getItem("token")

      if(!token){
          showNotification("Warning", "Token not found, please get another token", "warning")
          return
      }

      const response = await fetch('http://localhost:3000/api/v1/users',{
        method: 'GET',
        headers: {authorization: token}
      })
      const body = await response.json()
      
      if(!body.success){
        showNotification("Warning", "Invalid token, please get another token", "warning")
        return 
      }
      
      setUsers(body.users)
    }

    fetchData()
      .catch(console.error);
  }, []);
  return <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Position ID</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Photo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.position_id}</TableCell>
              <TableCell>{user.position}</TableCell>
              <TableCell>
                <img src={user.photo} alt="User Photo" width="50" height="50" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>

}