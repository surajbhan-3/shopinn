import React from "react";
import BarLoader from "react-spinners/BarLoader";
import "./Loader.css";

function Loader() {
  return (
    <div>
      <div className="sweet-loading">
        <h1>ShopInn</h1>
        <BarLoader className="loder-e" color="#ff4e5c" height={10} width={250} loading={true} />
      </div>
    </div>
  );
}

export default Loader;
