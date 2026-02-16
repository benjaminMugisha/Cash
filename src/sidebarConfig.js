export const adminMenu = [
    {
      title: "Users",
      items: [
        { label: "Users&Admins", path: "/admin/users" },
        { label: "Create Admin", path: "/admin/create-admin" },
        { label: "All Admins ", path: "/admin/admins" },
        { label: "Inactive Users", path:"/admin/inactive"}
      ]
    },
    {
      title: "Accounts",
      items: [
        { label: "All Accounts", path: "/admin/accounts" }
      ]
    },
    {
      title: "Direct Debits",
      items: [
        { label: "All Direct Debits", path: "/admin/direct-debits" }, 
        {label: "Active Direct Debits", path:"/admin/activedds"},
      ]
    },
    {
        title: "Loans",
        items: [
          { label: "All Loans", path: "/admin/loans" }
        ]
    },
    {
        title: "Transactions",
        items: [
          { label: "All Transactions", path: "/admin/tx" }
        ]
    }
  ];
  
  export const userMenu = [
    {
      title: "Account",
      items: [
        { label: "Account details", path: "/dashboard" },
        { label: "Transfer", path: "/transfer" },
        {label: "Deposit", path:"/deposit"},
        { label: "Withdraw", path: "/withdraw" },
        { label: "Transactions", path: "/transactions" }
      ]
    },
    {
      title: "Loans",
      items: [
        { label: "My Loans", path: "/loans" },
        { label: "Apply", path: "/loans/apply" }
      ]
    },
    {
      title: "Direct debits",
      items: [
        { label: "View and edit Direct debits", path: "/direct-debits" },
        { label: "Create a direct debit", path: "/direct-debits/create" },
      ]
    },
  ];
  
