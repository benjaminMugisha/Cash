import { useEffect, useState } from "react";
import { getAdminLoans } from "../apiClient";

function AdminLoans() {
  const [loans, setLoans] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLoans = async (page) => {
    setLoading(true);
    setError("");
    try {
      const res = await getAdminLoans(pageNo, pageSize);

      setLoans(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);
      setError("");

    } catch (err) {
      setError("failed to fetch Loans"); 
    } finally {
      setLoading(false);
      setError("")
    } 
  }

  useEffect(() => {
    fetchLoans(pageNo); 
  }, [pageNo]);

  const handlePrev = () => { 
    if (pageNo > 0) setPageNo(pageNo - 1); 
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  return (
    <div>
      <h2>All Loans</h2>

      { error && <p style={{ color: "red" }}>{ error }</p>}
      {loading ? (<p>Loading ....</p>) :
      loans.length === 0 ? (
        <p>No Loans found. </p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Owner</th>
              <th>Principal €</th>
              <th>remaining amount</th>
              <th>loan date</th>
              <th>next payment</th>
              <th>active?</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loans) => (
              <tr key={loans.loanId}>
                <td>{loans.loanOwner}</td>
                <td>{loans.principal}</td>
                <td>{loans.remainingBalance}</td>
                {/* <td>{loans.startDate}</td> */}
                <td>{new Date(loans.startDate).toLocaleString()}</td>
                <td>{loans.nextPaymentDate}</td>
                <td style={loans.active ? {color: "green"} : {color:"red"}}>{loans.active ? "Active" : "Repaid" }</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 20 }}>
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

export default AdminLoans;
