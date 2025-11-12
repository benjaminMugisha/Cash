import { useState } from "react";
import apiClient from "./apiClient"; 

function Deposit() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.patch("/accounts/deposit", { amount: parseFloat(amount)});

      setMessage(res.data.message);
      setAmount("");
    } catch (err) {
      console.error("Deposit failed: ", err);
      setMessage("❌ Deposit failed");  
    } 
  };

  return (
    <div>
      <h2>Deposit</h2>
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Deposit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Deposit;
