import React, { useEffect, useState } from "react";

function LoansList() {
  const [loans, setLoans] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(5); 
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/loans/account?pageNo=${pageNo}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((data) => {
        setLoans(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error("Error fetching loans:", err));
  }, [pageNo, pageSize]);

  return (
    <div className="container">
      <h2>Loans</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan.loanId}>
            Loan #{loan.loanId} | Principal: {loan.principal} | Remaining:{" "}
            {loan.remainingBalance} | Monthly: {loan.amountToPayEachMonth}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div>
        <button
          onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))}
          disabled={pageNo === 0}
        >
          Previous
        </button>

        <span>
          Page {pageNo + 1} of {totalPages}
        </span>

        <button
          onClick={() => setPageNo((prev) => (prev + 1 < totalPages ? prev + 1 : prev))}
          disabled={pageNo + 1 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default LoansList;
