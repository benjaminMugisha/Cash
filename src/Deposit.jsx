import { useState } from "react";
import { deposit } from "./apiClient"

function Deposit() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const res = await deposit(parseFloat(amount));

      setMessage(res.data.message);
      setAmount("");
    } catch (err) {
      setMessage("❌ Deposit failed");  
    } 
  };

  return (
    <div>
      <h2>Deposit</h2>
      <form onSubmit={handleDeposit}>
        <input
          type="number" min="1" step="0.01"
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
