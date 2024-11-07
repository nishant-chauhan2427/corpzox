import { useState } from "react";

const ServicesListing = () => {
  // Track the active tab
  const [mainactiveTab, setmainActiveTab] = useState(0);

  const [categoryactiveTab, setcategoryActiveTab] = useState(0);

  // Define the tabs and their content
  const mainTabs = [
    { name: "Top Services" },
    { name: "Business Setup" },
    { name: "Finance and Compilance" },
    { name: "Waste Management" },
  ];
  const categoryTabs = [
    { name: "Indian Business" },
    { name: "Financial Business" },
    { name: "International Business" },
    { name: "Non Profit Organization" },
    { name: "Business Registrations" },
    { name: "Business Licenses" },
    { name: "Intellectual Property Rights" },
    { name: "Corporate Restructuring" },
  ];

  return (
    <>
      <section className="flex gap-2 bg-white">
        <div className="flex w-[80%] ">
          <div className="">
            {/* Tab buttons */}
            <div className="flex space-x-2 ">
              {mainTabs.map((tab, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 transition-colors duration-200 ${
                    mainactiveTab === index
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                  onClick={() => setmainActiveTab(index)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {mainactiveTab === 0 ? (
              <>
                <div>Service Category</div>
                <div>
                  {categoryTabs.map((tab, index) => (
                    <button
                      key={index}
                      className={`py-2 px-4 transition-colors duration-200 ${
                        categoryactiveTab === index
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : "text-gray-500 hover:text-blue-500"
                      }`}
                      onClick={() => setcategoryActiveTab(index)}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </>
            ) : mainactiveTab === 1 ? (
              <></>
            ) : mainactiveTab === 2 ? (
              <></>
            ) : mainactiveTab === 3 ? (
              <></>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex w-[20%]">Insights</div>
      </section>
    </>
  );
};

export default ServicesListing;
