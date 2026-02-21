import { useState, useEffect } from "react";
import { getTransactionsByEmail } from "../apiClient";

function AdminTransactionSearch() {
  const [tx, setTx] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [hasSearched, setHasSearched] = useState(false);


  const handleSearch = async (pageNo) => {
    try {
      setHasSearched(true);
      setLoading(true);
      setError("");

      const res = await getTransactionsByEmail(email, pageNo, pageSize);
      setTx(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      setError(`${err.response.data.message}. Try again `);
      setTx([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!email.trim()) return;

    handleSearch(pageNo); 
  }, [pageNo]);

  const handlePrev = () => { 
    if (pageNo > 0) setPageNo(pageNo - 1); 
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // setTx([]);
    setPageNo(0);
    setTotalPages(1);
    setError("");
  }

  return (
    <div>
      <h2> User Transactions</h2>

      <input
        type="email" placeholder="Enter user email..."
        value={email} onChange={handleEmailChange}
      />
      <button onClick={() => handleSearch(0)}>Search</button>

      {error && <p style={{color:"red"}}>{error}</p>}

      {!hasSearched ? (
        <p>Enter an email above to search</p>
      ): 
      loading ? (<p>Loading ....</p>) :
      tx.length === 0 ? (
        <p>No Transactions found. </p>
      ) : (
        <>
        <h2>{email}'s Transactions</h2>
        <table border="1">
          <thead>
            <tr>
              {/* <th>owner</th> */}
              <th>TYPE</th>
              <th>amount</th>
              <th>balance</th>
              <th>time</th>
              <th>to account</th>
            </tr>
          </thead>

          <tbody>
            {tx.map((tx) => (
              <tr key={tx.transactionId}>
                {/* <td>{tx.email}</td> */}
                <td>{tx.type}</td>
                <td>{tx.amount}</td>
                <td>{tx.balance}</td>
                <td>{tx.timeStamp}</td>
                <td>{tx.toEmail || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
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










      {/* <ul>
        {transactions.map(tx => (
          <li key={tx.transactionId}>
            {tx.type} - €{tx.amount} - {new Date(tx.timestamp).toLocaleString()}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default AdminTransactionSearch;
