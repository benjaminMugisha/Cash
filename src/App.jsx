import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Accounts from './Admin/Accounts'
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
import NavBar from './NavBar'
import AdminDashboard from './Admin/AdminDashboard'
import Users from './Admin/Users'
import PublicRoute from './PublicRoute'
import AdminHome from './Admin/AdminHome'
import AdminDDs from './Admin/AdminDDs'
import AdminLoans from './Admin/AdminLoans'
import AdminTransactions from './Admin/AdminTransactions'
import AdminActiveDds from './Admin/AdminActiveDds'
import AdminCreate from './Admin/AdminCreate'
import Admins from './Admin/Admins'
import InactiveUsers from './Admin/InactiveUsers'
import AppLayout from './AppLayout'


function App() {

  return (
   <>
   <NavBar />
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path='/register' element={ <Register />} />
        <Route path='/login' element={<Login />} />
      </Route>
      {/* <Route path='/logout' element={<Logout />}/> */} 

      <Route element={<ProtectedRoute />}> 
        <Route element={<AppLayout />} >

        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path='/' element={ <UserProfile /> } />
        <Route path='/transactions' element={ < TransactionHistory /> }/>

        <Route path='/withdraw' element={ <Withdraw /> } />
        <Route path='/deposit' element={ <Deposit /> } />
        <Route path='/transfer' element={ <Transfer /> } />

        <Route path='/loans' element={  <Loans /> } />
        <Route path='/loans/apply' element={  < LoanApplicationForm /> } />

        <Route path='/direct-debits' element={ < DirectDebits /> }/>
        <Route path='/direct-debits/create' element={ < DirectDebitCreate /> }/>
       
        </ Route >

          {/* ADMIN ROUTES */}
      <Route path="/admin" element={ <AdminDashboard /> }>
        <Route index element={<AdminHome />} />
        <Route path="accounts" element={<Accounts />}/>
        <Route path="users" element={<Users />} />
        <Route path="activedds" element={<AdminActiveDds />} />
        <Route path="direct-debits" element={< AdminDDs />}/>
        <Route path="loans" element={ <AdminLoans />} />
        <Route path="tx" element={<AdminTransactions />} />
        <Route path="create-admin" element={<AdminCreate />}/>
        <Route path="admins" element={<Admins />}/>
        <Route path="inactive" element={<InactiveUsers />}/>
      </Route>
      </Route> 

      <Route path="*" element={<h1>404. Page Not Found</h1>} />

    </Routes>
    </>
  )
}

export default App;
