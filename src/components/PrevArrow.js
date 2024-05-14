import React from 'react';

const PrevArrow = (props) => {
  const { className, style, onClick, showPrev } = props;

  return (
    <div className={className} style={{ ...style, display: showPrev ? "block" : "none", background: "red" }} onClick={onClick}>
      Previous
    </div>
  );
};

export default PrevArrow;
