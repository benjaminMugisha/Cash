import { useContext, useEffect, useState } from "react"; 
import {  getLoans, repayCustom, repayFullLoan } from "./apiClient"; 
import { AuthContext } from "./AuthContext"; 

function Loans() {
  const {refreshUser} = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [customAmount, setCustomAmount] = useState({});

  useEffect(() => {
    fetchLoans(pageNo); 
  }, [pageNo]);

  const fetchLoans = async (pageNo, pageSize) => {

    setLoading(true); 
    try {
      const res = await getLoans(pageNo, pageSize);
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

  const repayFully = async (loanId) => {
    try {
      const response = await repayFullLoan(loanId);
      refreshUser();
      setSuccess(`✅✅✅  ${response.data.message}`);
      setTimeout(() => setSuccess(""), 5000);
      fetchLoans(pageNo);
    } catch (err) {
      setError("errorrr ======");
    }
  }

  const repayCustomAmount = async (loanId) => { 
    const amount = customAmount[loanId];
    refreshUser(); 

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return; 
    }

    try {
    const response = await repayCustom(loanId, amount); 
    refreshUser();
    setSuccess(`✅✅✅  ${response.data.message}`);
    setTimeout(() => setSuccess(""), 10000);
    fetchLoans(pageNo); 
    } catch (err) {
      setError("errorrrrr========");
    }
  } 

  const handleAmountChange = (loanId, value) => {
    setCustomAmount(prev => ({
      ...prev, [loanId]: value
    }))
  }

  return (
    <div>
      <h2>your loans:</h2>
      <h3>{success}</h3>
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
            <th>Repay fully</th>
            <th>Repay custom amount: </th>
          </tr>
        </thead>

        <tbody>
          {loans.map((l) => (
            <tr key={l.loanId}> 
              <td>{l.amountToPayEachMonth}</td>
              <td>{l.active ? "Active" : "fully repaid"}</td>
              <td>{l.remainingBalance}</td>
              <td>{l.nextPaymentDate}</td>
              <td>{l.active && (
                <button onClick={() => repayFully(l.loanId)}> CLICK TO REPAY FULLY </button>
              )} 
              
              </td>
              <td>
              {l.active && (
                <>
                <input type="number" min="1" placeholder="amount"
                value={customAmount[l.loanId] || ""} 
                onChange={(e) => handleAmountChange(l.loanId, e.target.value)}
                />
                <button onClick={() => repayCustomAmount(l.loanId)}>REPAY CUSTOM </button>
                </>
              )}
              </td>

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
