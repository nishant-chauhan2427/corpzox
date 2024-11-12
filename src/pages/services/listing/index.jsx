import { useState } from "react";
import { Checkbox } from "../../../components/inputs/checkbox";
import { CiHeart } from "react-icons/ci";
import { Button } from "../../../components/buttons";
import { insightBlog } from "../../../database";
import Insight from "../../../components/insight/insight";
import Maintab from "../../../pages/services/components/tabs/mainTab";
import ServicesCard from "../../../pages/services/components/services-card";
import { servicesListing } from "../../../database";
import Filtertab from "../../../pages/services/components/tabs/filterTab";

const ServicesListing = () => {
  const [mainActiveTab, setMainActiveTab] = useState(0);
  const [categoryActiveTab, setCategoryActiveTab] = useState(0);
  const [showServiceTab, setShowServiceTab] = useState(false);
  
  return (
    <section className="flex sm:flex-row flex-col gap-4 sm:pt-6 pt-3 bg-white">
      <div className="flex flex-col sm:w-[70%]">
        <div className="flex justify-center flex-col">
          <Maintab setShowServiceTab={setShowServiceTab} />
          {showServiceTab ? (
            <>
              <p className="font-bold  text-[20px] leading-6 text-[#0A1C40]">
                Service Category
              </p>
              <Filtertab />
            </>
          ) : (
            ""
          )}
          {mainActiveTab === 0 && (
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
