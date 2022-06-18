import React, { useEffect } from "react";
import AllServiceView from "../../Components/Home/AllServiceView";
import ImageSlider from "../../Components/Home/ImageSlider";
import MainServiceView from "../../Components/Home/MainServiceView";
import Navbar from "../../Components/Home/Navbar";
import axios from "./../../axios";
import config from "./../../config.json";
import { Tab } from "@headlessui/react";
import NewRequests from "./NewRequests";
import InProgressRequests from "./InProgressRequests";
import OpenPoolRequests from "./OpenPoolRequests";
import CompletedRequests from "./CompletedRequests";
import CancelledRequests from "./CancelledRequests";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  useEffect(() => {}, []);

  return (
    <div>
      <Navbar />
      <div className="w-full select-none max-w-7xl mx-auto">
        <Tab.Group>
          <Tab.List>
          <Tab
              className={({ selected }) =>
                classNames(
                  "w-1/4 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  selected
                    ? "bg-white"
                    : "text-blue-400 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              OpenPool
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-1/4 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  selected
                    ? "bg-white"
                    : "text-blue-400 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              In Progress
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-1/4 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  selected
                    ? "bg-white"
                    : "text-blue-400 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Completed
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-1/4 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  selected
                    ? "bg-white"
                    : "text-blue-400 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Cancelled
            </Tab>

          </Tab.List>
          <Tab.Panels>
            <Tab.Panel><OpenPoolRequests /></Tab.Panel>
            <Tab.Panel><InProgressRequests /></Tab.Panel>
            <Tab.Panel><CompletedRequests /></Tab.Panel>
            <Tab.Panel><CancelledRequests /></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
