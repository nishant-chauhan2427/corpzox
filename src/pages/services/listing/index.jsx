import { useEffect } from "react";
import { Button } from "../../../components/buttons";
import Insight from "../../../components/insight/insight";
import { MainTab } from "../../../pages/services/components/tabs/mainTab";
import ServicesCard from "../../../pages/services/listing/components/services-card";
import { servicesListing } from "../../../database";
import Filtertab from "../../../pages/services/components/tabs/filterTab";
import { useSelector,useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {getUserServicesCatagory,getUserServicesSubCatagory,getUserServices} from '../../../redux/actions/servicesListing-action';
const ServicesListing = () => {
  const dispatch =useDispatch();
  const { servicesMainTab } = useSelector((state) => state.app);
  const { category,subCategory,page,limit,list} = useSelector((state) => state.service);
  const location=useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get('search');
  useEffect(()=>{
    dispatch(getUserServicesCatagory({}));
  },[])
  useEffect(()=>{
    dispatch(getUserServicesSubCatagory({categoryId:category?.selectedCategory?.categoryId}));
  },[category.selectedCategory])
  useEffect(()=>{
    if(category?.selectedCategory&&subCategory?.selectedSubCategory){
      dispatch(getUserServices({categoryId:category?.selectedCategory?._id
        ,subCategoryId:subCategory?.selectedSubCategory?._id
        ,page,limit}));
    }
  },[category.selectedCategory,subCategory.selectedSubCategory])
  useEffect(()=>{
      dispatch(getUserServices({categoryId:category?.selectedCategory?._id
        ,subCategoryId:subCategory?.selectedSubCategory?._id
        ,page,limit,query:searchValue}));
  },[searchValue])
  return (
    <section className="flex sm:flex-row flex-col gap-4 sm:pt-6 pt-3 bg-white">
      <div className="flex flex-col sm:w-[70%]">
        <div className="flex justify-center flex-col">
          <MainTab />
          {servicesMainTab !== 0 ? (
            <>
              <p className="font-bold  text-[20px] leading-6 text-[#0A1C40]">
                Service Category
              </p>
              <Filtertab />
              <ServicesCard data={list} />
            </>
          ) : (
            <>
              <ServicesCard data={list} />
              {list&&list.length!=0&&<div className="mt-10 flex justify-center">
                <Button primary={true}>Load More </Button>
              </div>}
            </>
          )}
        </div>
      </div>
      <div className=" sm:w-[30%] pt-4">
        <Insight />
      </div>
    </section>
  );
};
export default ServicesListing;
