import { useEffect, useState } from "react";
import { getAdmins } from "../apiClient";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAdmins = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getAdmins(pageNo, pageSize);

      setAdmins(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      setError("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [pageNo]);

  const handlePrev = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  return (
    <div>
      <h2>All Admins: </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : admins.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>email</th>
              <th>first name</th>
              <th>last name</th>
              {/* <th>Username</th> */}
              
            </tr>
          </thead>

          <tbody>
            {admins.map((admins) => (
              <tr key={admins.id}>
                <td>{admins.email}</td>
                <td>{admins.firstname}</td>
                <td>{admins.lastname}</td>
                
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

export default Admins;
