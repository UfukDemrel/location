import React from 'react';

const NextArrow = (props) => {
  const { className, style, onClick, setShowPrev } = props;

  const handleButton = () => {
    setShowPrev(true);
    console.log('Next button clicked');
  };

  return (
    <div
      className={`${className}`}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        width: 'auto',
        height: 'auto',
        right: '15px',
        padding: '3px',
        borderRadius: '10px',
        border: '2px solid black'
      }}
      onClick={() => {
        handleButton();
        onClick();
      }}
    >
      <svg
        width="2rem"
        height="2rem"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default NextArrow;