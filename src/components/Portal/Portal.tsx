import React from "react";
import ReactDOM from "react-dom";
import classes from "./Portal.module.css";

const portalRoot = document.getElementById("portalRoot") as HTMLElement;

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <article className={classes.article}>{children}</article>;
};

const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Wrapper>{children}</Wrapper>, portalRoot)}
    </React.Fragment>
  );
};

export default Portal;
