import React, {useState} from 'react';
import { transfer } from "./apiClient";

function Transfer() {
  const [formData, setFormData] = useState({
    toIban: "",
    amount: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
    const res = await transfer(
      formData.toIban,
      parseFloat(formData.amount)
    ); 

    setSuccess("✅ " + res.data.message);
    setFormData({ toIban: "", amount: "" });
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
          value={formData.toIban}
          onChange={handleChange}
          required
        /> 
        <input
          type="number" min="1" step="0.01"
          name="amount" placeholder="Amount (€)"
          value={formData.amount}
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
