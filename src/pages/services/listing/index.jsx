import { useEffect } from "react";
import { Button } from "../../../components/buttons";
import Insight from "../../../components/insight/insight";
import { MainTab } from "../../../pages/services/components/tabs/mainTab";
import ServicesCard from "../../../pages/services/components/services-card";
import { servicesListing } from "../../../database";
import Filtertab from "../../../pages/services/components/tabs/filterTab";
import { useSelector,useDispatch } from "react-redux";
import {getUserServicesCatagory} from '../../../redux/actions/servicesListing-action';
const ServicesListing = () => {
  const dispatch =useDispatch();
  const { servicesMainTab } = useSelector((state) => state.app);
  useEffect(()=>{
    dispatch(getUserServicesCatagory({}));
  },[])
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
              <ServicesCard data={servicesListing} />
            </>
          ) : (
            <>
              <ServicesCard data={servicesListing} />
              <div className="mt-10 flex justify-center">
                <Button primary={true}>Load More </Button>
              </div>
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
