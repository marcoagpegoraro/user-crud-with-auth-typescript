import { useState } from 'react'
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { Store } from 'react-notifications-component'
import showNotification from '../utils/Notification';
import getUsersService from '../services/getUsersService';

export default function CreateUser({setUsers}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position_id: '',
    phone: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token")

    if(!token){
        showNotification("Warning", "Token not found, please get another token", "warning")
        return
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('position_id', formData.position_id);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('photo', formData.photo);


    const response = await fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      body: formDataToSend,
      headers: {authorization: token}
    });

    const responseBody = await response.json()

    console.log()

    if (response.ok) 
        showNotification("Success", "User inserted into the database: "+ responseBody.message, "success")
    else {        
        showNotification("Error", "Error sending the user: " + responseBody.message, "danger")
        return
    }

    const users = await getUsersService(token)

    setUsers(users)

    setFormData({
      name: '',
      email: '',
      position_id: '',
      phone: '',
      photo: null,
    });
  };
  return (
    <>
       <div style={{ padding: 16, maxWidth: 400 }}>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h4" gutterBottom>
        User Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Position ID"
                name="position_id"
                fullWidth
                value={formData.position_id}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
    </>
  )
}


