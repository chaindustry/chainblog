import React from "react";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <span>&copy; Chaindustry {new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
