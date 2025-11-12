import { useEffect, useState } from "react";
import apiClient from "./apiClient";

function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await apiClient.get("/accounts/all");
        setAccounts(res.data.content);
      } catch (err) {
        console.error("Error fetching accounts: ", err);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <div>
      <h2>Accounts</h2>
      {accounts.length === 0 ? (
        <p>No Accounts found. </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.id}>
                <td>{acc.id}</td>
                <td>{acc.accountUsername}</td>
                <td>{acc.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Accounts;
