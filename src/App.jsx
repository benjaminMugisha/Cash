import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Accounts from './Accounts'
import Login from './Login'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import Transfer from './Transfer'
import UserProfile from './UserProfile'
import Loans from './Loans'

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/accounts' element={<Accounts />} />
      <Route path='/login' element={<Login />} />
      <Route path='/withdraw' element={<Withdraw />} />
      <Route path='/deposit' element={<Deposit />} />
      <Route path='/transfer' element={<Transfer />} />
      <Route path='/' element={<UserProfile />} />
      <Route path='/loans' element={<Loans />} />

    </Routes>
  )
}

export default App;
