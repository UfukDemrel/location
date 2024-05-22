import React, { useState } from "react";
import Slider from "react-slick";

const LocationModal = ({ closeModal, clickedLocation }) => {
  const [activeSizeIndex, setActiveSizeIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [checkout, setCheckout] = useState(false);
  const [openMenus, setOpenMenus] = useState(
    Array(clickedLocation.menu.length).fill(false)
  );
  const [basePrice, setBasePrice] = useState(0);
  const [sizePrice, setSizePrice] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  const toggleMenu = (index) => {
    const newOpenMenus = openMenus.map((menu, i) => (i === index ? !menu : false));
    setOpenMenus(newOpenMenus);
  };
  
  const closeMenu = (index) => {
    const newOpenMenus = [...openMenus];
    newOpenMenus[index] = false;
    setOpenMenus(newOpenMenus);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < 10) {
        return prevQuantity + 1;
      } else {
        return prevQuantity;
      }
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      } else {
        return prevQuantity;
      }
    });
  };

  const handleSizeSelection = (sizeIndex, sizePrice) => {
    setActiveSizeIndex(sizeIndex);
    setSizePrice(sizePrice);
  };

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <div className="custom-prev-arrow" onClick={() => {}}>
        <svg
          className="svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    prevArrow: (
      <div className="custom-next-arrow" onClick={() => {}}>
        <svg
          className="svg"
          width="24"
          height="24"
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
    ),
  };

  return (
    <>
      <div
        className="flex justify-end text-right absolute p-2 cursor-pointer"
        style={{ width: "inherit" }}
      >
        <svg
          onClick={closeModal}
          fill="white"
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.707,12.293a1,1,0,1,1-1.414,1.414L12,13.414,9.707,15.707a1,1,0,0,1-1.414-1.414L10.586,12,8.293,9.707A1,1,0,0,1,9.707,8.293L12,10.586l2.293-2.293a1,1,0,0,1,1.414,1.414L13.414,12Z" />
        </svg>
      </div>
      {clickedLocation && (
        <div>
          <img
            className="rounded-t-2xl"
            src={clickedLocation.image2}
            alt="alt"
          />
          <div className="p-3">
            
            <div className="flex justify-between items-center">
              <h1 className="font-semibold title">{clickedLocation.title}</h1>
              { checkout && (
                <div className="flex items-center gap-2 border-2 rounded-lg pl-2 pr-2 pt-1 pb-1 bg-lime-600">
                  <h3 className="font-semibold text-white">Checkout</h3>
                  <svg fill="white" width="1.3rem" height="1.3rem" viewBox="0 0 52 52" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><path d="M38.67,27.35A11.33,11.33,0,1,1,27.35,38.67h0A11.34,11.34,0,0,1,38.67,27.35ZM20.36,37.63a4,4,0,1,1-4,4v0A4,4,0,0,1,20.36,37.63ZM42.8,34.07l-6.06,6.79L34,38.09a.79.79,0,0,0-1.11,0l0,0-1.11,1.07a.7.7,0,0,0-.07,1l.07.08L35.6,44a1.62,1.62,0,0,0,1.14.48A1.47,1.47,0,0,0,37.87,44l7.19-7.87a.83.83,0,0,0,0-1l-1.12-1.05a.79.79,0,0,0-1.11,0ZM8.2,2a2.42,2.42,0,0,1,2.25,1.7h0l.62,2.16H46.36A1.5,1.5,0,0,1,47.9,7.31a1.24,1.24,0,0,1-.06.47h0L43.66,22.43a1.42,1.42,0,0,1-.52.82,16.42,16.42,0,0,0-4.47-.64,16,16,0,0,0-5.47,1H19.36a2.2,2.2,0,0,0-2.22,2.18,2.11,2.11,0,0,0,.13.75h0v.08a2.26,2.26,0,0,0,2.17,1.62h7.1a16,16,0,0,0-2.77,4.61H16a2.32,2.32,0,0,1-2.25-1.7h0L6.5,6.62H4.33A2.37,2.37,0,0,1,2,4.22V4.16A2.46,2.46,0,0,1,4.48,2H8.2Z"/></svg>
                </div>
              )}
            </div>

            <div className="mt-2" id={clickedLocation.menu.id}>
              {clickedLocation.menu.map((click, index) => (
                <div className="ghost rounded-lg p-2 mb-2" key={index}>
                  <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-2">
                      <img width={40} src={click.icon} alt={click.name} />
                      <h1 className="font-semibold">{click.name}</h1>
                    </div>
                    {openMenus[index] ? (
                      <svg
                        className="cursor-pointer"
                        onClick={() => closeMenu(index)}
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" fill="white" />
                        <path
                          d="M6 12H18"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="cursor-pointer"
                        onClick={() => toggleMenu(index)}
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" fill="white" />
                        <path
                          d="M12 6V18"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 12H18"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  {openMenus[index] && (
                    <Slider {...settings}>
                      {click.data.map((data, dataIndex) => (
                        <div
                          key={dataIndex}
                          id={data.id}
                          className="flex flex-col items-center gap-1"
                        >
                          {data.image && (
                            <div className="flex items-center h-full w-full justify-center">
                                <img
                                className=" h-36"
                                src={data.image}
                                alt={data.name}
                                />
                            </div>
                          )}

                          <div className="font-semibold text-center text-base">{data.name}</div>

                          {data.size && (
                            <div className="flex justify-between items-center mt-3 mb-3">
                              {data.size.map((size, sizeIndex) => (
                                <div
                                  key={size.id}
                                  className={`pl-3 pr-3 pt-1 pb-1 rounded-lg font-semibold text-sm border-2 bg-slate-200 border-black ${
                                    sizeIndex === activeSizeIndex ? "active" : ""
                                  }`}
                                  onClick={() => handleSizeSelection(sizeIndex, size.price)}
                                >
                                  {size.name}
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex justify-center rounded-lg mt-3 mb-3">
                            <button
                              className={`border-2 border-slate-300 p-2 rounded-lg ${activeButton === "decrease" ? "number" : ""}`}
                              onClick={() => {
                                decreaseQuantity();
                                handleButtonClick("decrease");
                              }}
                            >
                              <svg viewBox="0 0 409.6 409.6" className="fill-slate-400" width="1rem" height="1rem">
                                <g>
                                  <g>
                                    <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                                  </g>
                                </g>
                              </svg>
                            </button>
                            <input
                              type="number"
                              className="text-center"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              step="1"
                              min="1"
                              max="10"
                              name="quantity"
                            />
                            <button
                              className={`border-2 border-slate-300 p-2 rounded-lg ${activeButton === "increase" ? "number" : ""}`}
                              onClick={() => {
                                increaseQuantity();
                                handleButtonClick("increase");
                              }}
                            >
                              <svg viewBox="0 0 426.66667 426.66667" className="fill-slate-400" width="1rem" height="1rem">
                                <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex justify-between items-center mt-3 mb-1">
                            <div className="font-semibold">{(data.price + sizePrice) * quantity}₺</div>
                            <div className="flex justify-between items-center gap-3 bg-black text-white p-2 rounded-lg">
                              <svg
                                version="1.0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.3rem"
                                height="1.3rem"
                                viewBox="0 0 512.000000 512.000000"
                                preserveAspectRatio="xMidYMid meet"
                              >
                                <g
                                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                  fill="white"
                                  stroke="none"
                                >
                                  <path
                                    d="M2393 4785 c-314 -57 -591 -276 -714 -566 -67 -157 -72 -193 -77
                                -541 l-4 -318 -414 0 c-328 0 -421 -3 -447 -14 -42 -17 -85 -68 -92 -110 -8
                                -42 269 -2383 291 -2457 48 -163 174 -314 324 -388 150 -74 98 -71 1300 -71
                                1202 0 1150 -3 1300 71 150 74 276 225 324 388 22 74 299 2415 291 2457 -7 42
                                -50 93 -92 110 -26 11 -119 14 -447 14 l-414 0 -4 318 c-5 348 -10 384 -77
                                541 -98 230 -315 436 -548 521 -159 57 -342 74 -500 45z m302 -320 c238 -50
                                439 -251 490 -491 11 -51 15 -141 15 -341 l0 -273 -640 0 -640 0 0 273 c0 315
                                8 370 70 493 132 261 418 399 705 339z m-872 -1439 c103 -43 128 -177 48 -257
                                -65 -65 -157 -65 -222 0 -124 123 13 325 174 257z m1600 0 c103 -43 128 -177
                                48 -257 -112 -113 -296 -12 -267 146 18 94 128 150 219 111z"
                                  />
                                </g>
                              </svg>
                              <div onClick={() => setCheckout(true)} className="text-sm cursor-pointer">Shop Now</div>
                            </div>
                          </div>
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
    </>
  );
};

export default LocationModal;
