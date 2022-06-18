import React from "react";
import { Link } from "react-router-dom";
import ServiceRSummited from "./../../Assets/ServiceRSummited.svg";

export default function RequestSubmitted() {
  return (
    <div>
      <section className="bg-gray-900 relative place-items-center grid h-screen w-screen gap-4">
        <img src={ServiceRSummited} />
        <Link to="/booking" className="text-gray-100">Your Booking has been Submitted, GO to Bookings</Link>
      </section>
    </div>
  );
}
