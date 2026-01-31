import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext';
import { getAdminCount } from '../apiClient';

function AdminHome() {
    const [stats, setStats] = useState(null); 
    const {loading} = useContext(AuthContext); 
    const [error, setError] = useState("");

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try{
            const res = await getAdminCount();
            setStats(res.data);
            
        } catch (err) {
            setError("Failed to load admin stats");
        } 
    };

    if(loading) return <h2>Loading dashboard....</h2>
    if(!stats) return <h2>Loading stats...</h2>
    if(error) return <h2>{error}</h2>

  return (
    <div>
        <h2>
            <li>Total users: {stats.totalUsers} </li>
            <li>Total Accounts: {stats.totalAccounts} </li>
            <li>Total Loans: {stats.totalLoans} </li>
            <li>Total Direct debits: {stats.totalDirectDebits} </li>
            <li>Total Transactions: {stats.totalTransactions} </li>
        </h2>
    </div>
  )
}

export default AdminHome;