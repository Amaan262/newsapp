import React from "react";
import load from "./load.gif";
const Loading = () => {
  return (
    <div className="spinner text-center">
      <img src={load} alt="Loading" style={{ width: "50px" }} />
    </div>
  );
};

export default Loading;