import React, { useContext, useEffect, useState } from 'react';
import { getDirectDebits, getLoans, getTransactions, userInfo } from './apiClient';
import { AuthContext } from './AuthContext';
import {Link} from "react-router-dom";

function Dashboard() {
    const {token} = useContext(AuthContext);
    const [ user, setUser] = useState(null); //stateful user because we want the most recent data. 
    // not from the context since context updates only when the token changes. 
    const [loansCount, setLoansCount] = useState(0); 
    const [ddCount, setddCount] = useState(0); 
    const [recentT, setRecentT] = useState([]); //recent transactions.
    const [loading, setloading] = useState(true); 
    const [ error, setError] = useState("");

    useEffect(() => {
        if(!token) return;

        async function fetchData() {
            try {
                const [userRes, loanRes, ddRes, txRes] = await Promise.all([
                    userInfo(), getLoans(), getDirectDebits(), getTransactions(0, 3) 
                ])
                setloading(true) 

                setUser(userRes.data);
                setLoansCount(loanRes.data.totalElements || 0);
                setddCount((ddRes.data.totalElements) || 0);
                setRecentT(txRes.data.content ?? []);

            } catch (err) {
                setError("failed to load dashboard"); 
            } finally {
                setloading(false);
            }
        }

        fetchData();
    }, [token]);

    if (loading) return <p>Loading dashboard...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div>
        <h1>Welcome {user?.firstName || user?.accountUsername}</h1>

        <div>
        <div style = {{ border: "1px solid #ddd", borderRadius: 8}}> 
            <h3>Account Balance: </h3>
            <p>€{user?.accountBalance ?? "N/A"}</p>
        </div>

        <div style = {{ border: "1px solid #ddd", borderRadius: 8}}> 
            <h3>Active loans</h3>
            <p>{loansCount}</p>

            <Link to="/loans">
                <button>👉Your active loans</button>
            </Link> 
        </div>

        <div style = {{ border: "1px solid #ddd", borderRadius: 8}}> 
            <h3>Direct Debits:</h3>
            <p>{ddCount}</p>

            <Link to="/dd">
                <button>👉 your Direct Debits</button>
            </Link>
        </div>
        </div>

        <section style={{ marginTop: 20 }}>
            <h3>Recent transactions:</h3>
            {recentT.length === 0 ? (
                <p>No recent transactions. </p>
            ) : (
                <ul>
                    {recentT.map((tx) => (
                        <li key={tx.transactionId}>
                            {tx.type} - €{tx.amount} - Date: &nbsp;
                            { new Date(Date.parse(tx.timestamp)).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )} 
            <Link to="/transactions">
            <button>👉 Your transactions</button>
            </Link>
        </section>
    </div>
  );
}

export default Dashboard; 
