import { useEffect, useState } from "react";
import { getAdminDD } from "../apiClient"; 

function AdminDDs() {
  const [dd, setDDs] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDDs = async (page) => {
    setLoading(true);
    setError("");

    try {
      const res = await getAdminDD(page, pageSize);

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
    fetchDDs(pageNo); 
  }, [pageNo]);

  const handlePrev = () => { 
    if (pageNo > 0) setPageNo(pageNo - 1); 
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  return (
    <div>
      <h2>All Direct Debits</h2>

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
              <th>Active ? </th>
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
                <td>{dd.active ? "Yes" : "No" }</td>
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

export default AdminDDs;
