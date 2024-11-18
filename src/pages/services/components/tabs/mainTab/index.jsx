import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServicesMainTab } from "../../../../../redux/slices/appSlice";
import { setSelectedCategory } from "../../../../../redux/slices/serviceListingSlice";
// import { useSelector } from "react-redux";
export const MainTab = () => {
  // const [mainactiveTab, setmainActiveTab] = useState(0);
  const { category } = useSelector((state) => state.service);
  const dispatch = useDispatch();

  const mainTabs = [
    { name: "Top Services" },
    { name: "Business Setup" },
    { name: "Finance and Compliance" },
    { name: "Waste Management" },
  ];

  const handleMainTab = (index) => {
    if(category?.list?.[index]){
      dispatch(setSelectedCategory(category?.list[index]));
    }
  };
  return (
    <>
      <div className="flex space-x-5  overflow-x-auto scrollbar-hide whitespace-nowrap pb-4  ">
        {category.list.map((tab, index) => (
          <button
            key={index}
            className={`sm: ${
              category?.selectedCategory?.categoryId == tab?.categoryId// mainactiveTab === index
                ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#F1359C] rounded pr-2 "
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
