import React, { useContext, useState } from 'react'; 
import { withdraw } from './apiClient'; 
import { AuthContext } from './AuthContext';

function Withdraw() { 
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const {refreshUser} = useContext(AuthContext);

    const handleWithdraw = async (e) => {
        e.preventDefault(); 

        try {
          const res = await withdraw(parseFloat(amount));
          refreshUser();
          setMessage(res.data.message);
          setAmount(""); 
        } catch(err){
          setMessage("❌" + (err.response?.data?.message) || err.message || "Withdraw failed");  
        }
    };

  return (
    <div>
        <h2>Withdraw</h2>
        <form onSubmit={handleWithdraw}>
            <label htmlFor='amount'>Amount</label>
            <input type='number' min="1" step="0.01"
            value={amount} 
            placeholder='Amount (€)' 
            onChange={(e) => setAmount(e.target.value)}
            required 
            />
            <button type='submit'>Withdraw</button>
        </form>
        {message && <p> {message} </p>}
    </div>
  );
} 
export default Withdraw;
