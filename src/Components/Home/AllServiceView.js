import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Scrollbar } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import axios from "./../../axios";
import config from "./../../config.json"
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function AllServiceView() {
    const unique_id = uuid();


    const [ServiceData, setServiceData] = useState([])
    useEffect(() => {
        axios
          .get(config.api_allServicesList)
          .then((res) => {
            if (res.data) {
                console.log("res.data", res.data)
              setServiceData(res.data);
            }
          })
          .catch((error) => {});
      }, []);



  return (
    <div>
    {ServiceData?.map((item, i) => (
      <div key={unique_id+i+"data"}>
        <div className="bg-white">
          <div className="max-w-full mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:max-w-screen-2xl lg:px-8">
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link to={`/mservice/${item.id}`}>
                    <a>
                      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                        {item.title}
                      </h2>
                    </a>
                  </Link>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900">
                <Link to={"/mservice/" + item.id}>
                  <a>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </a>
                </Link>
              </p>
            </div>

            <div className="mt-3">
              <Swiper
                scrollbar={{
                  hide: true,
                }}
                modules={[Scrollbar]}
                slidesPerView={2}
                spaceBetween={10}
                className="mySwiper"
              >
                {item.mservice?.map((product,pos) => (
                
                    <li key={unique_id+pos}>
                      <SwiperSlide>
                        <Link to={'/mservice/service/'+product.id}>
                        <div>
                          <div key={product.id} className="group relative">
                            <div className="min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md group-hover:opacity-75 lg:h-80 lg:aspect-none">
                              <img
                                src={
                                  "https://krishnabharambe.pythonanywhere.com/" +
                                  product.TileImage
                                }
                                alt={product.image}
                                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                              />
                            </div>

                            {/* <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm text-gray-700">
                                  <a to={product.title}>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    />
                                    {product.title}
                                  </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.title}
                                </p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {product.title}
                              </p>
                            </div> */}
                          </div>
                        </div>
                        </Link>
                      </SwiperSlide>
                    </li>
                
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}
