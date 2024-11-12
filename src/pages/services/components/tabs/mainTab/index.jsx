import React, { useState } from "react";

function Maintab() {
  const [mainactiveTab, setmainActiveTab] = useState(0);
  const mainTabs = [
    { name: "Top Services" },
    { name: "Business Setup" },
    { name: "Finance and Compliance" },
    { name: "Waste Management" },
  ];

  return (
    <>
      <div className="flex space-x-5  overflow-x-auto scrollbar-hide whitespace-nowrap pb-4  ">
        {mainTabs.map((tab, index) => (
          <button
            key={index}
            className={`sm: ${
              mainactiveTab === index
                ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#F1359C] rounded pr-2 "
                : "font-normal text-sm pr-2 py-1 text-[#7E7E7E]"
            }`}
            onClick={() => setmainActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default Maintab;
