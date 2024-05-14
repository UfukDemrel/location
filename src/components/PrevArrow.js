import React from 'react';

const PrevArrow = (props) => {
  const { className, style, onClick, showPrev } = props;

  return (
    <div className={className} style={{ ...style, display: showPrev ? "flex" : "none", justifyContent: 'center', lignItems: 'center', background: "black", width: 'auto', height: 'auto', left: '15px', padding: '3px', borderRadius: '10px' }} onClick={onClick}>
        <svg
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
    </div>
  );
};

export default PrevArrow;
