function LoanAccepted({ loanDto }) {
    const { loanId, principal, remainingBalance, amountToPayEachMonth, nextPaymentDate, active } = loanDto;
  
    return (
      <div>
        <p>Loan accepted:</p>
        <ul>
          <li>Loan ID: {loanId}</li>
          <li>Principal: €{principal.toFixed(2)}</li>
          <li>Remaining Balance: €{remainingBalance.toFixed(2)}</li>
          <li>Amount to Pay Each Month: €{amountToPayEachMonth.toFixed(2)}</li>
          <li>Next Payment Date: {nextPaymentDate}</li>
          <li>Active: {active ? "Yes" : "No"}</li>
        </ul>
      </div>
    );
  }
export default LoanAccepted;