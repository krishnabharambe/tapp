import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import RequestSubmitted from "../Booking/RequestSubmitted";
import Navbar from "../Home/Navbar";
import MainLoading from "../MainLoading";
import axios from "./../../axios";
import config from "./../../config.json";
export default function BookService() {
  const [Loading, setLoading] = useState(false);
  const { subID } = useParams();
  const [ServiceData, setServiceData] = useState();
  const navigate = useNavigate();
  const globaluser = useSelector((state) => state.user);
  const [apipost, setapipost] = useState(false)

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


  const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    console.log("ServiceID", ServiceData.id)
    console.log("UserId", globaluser?.userInfo.id)
    console.log("Contact",globaluser?.userInfo.phone)
    console.log("Address", data.get('Address'))
    console.log("Comments",data.get('FullName')+" "+data.get('Comments'))


    axios.post("https://krishnabharambe.pythonanywhere.com/api/requests/add/",{
        ServiceID : ServiceData.id,
        UserId : globaluser?.userInfo.id,
        Contact : globaluser?.userInfo.phone,
        Address : data.get('Address'),
        Comments : data.get('FullName')+" "+data.get('Comments')

    }).then((res)=>{
        if (res.data.status) {
            setapipost(true)
            console.log("Request submitted")
        } else {
            setapipost(false)
            console.log("Request Failed")
        }  
    }).catch((error)=>{ console.log(error)})
    
}

if(apipost){return <RequestSubmitted />}

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
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <p className="text-2xl font-bold tracking-tight text-gray-900 my-3">
                  {ServiceData?.title}
                </p>
                <p className="text-xl font-medium tracking-tight text-gray-900 my-3">
                  {ServiceData?.shortdescription}
                </p>
                <p className="font-medium">{ServiceData?.description}</p>
              </div>

              <div>
                <p className="text-2xl font-bold tracking-tight text-gray-900 my-3">
                  Book a Service
                </p>
                <>
                  <div>
                    <div className="">
                      <div className="mt-5 md:mt-0">
                        <form onSubmit={submitForm} >
                          <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="FullName"
                                  id="first-name"
                                  autoComplete="given-name"
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>

                              <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                  <label
                                    htmlFor="company-website"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Alt. Contact Number
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                      +91
                                    </span>
                                    <input
                                      type="text"
                                      name="Comments"
                                      id="company-website"
                                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                      placeholder=""
                                    />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label
                                  htmlFor="about"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Address
                                </label>
                                <div className="mt-1">
                                  <textarea
                                    id="about"
                                    name="Address"
                                    rows={3}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    placeholder=""
                                    defaultValue={""}
                                  />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                  Brief description for your address
                                </p>
                              </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                              <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Confirm Booking
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
