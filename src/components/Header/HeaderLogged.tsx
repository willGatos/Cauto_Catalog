import React, { FC } from "react";
import MainNav2Logged from "./MainNav2Logged";

export interface HeaderLoggedProps {
  logo;
}

const HeaderLogged: FC<HeaderLoggedProps> = ({ logo }) => {
  return (
    <div className="nc-HeaderLogged sticky top-0 w-full z-40 ">
      <MainNav2Logged logo={logo} />
    </div>
  );
};

export default HeaderLogged;
