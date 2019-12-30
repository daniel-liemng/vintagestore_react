import React from "react";

const Hero = ({ children }) => {
  return (
    <div className="hero">
      <div className="banner">
        <h1>think, code, deploy</h1>
        <p>embrace your choice - we do</p>
        {/* child is placed here - dynamic */}
        {children}
      </div>
    </div>
  );
};

export default Hero;
