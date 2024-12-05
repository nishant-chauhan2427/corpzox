import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSubCategory } from "../../../../../redux/slices/serviceListingSlice";
import { useSearchParams } from "react-router-dom";
function Filtertab() {
  const { subCategory } = useSelector((state) => state.service);
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch();
  const [categoryactiveTab, setcategoryActiveTab] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const categoryTab = [
    { name: "Indian Business" },
    { name: "Financial Business" },
    { name: "International Business" },
    { name: "Business Registrations" },
    { name: "Business Licenses" },
    { name: "Intellectual Property Rights" },
    { name: "Corporate Restructuring" },
  ];
  console.log(subCategory, "subCategory");
  useEffect(() => {
    const subCategoryIdFromParams = searchParams.get("subCategoryId");
    if (subCategoryIdFromParams && subCategory?.list?.length) {
      const foundIndex = subCategory.list.findIndex(
        (tab) => tab._id === subCategoryIdFromParams
      );
      if (foundIndex !== -1) {
        setActiveTabIndex(foundIndex);
        dispatch(setSelectedSubCategory(subCategory.list[foundIndex]));
      }
    }
  }, [searchParams, subCategory?.list, dispatch]);
  // useEffect(() => {
  //   if (subCategory?.list?.length) {
  //     const subCategoryIdFromParams = searchParams.get("subCategoryId");

  //     // If there's a subCategoryId in the URL, select it
  //     if (subCategoryIdFromParams) {
  //       const foundIndex = subCategory.list.findIndex(
  //         (tab) => tab._id === subCategoryIdFromParams
  //       );
  //       if (foundIndex !== -1) {
  //         setActiveTabIndex(foundIndex);
  //         dispatch(setSelectedSubCategory(subCategory.list[foundIndex]));
  //       }
  //     } else {
  //       // If no subCategoryId in the URL, select the first subcategory
  //       setActiveTabIndex(0);
  //       dispatch(setSelectedSubCategory(subCategory.list[0]));
  //       setSearchParams({ 
  //         categoryId: searchParams.get("categoryId") || "",
  //         subCategoryId: subCategory.list[0]._id
  //       });
  //     }
  //   }
  // }, [searchParams, subCategory?.list, dispatch]);
  const handleTab = (tab) => {
    console.log(tab, "tab")
    dispatch(setSelectedSubCategory(tab))
    setSearchParams({ categoryId: searchParams.get("categoryId") || "", subCategoryId: tab._id })
  }
  return (
    <>
      <div className="flex space-x-5  overflow-x-auto scrollbar-hide whitespace-nowrap pb-4 pt-4 ">
        {subCategory.list.map((tab, index) => (
          <button
            key={index}
            // className={`sm: ${subCategory?.selectedSubCategory.subCategoryId ===
            //     tab.subCategoryId
            //     ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#004BBC]  rounded pr-2 "
            //     : "font-normal text-sm pr-2 py-1 text-[#7E7E7E]"
            //   }`}
            className={`${
              activeTabIndex === index
                ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#004BBC] rounded pr-2"
                : "font-normal text-sm pr-2 py-1 text-[#7E7E7E]"
            }`}
            onClick={() => (handleTab(tab))}
          >
            {tab.subSectionTitle}
          </button>
        ))}
      </div>
    </>
  );
}

export default Filtertab;
