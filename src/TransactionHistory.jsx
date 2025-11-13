import { useEffect, useState } from "react";
import apiClient from "./apiClient";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await apiClient.get("/transactions?pageNo=0&pageSize=10");
        setTransactions(res.data.content);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load transactions");
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount (€)</th>
            <th>Time</th>
            <th>To Account</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.transactionId}>
              <td>{tx.type}</td>
              <td>{tx.amount}</td>
              <td>{new Date(tx.timestamp).toLocaleString()}</td>
              <td>{tx.toAccountUsername || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;
