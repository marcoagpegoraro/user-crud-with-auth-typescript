import { ReactNotifications } from 'react-notifications-component'
import './App.css'
import CreateUser from './components/CreateUser'
import ListUser from './components/ListUser'
import GetToken from './components/GetToken'

function App() {

  return <>
    <ReactNotifications />
    <GetToken/>
    <div className='content'>
      <CreateUser />
      <ListUser />
    </div>
  </>

}

export default App
