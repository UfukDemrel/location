import React from 'react';

const NextArrow = (props) => {
  const { className, style, onClick, setShowPrev } = props;

  const handleButton = () => {
    setShowPrev(true);
    console.log("Next button clicked");
  };

  return (
    <div className={className} style={{ ...style, display: "block", background: "red" }} onClick={() => { handleButton(); onClick(); }}>
      Next
    </div>
  );
};

export default NextArrow;
