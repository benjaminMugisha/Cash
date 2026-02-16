import { useEffect, useState } from "react";
import { getAdminTx } from "../apiClient";

function AdminTransactions() {
  const [tx, setTx] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTransactions = async (page) => {
    setLoading(true);
    setError("");
    try {
      const res = await getAdminTx(pageNo, pageSize);

      setTx(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      setError("failed to fetch accounts"); 
    } finally {
      setLoading(false);
    } 
  }

  useEffect(() => {
    fetchTransactions(pageNo); 
  }, [pageNo]);

  const handlePrev = () => { 
    if (pageNo > 0) setPageNo(pageNo - 1); 
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  return (
    <div>
      <h2>All Transactions</h2>

      { error && <p style={{ color: "red" }}>{ error }</p>}
      {loading ? (<p>Loading ....</p>) :
      tx.length === 0 ? (
        <p>No Transactions found. </p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th> owner</th>
              <th>TYPE</th>
              <th>amount</th>
              <th>time</th>
              <th>to account</th>
            </tr>
          </thead>

          <tbody>
            {tx.map((tx) => (
              <tr key={tx.transactionId}>
                <td>{tx.email}</td>
                <td>{tx.type}</td>
                <td>{tx.amount}</td>
                <td>{tx.timeStamp}</td>
                <td>{tx.toEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={handlePrev} disabled={pageNo === 0}>
          Previous
        </button>
        <span style={{ margin: "0 10 px "}}>
          {totalPages === 0 ? "No pages" : `Page ${pageNo + 1} of ${totalPages}` }
        </span>
        <button onClick={handleNext} disabled={pageNo + 1 === totalPages}>
          Next
        </button>
      </div> 

    </div>
  );
}

export default AdminTransactions;
