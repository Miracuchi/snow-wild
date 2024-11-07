import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext } from "react";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(AuthContext);
  console.log("authContext", context);

  return <div>content</div>;
};

export default Dashboard;
