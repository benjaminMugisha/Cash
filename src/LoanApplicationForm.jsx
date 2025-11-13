import { useState } from "react";
import apiClient from "./apiClient";

function LoanApplicationForm() {
  const [income, setIncome] = useState("");
  const [principal, setPrincipal] = useState("");
  const [monthsToRepay, setMonthsToRepay] = useState("");
  const [loanData, setLoanData] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoanData("");

    try {
      const res = await apiClient.post("/loans/apply", {
        income,
        principal,
        monthsToRepay,
    });
    console.log(res.data);
      const { message, loanDto } = res.data;

      setLoanData({
        message, 
        remainingBalance: loanDto.remainingBalance,
        monthlyPayment: loanDto.amountToPayEachMonth,
        nextPaymentDate: loanDto.nextPaymentDate
      });
      
    } catch (err) {
      setError(err.response?.data?.message || "❌ Loan application failed");
    }
  }

  return(
    <div>
      <h2>Apply for a loan</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Monthly income(€): 
          <input type="number" value={income} 
          onChange={(e) => setIncome(e.target.value)} required />
        </label>

        <br/>
        <label>
          Loan Principal (€):
          <input type="number" value={principal} min="3" 
          onChange={(e) => setPrincipal(e.target.value)} required />
        </label>

        <br/>
        <label>
          Months To Repay: 
          <input type="number" value={monthsToRepay} 
          onChange={(e) => setMonthsToRepay(e.target.value)}
          min="2" required/>
        </label>

        <button type="submit">Apply</button> 
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {loanData && (
        <div> 
          <h3> Loan Details: </h3>
          <p><strong> {loanData.message} </strong></p>

          <ul>
            <li> Remaining balance: €{loanData.remainingBalance}</li>
            <li> Next Payment Date: {loanData.nextPaymentDate}</li>
            <li> Monthly Payment: €{loanData.monthlyPayment}</li>
          </ul>
        </ div>
      )}

    </div>
  )
}

export default LoanApplicationForm;
