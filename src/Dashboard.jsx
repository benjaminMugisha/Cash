import React, { useContext, useEffect, useState } from 'react'; 
import { getDirectDebits, getLoans, getTransactions, userInfo } from './apiClient';
import { AuthContext } from './AuthContext';
import {Link} from "react-router-dom";
import ActionCard from './ActionCard';

function Dashboard() {
    const {token, user} = useContext(AuthContext);
    const [loansCount, setLoansCount] = useState(0); 
    const [ddCount, setddCount] = useState(0); 
    const [recentT, setRecentT] = useState([]); 
    const [loading, setloading] = useState(true); 
    const [error, setError] = useState("");

    useEffect(() => {
        if(!token) return;

        async function fetchData() {
            try {
                setloading(true);

                const [ loanRes, ddRes, txRes] = await Promise.all([
                    getLoans(), getDirectDebits(), getTransactions(0, 3) 
                ])
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

        <ActionCard
            title="is your account Balance"
            count ={` ${user?.accountBalance}€`}
            link="/"
            buttonText="Go to Account"
            showWhenZero={true}
        />

        <ActionCard 
            title="Active Loans"
            count={loansCount}
            link="/loans"
            buttonText="View / Repay / Apply"
        />

        <ActionCard
            title="Active Direct Debits"
            count={ddCount}
            link="/dd"
            buttonText="View / Update Amount / Cancel"
        />
         <ActionCard
            title="Logout"
            link="/logout"
            buttonText="Logout??"
        />

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
            <button>👉 click to view Your transactions</button>
            </Link>
        </section>

    </div>
  );
}

export default Dashboard; 
