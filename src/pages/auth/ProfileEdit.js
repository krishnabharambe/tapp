import { ArrowLeftIcon } from '@heroicons/react/outline'
import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Home/Navbar'
import config from "../../config.json";
import MainLoading from '../../Components/MainLoading';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProfileEdit() {

  const [profileData, setprofileData] = useState()
  const navigate = useNavigate();
  const globaluser = useSelector((state) => state.user);
  const [profileUpdated, setprofileUpdated] = useState(false)


  
  const submitForm = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData(e.currentTarget);

    axios.post(config.api_updateProfile,{
        email : data.get('email'),
        address : data.get('address'),
        fullName : data.get('fullName'),
        city : "null"
    }, {
      headers: {
        Authorization: `token ${token}`,
      },
    }).then((res)=>{
      
          setprofileUpdated(true)
            console.log("profile updated")
     
    }).catch((error)=>{ console.log(error)})
    
}



  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(config.api_getProfile, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setprofileData(res.data);

        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("profileData", globaluser.userInfo.phone);
  }, []);

  if(!profileData) return <MainLoading />

if (profileUpdated) return <Navigate to="/profile" />

  return (
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
            <h2 className="text-xl font-medium tracking-tight text-gray-900"></h2>
          </div>
        </div>
      </div>
    </nav>
    <div className="hidden md:block">
      <Navbar />
    </div>
    
    

    <div className="container mx-auto my-5 p-5">
        <div className=" ">

            <div className="w-full mx-2 h-64">
<form onSubmit={submitForm} >
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide">Edit Details</span>
                    </div>
                    <div className="text-gray-700 mt-4">
                        <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                            <div className="col-span-6 mr-3 sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-semibold"
                                >
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  name="fullName"
                                  required
                                  id="first-name"
                                  autoComplete="given-name"
                                  defaultValue={profileData?.fullName}
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                            <div className="col-span-6 md:ml-3 sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-semibold"
                                >
                                  Contact
                                </label>
                                <input
                                  type="text"
                                  name="FullName"
                                  id="first-name"
                                  autoComplete="given-name"
                                  disabled
                                  defaultValue={globaluser?.userInfo.phone}
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                            <div className="col-span-6 mr-3 sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-semibold"
                                >
                                  Email.
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  id="first-name"
                                  autoComplete="given-name"
                                  defaultValue={profileData.email}
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                            <div className="col-span-6 md:ml-3 sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-semibold"
                                >
                                  Address
                                </label>
                                <textarea
                                    id="about"
                                    name="address"
                                    rows={3}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    placeholder=""
                                    required
                                    defaultValue={profileData?.address}
                                  />
                              </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit"
                        className="block w-full text-gray-100 bg-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Save Details</button>
                </div>

                </form>
   
            </div>
        </div>
    </div>
    
    </div>
  )
}
