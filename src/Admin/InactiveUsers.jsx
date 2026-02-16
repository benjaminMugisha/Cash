import { useEffect, useState } from "react"; 
import { deactivateUser, reactivateUser, getInactiveUsers } from "../apiClient";

function InactiveUsers() {
  const [users, setUsers] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [rsuccess, setRSuccess] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getInactiveUsers(pageNo, pageSize);
      setUsers(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      setError("Failed to fetch inactive users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pageNo]);

  const handlePrev = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

const handleReactivate = async (userId) => {
  try {
  const response = await reactivateUser(userId);
  setRSuccess(` **${response.data.email}** has been RE-activated ✅✅✅. `);
  fetchUsers();
  setTimeout(() => setRSuccess(""), 3000);
  } catch(err) {
  setError(err.response?.data?.message || "Failed to Re-activate user"); 
  setTimeout(() => setError(""), 3000);
  }
}

  return (
    <div>
      <h2>Inactive Users: </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {rsuccess && <h3 style={{color:"green" }}> {rsuccess} </h3>}

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Username</th>
              <th>Balance €</th>
              <th>IBAN</th>
              <th style={{color: "green"}}>Reactivate User</th>
              
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.accountUsername}</td>
                <td>{user.accountBalance}</td>
                <td>{user.iban}</td>

                <td> {!user.active &&
                  <button onClick={() => handleReactivate(user.id)} disabled={loading}> 
                CLICK TO REACTIVATE
                </button>}</td>
                
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

export default InactiveUsers;
