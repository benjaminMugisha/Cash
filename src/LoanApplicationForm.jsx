import { useContext, useState } from "react";
import { applyForLoan } from "./apiClient";
import { AuthContext } from "./AuthContext";

function LoanApplicationForm() {
  const {refreshUser} = useContext(AuthContext);
  const [income, setIncome] = useState("");
  const [principal, setPrincipal] = useState("");
  const [monthsToRepay, setMonthsToRepay] = useState("");
  const [loanData, setLoanData] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoanData("");
    refreshUser();  
    try {
      const res = await applyForLoan(income, principal, monthsToRepay);
      const { message, loanDto } = res.data;
      refreshUser();
      setIncome("");
      setMonthsToRepay("");
      setPrincipal("");

      setLoanData({
        message, 
        remainingBalance: loanDto.remainingBalance,
        monthlyPayment: loanDto.amountToPayEachMonth,
        nextPaymentDate: loanDto.nextPaymentDate
      });
      

    } catch (err) {
      setError(err.response?.data?.message || "❌ Loan application failed. Try again");
    }
  }

  return(
    <div>
      <h2>Apply for a loan. </h2>
      <p><b>5%</b> interest rate</p>

      <form onSubmit={handleSubmit}>
        <label>
          Monthly income(€): 
          <input type="number" value={income} min="10"
          onChange={(e) => setIncome(e.target.value)} required />
        </label>

        <br/>
        <label>
          Loan Principal (€):
          <input type="number" value={principal} min="10" 
          onChange={(e) => setPrincipal(e.target.value)} required />
        </label>

        <br/>
        <label>
          Months To Repay: 
          <input type="number" value={monthsToRepay} min="2"
          onChange={(e) => setMonthsToRepay(e.target.value)}
           required/>
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
