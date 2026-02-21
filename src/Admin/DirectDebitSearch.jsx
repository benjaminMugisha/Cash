import { useEffect, useState } from "react";
import { searchDD } from "../apiClient";

function DirectDebitSearch() {
  const [dd, setDD] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (pageNo) => {
    if(!email.trim()) return;

    try {
        setHasSearched(true)
        setLoading(true);
        const res = await searchDD(email, pageNo, pageSize);

        setDD(res.data.content);
        setPageNo(res.data.pageNo);
        setTotalPages(res.data.totalPages);
    } catch (err) {
        setError("User not found. try again");
        setDD([]);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    if(!email.trim()) return;

    handleSearch(pageNo);
  }, [pageNo]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setDD([]);
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
        <h2> Direct Debits by User</h2>
        <input
        type="email" placeholder="Enter user email..."
        value={email} onChange={handleEmailChange}
      />
      <button onClick={() => handleSearch(0)} disabled={loading || !email.trim()}>
        Search
      </button>

      { error && <p style={{ color: "red" }}>{ error }</p>}

      { !hasSearched ? (
        <p>Enter an email above to search</p>
      ) :
      loading ? (<p>Loading ....</p>) :
      dd.length === 0 ? (
        <p>No Direct debits found. </p>
      ) : (
        <>
        <h2>{email}'s Direct Debits</h2>

        <table border="1">
          <thead>
            <tr> 
                <th>from</th>
              <th> to user: </th>
              <th>Amount per month: </th>
              <th> next payment Date </th>
              <th> Status </th>
            </tr>
          </thead>

          <tbody>
            {dd.map((dd) => (
              <tr key={dd.id}>
                <td>{dd.fromAccountUsername}</td>
                <td>{dd.toAccountUsername}</td>
                <td>{dd.amount}</td>
                <td>{dd.nextPaymentDate}</td> 
                <td style={dd.active ? {color: "green"} : {color:"red"}}>{dd.active ? "Active" : "Inactive" }</td>
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

export default DirectDebitSearch;
