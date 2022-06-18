import { ArrowLeftIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import axios from "../../axios";
import config from "../../config.json";
import { Combobox } from "@headlessui/react";

const people = [
  "Wade Cooper",
  "Arlene McCoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
];

export default function TechShowBooking() {
  const navigate = useNavigate();
  const { BookId } = useParams();

  const [BookingData, setBookingData] = useState();
  const [StaffData, setStaffData] = useState();
  const [isRequestActive, setisRequestActive] = useState(true);
  const [reqAssigned, setreqAssigned] = useState(false)
  const [TechData, setTechData] = useState()

  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("token");

  const submitAssignForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    axios.post(config.api_assignRequest,{
        UserID : data.get('UserID'),
        BookingId : BookId

    },{
      headers: {
        Authorization: `token ${token}`,
      },
    }).then((res)=>{
        if (res) {
          setreqAssigned(true)
            console.log("Request submitted")
        } 
    }).catch((error)=>{ console.log(error)})
    
}

const submitAssignForm2 = (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);

  axios.post(config.api_AssignRequesttoMySelfFromOpenPool + BookId + "/" ,{
  },{
    headers: {
      Authorization: `token ${token}`,
    },
  }).then((res)=>{
      if (res) {
        setreqAssigned(true)
          console.log("Request assigned to logged in User")
      } 
  }).catch((error)=>{ console.log(error)})
  
}

  const HandleCancelSubmit = () => {
    console.log("Cancel");

    const token = localStorage.getItem("token");
    axios
      .post(
        config.api_cancelBooking + BookId + "/",
        {},
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        setBookingData(res.data);

        if (res.data.Status == "Active") {
          setisRequestActive(false);
        } else {
          setisRequestActive(true);
        }
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(config.api_getBooking + BookId + "/", {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setBookingData(res.data);

        if (res.data.Status == "Active") {
          setisRequestActive(false);
        } else {
          setisRequestActive(true);
        }
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .post(config.api_getAssignedTech + BookId + "/", {},{
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setTechData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(config.api_getStaffUsers, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setStaffData(res.data);
        console.log(res.data);
      })
      .catch();

    console.log("setStaffData", StaffData);

    console.log("BookingData", BookingData);
  }, []);


  if (reqAssigned) return <Navigate to="/" />
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

      <div>
        <div className="flex flex-col md:items-center bg-white rounded-lg border max-w-full mx-auto shadow-md md:flex-row md:max-w-2xl  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className=" aspect-w-4 md:aspect-w-8 w-full aspect-h-4 ">
            <img
              src={
                "https://krishnabharambe.pythonanywhere.com/" +
                BookingData?.ServiceID.TileImage
              }
              alt=""
              className="p-4"
            />
          </div>
          <div className="flex flex-col w-full justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {BookingData?.ServiceID.title}
            </h5>
            <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {BookingData?.Status}
            </h3>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
              {BookingData?.Address}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
              {BookingData?.Comments}
            </p>
            <p className="mb-3 font-normal test-sm text-gray-700 dark:text-gray-400 text-left">
              {BookingData?.uploaded_at}
            </p>
            {!isRequestActive ? (
              <button
                onClick={HandleCancelSubmit}
                className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Cancel Booking
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      
      {!StaffData ? (
        "Getting Data"
      ) : (
        <div className="w-full">
    
          <form className="flex justify-center" onSubmit={submitAssignForm2} >
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
              <button
                type="submit"
                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Assign to myself
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
