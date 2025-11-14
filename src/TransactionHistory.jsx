import { useEffect, useState } from "react";
import apiClient from "./apiClient";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions(pageNo);
  }, [pageNo]);

  const fetchTransactions = async (pageNo) => {
    setLoading(true);
    try {
      const res = await apiClient.get("/transactions", {
    params: {pageNo, pageSize}});
      setTransactions(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => { 
    if (pageNo > 0) setPageNo(pageNo - 1); 
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  return (
    <div>
      <h2>Transaction History</h2>
  
      {error && <p style={{ color: "red" }}>{error}</p>}
      { loading ? (<p> Loading ... </p>) :
      transactions.length === 0 ? (
        <p> No transactions found </p>
      ) : (
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
      )}
      <div style={{ marginTop: 20 }}>
        <button onClick={handlePrev} disabled={pageNo === 0}> Previous </button>
        <span style={{ margni: "0 10 px "}}> Page {pageNo + 1} of {totalPages}</span>
        <button onClick={handleNext} disabled={pageNo + 1 === totalPages}> next </button>
      </div> 
    </div>
  ); 
}

export default TransactionHistory;
