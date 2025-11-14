import { useEffect, useState } from "react";
import apiClient from "./apiClient";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchAccounts = async (page) => {
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.get("/accounts/all", {
        params: {pageNo: page, pageSize}
      });

      setAccounts(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);


    } catch (err) {
      setError("failed to fetch accounts"); 
      console.error("Error fetching accounts: ", err);
    } finally {
      setLoading(false);
    } 
  }
  useEffect(() => {
    fetchAccounts(pageNo); 
  }, [pageNo]);

  const handlePrev = () => { 
    if (pageNo > 0) setPageNo(pageNo - 1); 
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  return (
    <div>
      <h2>Accounts</h2>

      { error && <p style={{ color: "red" }}>{ error }</p>}
      {loading ? (<p>Loading ....</p>) :
      accounts.length === 0 ? (
        <p>No Accounts found. </p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.id}>
                <td>{acc.id}</td>
                <td>{acc.accountUsername}</td>
                <td>{acc.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div tyle={{ marginTop: 20 }}>
        <button onClick={handlePrev} disabled={pageNo === 0}>
          Previous
        </button>
        <span style={{ margin : "0 10px" }}> 
          Page {pageNo + 1} of {totalPages} 
        </span>
        <button onClick={handleNext} disabled={pageNo + 1 === totalPages}>
          Next
        </button>
      </div> 



    </div>
  );
}



export default Accounts;

