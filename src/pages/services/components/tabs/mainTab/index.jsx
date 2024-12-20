import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServicesMainTab } from "../../../../../redux/slices/appSlice";
import { setSelectedCategory } from "../../../../../redux/slices/serviceListingSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useSelector } from "react-redux";
export const MainTab = () => {
  // const [mainactiveTab, setmainActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams()
  const { category } = useSelector((state) => state.service);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    const categoryIdFromParams = searchParams.get("categoryId");
    searchParams.delete("subCategoryId");
    if (category?.list?.length) {
      if (categoryIdFromParams) {
        // If categoryId exists in params, find and set the category
        const foundIndex = category.list.findIndex(
          (tab) => tab._id === categoryIdFromParams
        );
        if (foundIndex !== -1) {
          setActiveTabIndex(foundIndex);
          dispatch(setSelectedCategory(category.list[foundIndex]));
        } else {
          // If the categoryId in params is invalid, default to the first category
          setActiveTabIndex(0);
          dispatch(setSelectedCategory(category.list[0]));
          setSearchParams({ categoryId: category.list[0]._id });
        }
      } else {
        // If no categoryId in params, default to the first category
        setActiveTabIndex(0);
        dispatch(setSelectedCategory(category.list[0]));
        setSearchParams({ categoryId: category.list[0]._id });
      }
      
    }
  }, [searchParams, category?.list, dispatch]);
  

  const handleMainTab = (index) => {
    searchParams.delete("subCategory")
    navigate(`/services?categoryId=${category?.list[index]?._id}`)
    if(category?.list?.[index]){
      dispatch(setSelectedCategory(category?.list[index]));
      console.log(category?.list[index], "category?.list[index]")
      setSearchParams({categoryId : category?.list[index]?._id})  // use _id for getting sub categories
    }
  };
  return (
    <>
      <div className="flex space-x-5  overflow-x-auto scrollbar-hide whitespace-nowrap pb-4  ">
        {category.list.map((tab, index) => (
          <button
            key={index}
            // className={`sm: ${
            //   category?.selectedCategory?.categoryId == tab?.categoryId// mainactiveTab === index
            //     ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#F1359C] rounded pr-2 "
            //     : "font-normal text-sm p-2 py-1 text-[#7E7E7E]"
            // }`}
            className={`${
              activeTabIndex === index
                ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#F1359C] rounded pr-2"
                : "font-normal text-sm p-2 py-1 text-[#7E7E7E]"
            }`}
            onClick={() => handleMainTab(index)}
          >
            {tab.categoryName}
          </button>
        ))}
      </div>
    </>
  );
};
