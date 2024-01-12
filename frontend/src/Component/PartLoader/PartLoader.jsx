import React from "react";
// import BarLoader from "react-spinners/BarLoader";
import PacmanLoader from "react-spinners/PacmanLoader"
import "./PartLoader.css";

function PartLoader() {
  return (
    <div className="main-part-sweet-loading">
      <div className="partsweet-loading">
        <h1>Please wait...</h1>
        <PacmanLoader className="loder-e" color="#ff4e5c" height={10} width={250} loading={true} />
      </div>
    </div>
  );
}

export default PartLoader;
