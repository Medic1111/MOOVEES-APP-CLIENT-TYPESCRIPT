import React from "react";
import classes from "./Wrapper.module.css";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className={classes.main}>{children}</main>;
};

export default Wrapper;
