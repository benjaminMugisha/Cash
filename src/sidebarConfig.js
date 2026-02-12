export const adminMenu = [
    {
      title: "Users",
      items: [
        { label: "All Users&Admins", path: "/admin/users" },
        { label: "Create Admin", path: "/admin/create-admin" },
        { label: "All Admins ", path: "/admin/admins" }
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
        { label: "All Direct Debits", path: "/admin/dd" }, 
        {label: "All **Active** Direct Debits", path:"/admin/activedds"}
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
      title: "Banking",
      items: [
        { label: "Accounts", path: "/dashboard" },
        { label: "Transactions", path: "/transactions" }
      ]
    },
    {
      title: "Loans",
      items: [
        { label: "My Loans", path: "/loans" },
        { label: "Apply", path: "/loans-apply" }
      ]
    }
  ];
  