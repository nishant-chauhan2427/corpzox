import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServicesMainTab } from "../../../../../redux/slices/appSlice";
import { setSelectedCategory } from "../../../../../redux/slices/serviceListingSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing the arrow icons
import { getMoreUserServices, getUserServicesCatagory, getUserServicesSubCatagory } from "../../../../../redux/actions/servicesListing-action";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getUserServices } from "../../../../../redux/actions/dashboard-action";

export const MainTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useSelector((state) => state.service);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollContainerRef = useRef(null); // Ref for the container of the buttons
  const tabRefs = useRef([]); // Ref to hold the individual tab buttons
 const {list} = useSelector((state)=> state.service)

 const checkOverflow = () => {
  if (scrollContainerRef.current) {
    const isOverflow = scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth;
    setIsOverflowing(isOverflow);
  }
};
  useEffect(() => {
    if (tabRefs.current[activeTabIndex]) {
      // Scroll the active tab into view smoothly
      tabRefs.current[activeTabIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [activeTabIndex]);
  useEffect(() => {
    const categoryIdFromParams = searchParams.get("categoryId");
    if (category?.list?.length && categoryIdFromParams) {
      const foundIndex = category.list.findIndex((tab) => tab._id === categoryIdFromParams);
      if (foundIndex !== -1) {
        setActiveTabIndex(foundIndex);
        dispatch(setSelectedCategory(category.list[foundIndex]));
      } else {
        setActiveTabIndex(0);
        dispatch(setSelectedCategory(category.list[0]));
        setSearchParams({ categoryId: category.list[0]._id });
      }
    }
    checkOverflow();
  }, [searchParams, category?.list, dispatch, setSearchParams]);
  
  const handleMainTab = (index) => {
    searchParams.delete("subCategory");
    // navigate(`/services?categoryId=${category?.list[index]?._id}`);
    if (category?.list?.[index]) {
      dispatch(setSelectedCategory(category?.list[index]));
      setSearchParams({ categoryId: category?.list[index]?._id });
      setActiveTabIndex(index); // Set the active tab index on click
      callSubCat(category?.list[index]?._id, index)
    }
  };
  
  const callSubCat = (categoryId, index) => {
    dispatch(getUserServicesSubCatagory({ categoryId: categoryId}))
      .unwrap()
      .then((response) => {
        if (response?.data?.length > 0) {
          const firstSubCategoryId = response?.data[0]?._id;

          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("categoryId", category?.list[index]?._id) 
            params.set("subCategoryId", firstSubCategoryId);
            return params;
          });
        } else {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.delete("subCategoryId"); 
            params.set("categoryId", category?.list[index]?._id)// Delete subCategoryId if no sub-categories found
            return params;
          });
          dispatch(getMoreUserServices({
            categoryId,
          }))
        }
      })
      .catch((error) => {
        console.error("Error fetching sub-categories:", error);
    
      })
  }
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
      {isOverflowing && category?.list.length > 0 && activeTabIndex !==0 &&<button onClick={scrollLeft} className="z-10">
        <IoIosArrowBack  size={20} />
      </button>}

      <div
        className="flex items-center gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap border-b"
        ref={scrollContainerRef}
      >
        {category.list.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`${activeTabIndex === index
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
      {isOverflowing &&  category?.list.length > 0 && activeTabIndex !== category?.list.length -1 && <button onClick={scrollRight} className="z-10">
        <IoIosArrowForward  size={20} />
      </button>}
    </div>
  );
};
