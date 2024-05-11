import React, { useState } from "react";
import Slider from "react-slick";

const LocationModal = ({ closeModal, clickedLocation }) => {
  const [openMenus, setOpenMenus] = useState(Array(clickedLocation.menu.length).fill(false));

  const toggleMenu = (index) => {
    const newOpenMenus = [...openMenus];
    newOpenMenus[index] = !newOpenMenus[index];
    setOpenMenus(newOpenMenus);
  };

  const closeMenu = (index) => {
    const newOpenMenus = [...openMenus];
    newOpenMenus[index] = false;
    setOpenMenus(newOpenMenus);
  };

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
        <div className="custom-prev-arrow" onClick={() => {}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
      prevArrow: (
        <div className="custom-next-arrow" onClick={() => {}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
  };

  return (
    <div className="w-full fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="w-4/5 bg-white rounded-2xl h-4/5">
        <div className="flex justify-end text-right absolute p-2 cursor-pointer" style={{ width: "inherit" }}>
          <svg onClick={closeModal} fill="white" width="2rem" height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.707,12.293a1,1,0,1,1-1.414,1.414L12,13.414,9.707,15.707a1,1,0,0,1-1.414-1.414L10.586,12,8.293,9.707A1,1,0,0,1,9.707,8.293L12,10.586l2.293-2.293a1,1,0,0,1,1.414,1.414L13.414,12Z" />
          </svg>
        </div>
        {clickedLocation && (
          <div>
            <img className="mb-2 rounded-t-2xl" src={clickedLocation.image2} alt="alt" />
            <div className="p-3">
              <h1 className="font-semibold title">{clickedLocation.title}</h1>
              <p className="text-sm title">{clickedLocation.description}</p>
              <div className="mt-2" id={clickedLocation.menu.id}>
                {clickedLocation.menu.map((click, index) => (
                  <div className="ghost rounded-lg p-2 mb-2" key={index}>
                    <div className="flex justify-between items-center">
                      <div className="flex justify-start items-center gap-2">
                        <img width={40} src={click.icon} alt={click.name} />
                        <h1 className="font-semibold">{click.name}</h1>
                      </div>
                      {openMenus[index] ? (
                        <svg onClick={() => closeMenu(index)} width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" fill="white"/>
                            <path d="M6 12H18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg
                          onClick={() => toggleMenu(index)}
                          width="2rem"
                          height="2rem"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="24" height="24" fill="white" />
                          <path d="M12 6V18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6 12H18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    {openMenus[index] && (
                      <Slider {...settings}>
                        {click.data.map((data, dataIndex) => (
                          <div key={dataIndex} id={data.id} className="flex flex-col items-center gap-1">
                            <div>{data.name}</div>
                            {data.image && <img src={data.image} alt={data.name} className=" rounded-lg" />}
                          </div>
                        ))}
                      </Slider>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationModal;
