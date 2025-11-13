// import { useEffect, useState } from "react";
// import apiClient from "./apiClient";

// function DirectDebits() {
//   const [directDebits, setDirectDebits] = useState([]);
//   const [pageNo, setPageNo] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchDirectDebits = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await apiClient.get("/auth/me/direct-debits", {
//         params: { pageNo, pageSize },
//       });
//       setDirectDebits(res.data.directDebits || []);
//     } catch (err) {
//       setError(err.response?.data?.message || "❌ Failed to load direct debits");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDirectDebits();
//   }, [pageNo, pageSize]);

//   return (
//     <div>
//       <h2>Active Direct Debits</h2>

//       {error && <p>{error}</p>}
//       {loading && <p>Loading...</p>}

//       {!loading && !error && directDebits.length === 0 && (
//         <p>No active direct debits found.</p>
//       )}

//       {!loading && !error && directDebits.length > 0 && (
//         <table> 
//           <thead>
//             <tr>
//               <th>Description</th>
//               <th>Amount (€)</th>
//               <th>Next Payment</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {directDebits.map((dd) => (
//               <tr key={dd.id}>
//                 <td style={tdStyle}>{dd.description}</td>
//                 <td style={tdStyle}>{dd.amount}</td>
//                 <td style={tdStyle}>{dd.nextPaymentDate}</td>
//                 <td style={tdStyle}>{dd.active ? "Active" : "Inactive"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div>
//         <button
//           onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))}
//           disabled={pageNo === 0 || loading}
//         >
//           Prev
//         </button>
//         <span>Page {pageNo + 1}</span>
//         <button onClick={() => setPageNo((prev) => prev + 1)} disabled={loading}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DirectDebits;

import { useState, useEffect } from "react";
import apiClient from "./apiClient";

function DirectDebits() {
  const [directDebits, setDirectDebits] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(10); 
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDirectDebits = async (page) => {
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.get("auth/me/direct-debits", {
        params: { pageNo: page, pageSize },
      });
      setDirectDebits(res.data.content);
      setPageNo(res.data.pageNo);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to load direct debits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectDebits(pageNo);
  }, [pageNo]);

  const handlePrev = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  return (
    <div>
      <h2>Your Direct Debits</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : directDebits.length === 0 ? (
        <p>No direct debits found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Payee</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {directDebits.map((dd) => (
              <tr key={dd.id}>
                <td>{dd.id}</td>
                <td>{dd.payeeName}</td>
                <td>€{dd.amount.toFixed(2)}</td>
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
