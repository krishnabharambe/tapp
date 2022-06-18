import { ArrowLeftIcon } from '@heroicons/react/outline'
import axios from './../../axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Home/Navbar'
import config from "./../../config.json";
import MainLoading from '../../Components/MainLoading';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
export default function Profile() {

  const [profileData, setprofileData] = useState()
  const globaluser = useSelector((state) => state.user);
  const navigate = useNavigate();

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
        <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
                <div className="bg-white p-3 border-t-4 border-indigo-400">
                    <div className="image overflow-hidden">
                        <img className="h-auto w-full mx-auto"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-2QzDi0K92Jlu8SQIpCymE283oxKclO02g&usqp=CAU"
                            alt="" />
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{profileData.fullName}</h1>

                </div>
 
    
            </div>

            <div className="w-full md:w-9/12 mx-2 h-64">

                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Full Name</div>
                                <div className="px-4 py-2">{profileData.fullName}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                <div className="px-4 py-2">{globaluser?.userInfo.phone}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email.</div>
                                <div className="px-4 py-2">{profileData.email}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Address</div>
                                <div className="px-4 py-2">{profileData.address}</div>
                            </div>
                        </div>
                    </div>
                    <Link to="/edit/profile"
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit details</Link>
                </div>


   
            </div>
        </div>
    </div>
    
    </div>
  )
}
