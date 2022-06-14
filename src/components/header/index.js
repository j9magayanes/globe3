import React from "react";
import "./index.css";
import Search from '../search';
import Popup from '../popup';


function Header() {
  return (
    
    <div className="header">
      <div className="brand"> 
        <div className="upday"><h3 className="title">News Globe</h3></div> 
      </div>
      <div className="search-bar"><Search/></div>
 
    </div>
   
  );
}

export default Header;