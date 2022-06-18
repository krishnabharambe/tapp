import React, { useEffect, useState } from 'react'
import axios from "./../../axios";
import config from "./../../config.json";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function MainServiceView() {
    const unique_id = uuid();
const [ServiceData, setServiceData] = useState([])
    useEffect(() => {
        axios
          .get(config.api_MainServicesList)
          .then((res) => {
            if (res.data) {
                console.log("res.data", res.data)
              setServiceData(res.data);
            }
          })
          .catch((error) => {});
      }, []);


  return (
    <>
    <div className="w-full select-none max-w-7xl mx-auto relative md:hidden px-1">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        slidesPerView={4}
        spaceBetween={5}
        className="mySwiper"
      >
        {ServiceData?.map((item, i) => (
          <li key={unique_id+i+"mainservi"}>
           
            <SwiperSlide>
            <Link to={`/mservice/${item.id}`}>
              <a>
              <div className="aspect-w-4 aspect-h-4 md:aspect-w-1 md:aspect-h-1 my-2">
                <img
                  src={
                    "https://krishnabharambe.pythonanywhere.com/" + item.icon
                  }
                  alt=""
                  className="p-4"
                />
              </div>
              <p className="prose prose-sm font-medium text-center">{item.title}</p></a></Link>
            </SwiperSlide>
          </li>
        ))}
       
      </Swiper>
    </div>


    <div className="w-full select-none max-w-7xl mx-auto relative hidden md:block">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        slidesPerView={10}
        spaceBetween={5}
        className="mySwiper"
      >
        {ServiceData?.map((item, i) => (
          <li key={unique_id+i+"msin"}>
            <SwiperSlide>
            <Link to={`/mservice/${item.id}`}>
              <a>
              <div className="aspect-w-4 aspect-h-4 md:aspect-w-1 md:aspect-h-1">
                <img
                  src={
                    "https://krishnabharambe.pythonanywhere.com/" + item.icon
                  }
                  alt=""
                  className="p-4"
                />
              </div>
              <p className="prose prose-sm font-medium text-center">{item.title}</p></a></Link>
            </SwiperSlide>
          </li>
        ))}
      </Swiper>
    </div>

    </>
  )
}
