import React from "react";
import kloader from "../Assets/images/request-loader.gif";

export default function Loader(props) {
  const { loader } = props;
  return (
    loader ? <div className='loader'>
      <img src={kloader} />
    </div> : ''
  );
}
