import { useEffect, useState } from "react";
import { getActiveDds } from "../apiClient"; 

function AdminActiveDds() {
  const [dd, setDDs] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchActiveDDs = async (page) => {
    setLoading(true);
    setError("");

    try {
      const res = await getActiveDds(page, pageSize);

      setDDs(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      setError("failed to fetch direct debits"); 
    } finally {
      setLoading(false);
    } 
  }

  useEffect(() => {
    fetchActiveDDs(pageNo); 
  }, [pageNo]);

  const handlePrev = () => { 
    if (pageNo > 0) setPageNo(pageNo - 1); 
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  return (
    <div>
      <h2>All Active Direct Debits</h2>

      { error && <p style={{ color: "red" }}>{ error }</p>}
      {loading ? (<p>Loading ....</p>) :
      dd.length === 0 ? (
        <p>No Direct debits found. </p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>from username</th>
              <th>to username</th>
              <th>amount</th>
              <th>next payment</th>
            </tr>
          </thead>

          <tbody>
            {dd.map((dd) => (
              <tr key={dd.id}>
                <td>{dd.id}</td>
                <td>{dd.fromAccountUsername}</td>
                <td>{dd.toAccountUsername}</td>
                <td>{dd.amount.toFixed(2)}</td>
                <td>{dd.nextPaymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AdminActiveDds;
