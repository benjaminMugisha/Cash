import { useState, useEffect, useContext } from "react"; 
import { cancelDD, ddUpdate, getDirectDebits } from "./apiClient"; 
import { AuthContext } from "./AuthContext";

function DirectDebits() {
  const {refreshUser} = useContext(AuthContext);
  const [debits, setDebits] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editAmounts, setEditAmounts] = useState({});

  useEffect(() => {
    fetchDebits(pageNo);
  }, [pageNo]);

  const fetchDebits = async (pageNo) => {
    setLoading(true);
    setError("");
    try {
      const res = await getDirectDebits(pageNo, pageSize);

      setDebits(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);

      //Reset input fields on reload:
      const initialInputs = {};
      res.data.content.forEach(dd => initialInputs[dd.id] = dd.amount);
      setEditAmounts(initialInputs)

    } catch (err) {
      setError("Failed to load direct debits");
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
  

  const cancelDebit = async (loanId, toAccountUsername, amount) => {
    try {
      await cancelDD(loanId);
      setMessage(`✅ your direct debit of ${amount}€ per month to "${toAccountUsername}" ❌cancelled`);  
      setTimeout(() => setMessage(""), 5000);

      fetchDebits(pageNo); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel the direct debit");
    }
  }; 

  // update debit handler:
  const updateDebit = async (id) => {
    try {
      const res = await ddUpdate(id, editAmounts[id]);
      setMessage(`Direct debit to ${res.data.dto.toAccountUsername} updated to ${editAmounts[id]}€ per month`);
      refreshUser();
      setTimeout(() => setMessage(""), 10000);
      fetchDebits(pageNo); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update the direct debit"); 
    }
  };

  return (
    <div>
      <h2> Your Direct Debits </h2>
      <h3>{message}</h3> 

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? ( <p>Loading...</p> 
      ) : debits.length === 0 ? (
        <p>No direct debits found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr> 
              <th> From: </th>
              <th> to account: </th>
              <th> Amount per Month: </th>
              <th> next payment Date </th>
              <th> Status </th>
              <th> Update </th>
              <th> Action </th>
            </tr>
          </thead>

          <tbody>
            {debits.map((dd) => (
              <tr key={dd.id}>
                <td>{dd.fromAccountUsername}</td>
                <td>{dd.toAccountUsername}</td>

                {/* <td>€{dd.amount.toFixed(2)}</td> */}
                <td>
                  <input 
                    type="number" step="0.01" 
                    value={editAmounts[dd.id] ?? dd.amount}
                    onChange={(e) => 
                      setEditAmounts((prev) => ({
                        ...prev, [dd.id]: e.target.value,
                      }))
                    }
                  />
                </td>

                <td>{dd.nextPaymentDate}</td>
                <td>{dd.active ? "active" : "cancelled"}</td>

                <td>{dd.active && (
                  <button onClick={() => updateDebit(dd.id)}>
                    Update
                  </button>
                )}</td>

                <td>{dd.active && (
                  <button onClick={() => cancelDebit(dd.id, dd.toAccountUsername, dd.amount)}> Cancel </button>
                )} </td>

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

export default DirectDebits;
