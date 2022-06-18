import { ArrowLeftIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Home/Navbar';
import MainLoading from '../../Components/MainLoading';
import axios from "./../../axios"
import config from "./../../config.json"
export default function NewRequests() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [BookingData, setBookingData] = useState();
    
  
    useEffect(() => {
        axios
        .get(config.api_getallrequests+ "Active/")
        .then((res) => {
            setBookingData(res.data);
          })
          .catch();




      }, []);

  return (
    <div>
      <div>
        {!BookingData ? (
          <MainLoading />
        ) : (
          <div className="max-w-full mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:max-w-screen-2xl lg:px-8">
            {BookingData.map((item, i) => (
              <Link to={"/booking/" + item.id} keys={"dataasdhasjd" + i}>
                <div className="flex items-center mx-6 my-1">
                  <img
                    src={
                      "https://krishnabharambe.pythonanywhere.com/" +
                      item.ServiceID.icon
                    }
                    className=" w-16"
                  />
                  <div className="ml-4">
                    <span className="capitalize block text-gray-800">
                      {item.Status}
                    </span>
                    <span className="text-sm block text-gray-600">
                      {item.ServiceID.title}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )

                }