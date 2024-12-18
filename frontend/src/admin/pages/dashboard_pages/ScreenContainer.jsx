import React from "react";
import Dashboard from "./Home";
import TransactionHistory from "./TransactionH";
import OrderList from "./OrderList";
import ApprovalPage from "./Approval";
import Create from "./Create";


const ScreenContainer = ({ adminScreen }) => {
  return (
    <div>
      {adminScreen === "home" && <Dashboard />}
      {adminScreen === "transaction" && <TransactionHistory />}
      {adminScreen === "orders" && <OrderList />}
      {adminScreen === "approval" && <ApprovalPage />}
      {adminScreen === "create" && <Create />}
    </div>
  );
};

export default ScreenContainer;
