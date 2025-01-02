import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setSelectedSubCategory } from "../../../../../redux/slices/serviceListingSlice";

function Filtertab() {
  const { subCategory, category } = useSelector((state) => state.service);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollContainerRef = useRef(null); // Ref for the scroll container
  const tabRefs = useRef([]); // Ref for individual tab buttons

  const checkOverflow = () => {
    if (scrollContainerRef.current) {
      const isOverflow = scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth;
      setIsOverflowing(isOverflow);
    }
  };

  useEffect(() => {
    const subCategoryIdFromParams = searchParams.get("subCategoryId");
    console.log(subCategoryIdFromParams, "this is runnning")
    if (!category.categoryLoading && subCategoryIdFromParams && subCategory?.list?.length > 0) {
      console.log("went inside if")
      console.log(subCategory.list, "foud list")
      const foundIndex = subCategory.list.findIndex(
        (tab) => tab._id === subCategoryIdFromParams
      );
      if (foundIndex !== -1) {
        console.log("found index")
        setActiveTabIndex(foundIndex);
        dispatch(setSelectedSubCategory(subCategory.list[foundIndex]));
      }
    }
    checkOverflow();
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
      {isOverflowing && subCategory?.list?.length > 0  && activeTabIndex !== 0 && <button onClick={scrollLeft} className="z-10">
        <IoIosArrowBack size={20} />
      </button>}

      <div
        className="flex items-center gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap border-b"
        ref={scrollContainerRef}
      >
        {subCategory.list.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)} // Assign tab button refs
            className={`${activeTabIndex === index
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
      {isOverflowing && subCategory?.list?.length > 0 && activeTabIndex !== subCategory?.list.length -1 && <button onClick={scrollRight} className="z-10">
        <IoIosArrowForward size={20} />
      </button>}
    </div>
  );
}

export default Filtertab;
