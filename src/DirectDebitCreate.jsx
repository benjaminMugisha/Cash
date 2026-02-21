import { useContext, useState } from "react"; 
import { ddCreate } from "./apiClient";
import { AuthContext } from "./AuthContext";

function DirectDebitCreate() {
  const [toIban, setToIban] = useState("");
  const [amount, setAmount] = useState("");
  const {loading} = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [successData, setSuccessData] = useState(null);
  const {refreshUser} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await ddCreate(toIban, parseFloat(amount));
      console.log(res.data);       

      if(res.data.status === "UPDATED") 
        setSuccess(`your direct debit to ${res.data.dto.toAccountUsername}  was updated to ${res.data.dto.amount}. 
       next payment date is: ${res.data.dto.nextPaymentDate}`);
      console.log(res.data.dto.toAccountUsername);

      if(res.data.status === "CREATED_AND_PAID") 
      setSuccess(`direct debit createc to ${res.data.dto.toAccountUsername} of €${res.data.dto.amount}.`);
      setSuccessData(res.data.dto);

      setToIban("");
      setAmount("");
      setError("");
      refreshUser();

      setTimeout(() => setSuccessData(null), 5000);
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError(
        err.response?.data?.message || "❌ Failed to create direct debit"
      );
    } finally {
      setError("");
    }  
  };

  return (
    <div>
      <h2>Create Direct Debit</h2>
      {success && <h2> ✅✅{success}</h2>}

      <form onSubmit={handleSubmit}>
        <label>
          To IBAN:
          <input
            type="text"
            value={toIban}
            onChange={(e) => setToIban(e.target.value)}
            required
            placeholder="IE29BENJ0123456789"       
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
          <h3>Direct Debit Information: </h3>
          <p><strong>Amount:</strong> €{successData.amount}</p>
          <p><strong>Next Payment Date:</strong> {successData.nextPaymentDate}</p>
        </div>
      )}
    </div>
  );
}

export default DirectDebitCreate;
