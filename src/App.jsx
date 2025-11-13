import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Accounts from './Accounts'
import Login from './Login'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import Transfer from './Transfer'
import UserProfile from './UserProfile'
import Loans from './Loans'
import RepayFullLoanForm from './RepayFullLoanForm'
import LoanApplicationForm from './LoanApplicationForm'
import DirectDebits from './DirectDebits'
import DirectDebitCreate from './DirectDebitCreate'
import TransactionHistory from './TransactionHistory'


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
      <Route path='/loan/repay' element={< RepayFullLoanForm /> }/>
      <Route path='/loan/apply' element={< LoanApplicationForm /> }/>
      <Route path='/dd' element={< DirectDebits /> }/>
      <Route path='/dd-create' element={< DirectDebitCreate /> }/>
      <Route path='/transaction' element={< TransactionHistory /> }/>
    </Routes>
  )
}

export default App;
