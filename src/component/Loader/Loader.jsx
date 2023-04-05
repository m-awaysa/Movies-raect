import React from 'react';
import './Loader.css';


const Loader = ({ classes = '' }) => {
  return (
    <div className={"sk-chase loader " + classes}>
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
    </div>
  )
};

export default Loader;