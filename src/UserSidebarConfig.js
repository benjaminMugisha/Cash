export const userMenu = [
  {
      title: "Banking",
      items: [
        { label: "Dashboard", path:"/dashboard"},
        { label: "transfer", path: "/transfer" },
        { label: "Withdraw", path: "/withdraw" },
        { label: "deposit", path: "/deposit" },
        { label: "your loans", path:"/loans"},
        { label: "apply for a loan", path:"/loans-apply"},
        { label: "create a direct debit", path:"/direct-debits-create"},
        { label: "your transaction history", path:"/transactions"}
      ]
}, 
{
  title: "Loans",
  items: [
    { label: "Your Loans", path:"/loans"},
    { label: "Apply for Loan", path:"/loans-apply"}
  ]
},
{
  title: "Direct debits",
  items: [
    {label: "Your direct debits", path:"/direct-debits"},
    {label: "Create a direct debit", path:"/direct-debits-create"}
  ]
}
];
