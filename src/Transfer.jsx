import React from 'react';
import { useState } from "react";
import apiClient from './apiClient';

function Transfer() {
  const [transfer, setTransfer] = useState({
    toIban: "",
    amount: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTransfer({ ...transfer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await apiClient.patch("/accounts/transfer", {
        toIban: transfer.toIban,
        amount: parseFloat(transfer.amount)
      });
    setSuccess("✅ " + res.data.message);
      setTransfer({ toIban: "", amount: "" });
    } catch (err) {
      setError(err.response?.data?.message || "❌ Transfer failed.");
    }
  };

  return (
    <div>
      <h2>Transfer Funds</h2>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="toIban"
          placeholder="Recipient IBAN"
          value={transfer.toIban}
          onChange={handleChange}
          required
        /> 
        <input
          type="number"
          step="0.01"
          name="amount"
          placeholder="Amount (€)"
          value={transfer.amount}
          onChange={handleChange}
          required
        />
        <button type="submit">
          Transfer
        </button>
      </form>
    </div>
  );
}

export default Transfer;
