import { useEffect, useState } from "react"; 
import apiClient from "./apiClient"; 

function Loans() {
  const [loans, setLoans] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchLoans(pageNo); 
  }, [pageNo]);

  const fetchLoans = async (pageNo) => {
    setLoading(true); 
    try {
      const res = await apiClient.get("auth/me/loans", {
        params: { pageNo, pageSize },
     });

      setLoans(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("failed to fetch loans");
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
      <h2>your loans:</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (<p>Loading .... </p>)
      : loans.length === 0 ? ( <p>No loans found</p>) :(
        <table border="1">
        <thead>
          <tr>
            <th>€ per month</th> 
            <th>Status</th>
            <th>remanining balance</th>
            <th>next payment date</th> 
          </tr>
        </thead>

        <tbody>
          {loans.map((l) => (
            <tr key={l.loanId}> 
              <td>{l.amountToPayEachMonth}</td>
              <td>{l.active ? "Active" : "fully repaid"}</td>
              <td>{l.remainingBalance}</td>
              <td>{l.nextPaymentDate}</td>
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
export default Loans;
