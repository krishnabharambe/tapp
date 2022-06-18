import { ArrowLeftIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import MainLoading from "../MainLoading";
import axios from "./../../axios";
import config from "./../../config.json";
export default function SubService() {
  const [Loading, setLoading] = useState(false);
  const { subID } = useParams();
  const [ServiceData, setServiceData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(config.api_getSubService + subID + "/")
      .then((res) => {
        if (res.data) {
          setServiceData(res.data);
          console.log("data--->", ServiceData);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setLoading(false);
      });
    setLoading(false);
  }, []);

  if (Loading) {
    return <MainLoading />;
  }
  if (!ServiceData) {
    return <MainLoading />;
  }

  return (
    <div>
      {" "}
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
                  {ServiceData?.title}
                </h2>
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden md:block">
          <Navbar />
        </div>

        <div className="bg-white">
          <div className="max-w-full mx-auto px-4 sm:py-8 sm:px-6 lg:max-w-screen-2xl lg:px-8">
            <div className="aspect-w-16 aspect-h-7 md:aspect-h-4 ">
              <img
                src={
                  "https://krishnabharambe.pythonanywhere.com/" +
                  ServiceData?.TileImage
                }
              />
            </div>

            <p className="text-2xl font-bold tracking-tight text-gray-900 my-3">
              {ServiceData?.title}
            </p>
            <p className="text-xl font-medium tracking-tight text-gray-900 my-3">
              {ServiceData?.shortdescription}
            </p>
            <p className="font-medium">{ServiceData?.description}</p>
            <Link to={"/mservice/service/booking/"+ServiceData?.id+"/"}>
              <a className="inline-flex mt-5 items-center w-full justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Book a service
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
