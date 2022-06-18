import React, { useEffect, useState } from "react";
import axios from "./../../axios";
import config from "./../../config.json";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuid } from 'uuid';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ImageSlider() {
  const [ImageData, setImageData] = useState();
  const unique_id = uuid();
  useEffect(() => {
    axios
      .get(config.api_allSlidercards)
      .then((res) => {
        if (res.data) {
          setImageData(res.data);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      {ImageData ? (
        <div className="w-full select-none max-w-screen-2xl mx-auto relative">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {ImageData?.map((item, i) => (
              <li key={unique_id+i+"img"}>
                <SwiperSlide>
                  {" "}
                  <div className="aspect-w-16 aspect-h-7 md:aspect-h-4 ">
                    <img
                      src={
                        "https://krishnabharambe.pythonanywhere.com/" +
                        item.image
                      }
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              </li>
            ))}
          </Swiper>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
