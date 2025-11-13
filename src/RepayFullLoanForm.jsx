import { useState } from "react";
import apiClient from "./apiClient";

function RepayFullLoanForm() {
  const [loanId, setLoanId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await apiClient.patch(`/loans/repay-full/${loanId}`);
      setMessage(res.data.message || "✅ Loan repaid successfully");
    } catch (err) {
      setError(err.response?.data?.message || "❌ Loan repayment failed");
    }

    setLoanId("");
  };

  return (
    <div>
      <h2>Repay Full Loan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Loan ID: </label>
          <input
            type="number"
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Repay Full Loan</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default RepayFullLoanForm;
