import { useState, useEffect } from "react"; 
import apiClient from "./apiClient"; 

function DirectDebits() {
  const [debits, setDebits] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDebits(pageNo);
  }, [pageNo]);

  const fetchDebits = async (pageNo) => {
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.get("auth/me/direct-debits", {
        params: { pageNo, pageSize },
      });

      setDebits(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to load direct debits");
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
  

  const cancelDebit = async (id, toAccountUsername, amount) => {
    try {
      await apiClient.patch(`dd/cancel/${id}`); 
      setMessage(`✅ direct debit of ${amount}€ per month to ${toAccountUsername} cancelled`);  
      setTimeout(() => setMessage(""), 5000);

      fetchDebits(pageNo); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel the direct debit");
    }
  }; 

  return (
    <div>
      <h2> Your Direct Debits </h2>
      <h3>{message}</h3> 

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? ( <p>Loading...</p> 
      ) : debits.length === 0 ? (
        <p>No direct debits found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr> 
              <th> From: </th>
              <th> to account: </th>
              <th> Amount per Month: </th>
              <th> next payment Date </th>
              <th> Status </th>
              <th> Action </th>
            </tr>
          </thead>

          <tbody>
            {debits.map((dd) => (
              <tr key={dd.id}>
                <td>{dd.fromAccountUsername}</td>
                <td>{dd.toAccountUsername}</td>
                <td>€{dd.amount.toFixed(2)}</td>
                <td>{dd.nextPaymentDate}</td>
                <td>{dd.active ? "active" : "cancelled"}</td>
                <td>{dd.active && (
                  <button onClick={() => cancelDebit(dd.id, dd.toAccountUsername, dd.amount)}> Cancel </button>
                )} </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={handlePrev} disabled={pageNo === 0}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {pageNo + 1} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={pageNo + 1 === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

const thStyle = {
  border: "2px solid #ccc",
  padding: "8px",
  backgroundColor: "#f0f0f0",
  textAlign: "left",
  color: "black"
};

const tdStyle = {
  border: "2px solid #ccc",
  padding: "8px",
  verticalAlign: "top",
  textAlign: "left"
};

export default DirectDebits;
