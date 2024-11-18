import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {setSelectedSubCategory} from '../../../../../redux/slices/serviceListingSlice'
function Filtertab() {
  const { subCategory } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const [categoryactiveTab, setcategoryActiveTab] = useState(0);
  const categoryTab = [
    { name: "Indian Business" },
    { name: "Financial Business" },
    { name: "International Business" },
    { name: "Business Registrations" },
    { name: "Business Licenses" },
    { name: "Intellectual Property Rights" },
    { name: "Corporate Restructuring" },
  ];
  
  return (
    <>
      <div className="flex space-x-5  overflow-x-auto scrollbar-hide whitespace-nowrap pb-4 pt-4 ">
        {subCategory.list.map((tab, index) => (
          <button
            key={index}
            className={`sm: ${
              subCategory?.selectedSubCategory.subCategoryId === tab.subCategoryId
                ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#004BBC] rounded pr-2 "
                : "font-normal text-sm pr-2 py-1 text-[#7E7E7E]"
            }`}
            onClick={() => dispatch(setSelectedSubCategory(tab))}
          >
            {tab.sectionTitle}
          </button>
        ))}
      </div>
    </>
  );
}

export default Filtertab;
