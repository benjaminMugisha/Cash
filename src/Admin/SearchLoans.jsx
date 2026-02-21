import { useEffect, useState } from "react";
import { searchLoans } from "../apiClient";

function SearchLoans() {
  const [loans, setLoans] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (pageNo) => {
    try {
        setHasSearched(true);
        setLoading(true);
        setError("");

        const res = await searchLoans(email, pageNo, pageSize);
        setLoans(res.data.content);
        setPageNo(res.data.pageNo);
        setTotalPages(res.data.totalPages);
    } catch (err) {
        // setError("User not found. try again");
      setError(`${err.response.data.message}. Try again `);
        setLoans([]);
        console.log(err);
    } finally {
        setLoading(false);
    }
  } 

  useEffect(() => {
    if (!email.trim()) return;

    handleSearch(pageNo); 
  }, [pageNo]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLoans([]);
    setPageNo(0);
    setTotalPages(1);
    setError("");
  }
  const handlePrev = () => { 
    if (pageNo > 0) setPageNo(pageNo - 1); 
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  return (
    <div>
        <h2> Loans by User</h2> 
        <input
        type="email" placeholder="Enter user email..."
        value={email} onChange={handleEmailChange}
      />
      <button onClick={() => handleSearch(0)} disabled={loading || !email.trim()}>
        Search
      </button>

      { error && <p style={{ color: "red" }}>{ error }</p>}

      {!hasSearched ? (
        <p>Enter an email above to search</p>
      ) : loading ? (<p>Loading ....</p>) :
      loans.length === 0 ? (
        <p>No Loans found. </p>
      ) : (
        <>
        <h2>{email}'s Loans</h2>
        
        <table border="1">
          <thead>
            <tr>
              <th>Principal €</th>
              <th>remaining amount</th>
              <th>start date</th>
              <th>next payment</th>
              <th>active?</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loans) => (
              <tr key={loans.loanId}>
                <td>{loans.principal}</td>
                <td>{loans.remainingBalance}</td>
                <td>{loans.startDate}</td>
                <td>{loans.nextPaymentDate}</td>
                <td style={loans.active ? {color: "green"} : {color:"red"}}>
                  {loans.active ? "Active" : "Inactive"}
                </td> 
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

export default SearchLoans;
