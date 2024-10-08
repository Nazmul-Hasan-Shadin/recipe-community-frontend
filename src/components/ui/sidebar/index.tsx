"use client";
import React, { useState } from "react";
import SideBarOptions from "./sideBarOptions";
import { sideBarLinks } from "./constants";

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Sample data for the accordion
  const customFeeds = [{ title: "Community", content: "Create a custom feed" }];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-[270px] hidden md:block fixed top-12 h-[100vh] bg-white border rounded-lg shadow-lg p-4 left-0">
      {/* Sidebar Links */}
      <ul className="px-3">
        <SideBarOptions links={sideBarLinks} />
      </ul>

      <hr className="my-4 border-gray-300" />

      {/* Accordion for custom feeds */}
      <div className="mt-4">
        {customFeeds.map((item, index) => (
          <div key={index} className="border-b border-gray-300 last:border-b-0">
            <div
              className="flex justify-between items-center py-2 px-3 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-md"
              onClick={() => toggleAccordion(index)}
            >
              <h4 className="text-[#0079d3] font-semibold">{item.title}</h4>
              <span className="text-lg text-[#0079d3]">
                {openIndex === index ? "-" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <div className="py-2 px-3 bg-gray-50 border-l-4 border-[#0079d3]">
                <p className="text-gray-700">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
