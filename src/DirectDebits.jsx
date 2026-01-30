import { useState, useEffect, useContext } from "react"; 
import { cancelDD, ddUpdate, getDirectDebits } from "./apiClient"; 
import { AuthContext } from "./AuthContext";

function DirectDebits() {
  const {refreshUser, loading} = useContext(AuthContext);
  const [debits, setDebits] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editAmounts, setEditAmounts] = useState({});

  useEffect(() => {
    fetchDebits(pageNo);
  }, [pageNo]);

  const fetchDebits = async (pageNo) => {
    setError("");
    try {
      const res = await getDirectDebits(pageNo, pageSize);

      setDebits(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);

      const initialInputs = {};
      res.data.content.forEach(dd => initialInputs[dd.id] = dd.amount);
      setEditAmounts(initialInputs)

    } catch (err) {
      setError("Failed to load direct debits");
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
      refreshUser(); 
      setMessage(`✅ your direct debit of ${amount}€ per month to "${toAccountUsername}" ❌cancelled`);  
      setTimeout(() => setMessage(""), 5000);

      fetchDebits(pageNo); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel the direct debit");
    }
  }; 

  const updateDebit = async (id) => {
    const originalAmount = debits.find(d => d.id === id)?.amount;
    const newAmount = Number(editAmounts[id]);

    if (Number(originalAmount) === newAmount) {
      setMessage("Direct debit amount unchanged"); 
      setTimeout(() => setMessage(""), 5000); 
      return; 
    }

    try { 
      const res = await ddUpdate(id, editAmounts[id]);
      console.log(res.data.status);
      const status = res.data.status;

      if(status === "CANCELLED") {
        setMessage(`Direct Debit to ${res.data.dto.toAccountUsername} cancelled. `)
      } else if (status === "UNCHANGED") {
        setMessage(`Direct debit ${res.data.dto.amount} unchanged`)
      } else if( status === "UPDATED") {
      setMessage(`Direct debit to ${res.data.dto.toAccountUsername} updated from ${originalAmount}€ to ${res.data.dto.amount}€ per month`);
      refreshUser();
      }

      setTimeout(() => setMessage(""), 20000);
      refreshUser();
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
              <th>Amount per month: </th>
              <th> next payment Date </th>
              <th> Change Amount: </th>
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
                <td>{dd.amount}</td>
                <td>{dd.nextPaymentDate}</td> 
                
                <td> <input type="number" min="10" placeholder="amount"
                  onChange={(e) => setEditAmounts((prev) => ({
                    ...prev, [dd.id]: e.target.value,
                  }))}
                  />
                </td>

                <td>{dd.active ? "active" : "cancelled"}</td>

                <td>{dd.active && (
                  <button disabled={Number(editAmounts[dd.id] === Number(dd.amount))}
                  onClick={() => updateDebit(dd.id)}>
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
