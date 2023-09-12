import showNotification from "../utils/Notification"

export default async function getUsersService(token){

    const response = await fetch('http://localhost:3000/api/v1/users',{
        method: 'GET',
        headers: {authorization: token}
      })
      const body = await response.json()
      
      if(!body.success){
        showNotification("Warning", "Invalid token, please get another token", "warning")
        return 
      }

      return body.users
}