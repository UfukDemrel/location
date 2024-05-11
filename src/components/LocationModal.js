import React, { useState } from "react";
import Slider from "react-slick";

const LocationModal = ({ closeModal, clickedLocation }) => {
  const [openMenus, setOpenMenus] = useState(
    Array(clickedLocation.menu.length).fill(false)
  );

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
        <svg
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
            className="mb-2 rounded-t-2xl"
            src={clickedLocation.image2}
            alt="alt"
          />
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

                          <div className="flex justify-between items-center mt-3">
                            <div className="font-semibold">{data.name}</div>
                            <div className="font-semibold">100₺</div>
                          </div>

                          <div className="flex justify-between items-center mt-3 gap-3">
                            <div class="quantity-control rounded-lg">
                                <button class="quantity-btn">
                                    <svg viewBox="0 0 409.6 409.6" fill="black">
                                        <g>
                                        <g>
                                            <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                                        </g>
                                        </g>
                                    </svg>
                                </button>
                                <input type="number" class="quantity-input" value="1" step="1" min="1" max="10" name="quantity"/>
                                <button class="quantity-btn" >
                                    <svg viewBox="0 0 426.66667 426.66667" fill="black">
                                        <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                                    </svg>
                                </button>
                            </div>
                            <button class="btn btn5 rounded-lg">Next</button>
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
