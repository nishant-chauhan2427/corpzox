import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServicesMainTab } from "../../../../../redux/slices/appSlice";
import { setSelectedCategory } from "../../../../../redux/slices/serviceListingSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing the arrow icons

export const MainTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useSelector((state) => state.service);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null); // Ref for the container of the buttons
  const tabRefs = useRef([]); // Ref to hold the individual tab buttons

  useEffect(() => {
    const categoryIdFromParams = searchParams.get("categoryId");

    if (category?.list?.length) {
      if (categoryIdFromParams) {
        const foundIndex = category.list.findIndex(
          (tab) => tab._id === categoryIdFromParams
        );
        if (foundIndex !== -1) {
          setActiveTabIndex(foundIndex);
          dispatch(setSelectedCategory(category.list[foundIndex]));
        } else {
          setActiveTabIndex(0);
          dispatch(setSelectedCategory(category.list[0]));
          setSearchParams({ categoryId: category.list[0]._id });
        }
      } else {
        setActiveTabIndex(0);
        dispatch(setSelectedCategory(category.list[0]));
        setSearchParams({ categoryId: category.list[0]._id });
      }
    }
  }, [searchParams, category?.list, dispatch]);

  useEffect(() => {
    if (tabRefs.current[activeTabIndex]) {
      // Scroll the active tab into view smoothly
      tabRefs.current[activeTabIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center", 
      });
    }
  }, [activeTabIndex]); 

  const handleMainTab = (index) => {
    searchParams.delete("subCategory");
    navigate(`/services?categoryId=${category?.list[index]?._id}`);
    if (category?.list?.[index]) {
      dispatch(setSelectedCategory(category?.list[index]));
      setSearchParams({ categoryId: category?.list[index]?._id });
      setActiveTabIndex(index); // Set the active tab index on click
    }
  };

  // Scroll left handler with smooth animation
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -500, // Increased scroll distance for faster speed
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  // Scroll right handler with smooth animation
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 500, // Increased scroll distance for faster speed
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
        {category.list.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)} 
            className={`${
              activeTabIndex === index
                ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#F1359C] rounded"
                : "font-normal text-sm py-1 text-[#7E7E7E]"
            }`}
            onClick={() => handleMainTab(index)}
          >
            {tab.categoryName}
          </button>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button onClick={scrollRight} className="z-10">
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};
