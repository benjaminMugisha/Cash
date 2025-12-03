import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Accounts from './Accounts'
import Login from './Login'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import Transfer from './Transfer'
import UserProfile from './UserProfile'
import Loans from './Loans'
import LoanApplicationForm from './LoanApplicationForm'
import DirectDebits from './DirectDebits'
import DirectDebitCreate from './DirectDebitCreate'
import TransactionHistory from './TransactionHistory'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './Dashboard'


function App() {
  return (
    <Routes>
      <Route path='/register' element={ <Register />} />
      <Route path='/login' element={<Login />} />

      <Route element={<ProtectedRoute />}> 

        <Route path="/d" element={<Dashboard />}/>
        <Route path='/' element={ <UserProfile /> } />
        <Route path='/transactions' element={ < TransactionHistory /> }/>

        <Route path='/accounts' element={ <Accounts /> } />
        <Route path='/withdraw' element={ <Withdraw /> } />
        <Route path='/deposit' element={ <Deposit /> } />
        <Route path='/transfer' element={ <Transfer /> } />

        <Route path='/loans' element={  <Loans /> } />
        <Route path='/loan-apply' element={  < LoanApplicationForm /> } />

        <Route path='/dd' element={ < DirectDebits /> }/>
        <Route path='/dd-create' element={ < DirectDebitCreate /> }/>
      </Route>

      <Route path="*" element={<h1>404. Page Not Found</h1>} />

    </Routes>
  )
}

export default App;
