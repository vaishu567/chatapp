import React, { createContext, useState } from "react";
import "../styles/style.css";

import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
export const myContext = createContext();
const MainContainer = () => {
  const [refresh, setRefresh] = useState(true);
  return (
    <div className="main-container">
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <SideBar />
        <Outlet />
      </myContext.Provider>
    </div>
  );
};

export default MainContainer;
