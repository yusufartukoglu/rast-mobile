/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { FaRegTimesCircle, FaGripLines } from "react-icons/fa";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="mobile-nav" onClick={toggleNav}>
        {isOpen ? <FaRegTimesCircle /> : <FaGripLines />}
      </div>
      <nav className={`nav ${isOpen ? "active" : ""}`} onClick={toggleNav}>
        <a href="#" className="nav-item">
          Hakkımızda
        </a>
        <a href="#" className="nav-item">
          Jüri - Yarışma Yazılımı
        </a>
        <a href="#" className="nav-item">
          Word Ninja
        </a>
        <a href="#" className="nav-item">
          Word Pyramids
        </a>
      </nav>
    </>
  );
};

export default Nav;
