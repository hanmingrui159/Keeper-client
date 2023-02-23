import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright Mingrui Han ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
