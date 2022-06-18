import { ArrowLeftIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";
import MainLoading from "../MainLoading";
import axios from "./../../axios";
import config from "./../../config.json";

export default function ShowAllBookings() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [BookingData, setBookingData] = useState();

  useEffect(() => {
    axios
      .get(config.api_getBookings, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setBookingData(res.data);
      })
      .catch();

    console.log("BookingData", BookingData);
  }, []);

  return (
    <div>
      <div>
        <nav
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:hidden"
        >
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => navigate(-1)}
              >
                <span className="sr-only">Open menu</span>
                <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <h2 className="text-xl font-medium tracking-tight text-gray-900">
                  My Bookings
                </h2>
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden md:block">
          <Navbar />
        </div>

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
  );
}
