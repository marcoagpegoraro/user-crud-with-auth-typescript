import { Button } from "@mui/material";

export default function GetToken() {

  const handleGetToken = async () => {
    const response = await fetch('http://localhost:3000/api/v1/token', {
      method: 'GET',
    });

    const body = await response.json()
    localStorage.setItem("token","Bearer " + body.token);
  }

  return <>
    <Button type="submit" variant="contained" color="primary" onClick={handleGetToken}>
      Get token and save in localstorage
    </Button>
  </>

}