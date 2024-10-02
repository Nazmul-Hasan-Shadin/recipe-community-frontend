"use client";
import React, { useState } from "react";
import SideBarOptions from "./sideBarOptions";
import { sideBarLinks } from "./constants";

const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Sample data for the accordion
  const customFeeds = [{ title: "Community", content: "create a custom feed" }];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-[270px] h-[100vh] border p-4">
      <ul className="px-3">
        <SideBarOptions links={sideBarLinks} />
      </ul>
      <hr className="my-4" />

      {/* Accordion for custom feeds */}
      <div className="mt-4">
        {customFeeds.map((item, index) => (
          <div key={index} className="border-b last:border-b-0">
            <div
              className="flex justify-between items-center py-2 px-3 cursor-pointer  hover:bg-gray-200 transition-colors duration-200"
              onClick={() => toggleAccordion(index)}
            >
              <h4 className="text-[#576f76]">{item.title}</h4>
              <span className="text-lg">{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className={`py-2 px-3 bg-white`}>
                <p className="">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
