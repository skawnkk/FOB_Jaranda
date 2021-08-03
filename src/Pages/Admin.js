import React from "react";
import { userAuthority } from "../Utils/Storage";

const Admin = () => {
  const isAdmin = userAuthority();
  return !isAdmin && <div>Admin now</div>;
};

export default Admin;
