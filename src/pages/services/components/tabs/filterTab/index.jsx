import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSubCategory } from "../../../../../redux/slices/serviceListingSlice";
import { useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing arrow icons

function Filtertab() {
  const { subCategory } = useSelector((state) => state.service);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [categoryactiveTab, setcategoryActiveTab] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const scrollContainerRef = useRef(null); // Ref for the scroll container
  const tabRefs = useRef([]); // Ref for individual tab buttons

  useEffect(() => {
    const subCategoryIdFromParams = searchParams.get("subCategoryId");

    if (subCategory?.list?.length > 0) {
      if (subCategoryIdFromParams) {
        const foundIndex = subCategory.list.findIndex(
          (tab) => tab._id === subCategoryIdFromParams
        );
        if (foundIndex !== -1) {
          setActiveTabIndex(foundIndex);
          dispatch(setSelectedSubCategory(subCategory.list[foundIndex]));
        } else {
          setActiveTabIndex(0);
          dispatch(setSelectedSubCategory(subCategory.list[0]));
          // setSearchParams({
          //   categoryId: searchParams.get("categoryId") || "",
          //   subCategoryId: subCategory.list[0]._id,
          // });
        }
      } else {
        setActiveTabIndex(0);
        dispatch(setSelectedSubCategory(subCategory.list[0]));
        setSearchParams({
          categoryId: searchParams.get("categoryId") || "",
          subCategoryId: subCategory.list[0]._id,
        });
      }
    }
  }, [searchParams, subCategory?.list, dispatch]);

  const handleTab = (tab) => {
    dispatch(setSelectedSubCategory(tab));
    setSearchParams({ categoryId: searchParams.get("categoryId") || "", subCategoryId: tab._id });
  };

  // Scroll left handler
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -500, // Increase/decrease scroll distance based on your needs
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  // Scroll right handler
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 500, // Increase/decrease scroll distance based on your needs
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Left Arrow Button */}
      <button onClick={scrollLeft} className="z-10">
        <FaArrowLeft size={20} />
      </button>

      <div
        className="flex items-center gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap border-b"
        ref={scrollContainerRef}
      >
        {subCategory.list.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)} // Assign tab button refs
            className={`${
              activeTabIndex === index
                ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#004BBC] rounded"
                : "font-normal text-sm py-1 text-[#7E7E7E]"
            }`}
            onClick={() => handleTab(tab)}
          >
            {tab.subSectionTitle}
          </button>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button onClick={scrollRight} className="z-10">
        <FaArrowRight size={20} />
      </button>
    </div>
  );
}

export default Filtertab;
