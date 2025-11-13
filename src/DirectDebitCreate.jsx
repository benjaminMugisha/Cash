import { useState } from "react";
import apiClient from "./apiClient";

function DirectDebitCreate() {
  const [toIban, setToIban] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    setSuccessData(null);

    try {
      const res = await apiClient.post("dd/create", {
        toIban,
        amount: Number(amount),
      });

      setSuccessData(res.data);  
      setToIban("");
      setAmount("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "❌ Failed to create direct debit"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Direct Debit</h2>

      <form onSubmit={handleSubmit}>
        <label>
          To IBAN:
          <input
            type="text"
            value={toIban}
            onChange={(e) => setToIban(e.target.value)}
            required
            placeholder="IE29BENJ1234567890"       
          />
        </label>

        <label>
          Amount (€):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      {successData && (
        <div>
          <h3>Direct Debit Created</h3>
          <p><strong>ID:</strong> {successData.id || successData.directDebitId}</p>
          <p><strong>Amount:</strong> €{successData.amount}</p>
          <p><strong>Next Payment Date:</strong> {successData.nextPaymentDate}</p>
          <p><strong>Status:</strong> {successData.active ? "Active" : "Inactive"}</p>
        </div>
      )}
    </div>
  );
}

export default DirectDebitCreate;
