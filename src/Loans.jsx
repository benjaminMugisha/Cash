import { useEffect, useState } from "react"; 
import apiClient from "./apiClient"; 

function Loans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await apiClient.get("auth/me/loans");
        setLoans(res.data.content); 
      } catch (err) {
        console.error("Error fetching accounts: ", err);
      }
    };
    fetchLoans();
  }, []);

  if(loans.length === 0) {
    return <p>No Loans found.</p>
  }

  return (
    <div>
      <h2>Loans of your account:</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }} >
        <thead>
          <tr>
            <th style={thStyle}>Loan ID</th>
            <th style={thStyle}>Details</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.loanId}>
              <td style={tdStyle}>{loan.loanId}</td>
              <td style={tdStyle}> 
                Principal: €{loan.principal.toFixed(2)} <br />
                Remaining Balance: €{loan.remainingBalance.toFixed(2)} <br />
                Amount to Pay Each Month: €{loan.amountToPayEachMonth.toFixed(2)} <br />
                Start Date: {loan.startDate} <br />
                Next Payment Date: {loan.nextPaymentDate} <br />
                Active: {loan.active ? "Yes" : "No"}
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
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

export default Loans;
