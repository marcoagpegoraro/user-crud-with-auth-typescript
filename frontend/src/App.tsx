import { ReactNotifications } from 'react-notifications-component'
import './App.css'
import CreateUser from './components/CreateUser'
import ListUser from './components/ListUser'
import GetToken from './components/GetToken'
import { useState } from 'react'

function App() {
  const [users, setUsers] = useState([]);

  return <>
    <ReactNotifications />
    <GetToken/>
    <div className='content'>
      <CreateUser 
        setUsers={setUsers}
      />
      <ListUser 
        users={users}
        setUsers={setUsers}
      />
    </div>
  </>

}

export default App
