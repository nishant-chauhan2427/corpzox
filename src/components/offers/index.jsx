import { Link } from "react-router-dom";
// import { offers } from "../../database/index";
import { Button } from "../buttons/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "../../redux/actions/offer-action";
import { OfferShimmer } from "../loader/OfferShimmer";
import { NoData } from "../errors/noData";

export const Offers = () => {
  const dispatch = useDispatch();

  //get offers from store.offer
  const {offers,totalCount,isLoading,error}= useSelector((state) => state.offers);

  console.log("offers:::",offers,isLoading);

  //useEffect here.. to fetch/dispatch all offer in store
  useEffect(()=>{
    console.log("Offer page render");
    
    dispatch(getOffers({}));
  },[])

  if(isLoading) return <OfferShimmer count={2}/>


  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <p className="font-medium text-[16px] text-[#004BBC]">Offers</p>
          <Link className="font-medium text-xs text-[#828282] " to={"/offersDetails"}>{offers?"View All":""}</Link>
        </div>
        <div className="h-[1px] bg-gradient-to-r rounded-lg from-[#E0E1E2] via-[#E0E1E2] to-[#E0E1E2]"></div>

        {offers?offers?.slice(0,2)?.map((offer, index) => (
          <div className="!rounded-lg overflow-hidden">
            <div key={index} className="flex !rounded-lg  hover:shadow-lg  ">
              <div
                style={{ backgroundImage: `url(https://img.freepik.com/free-vector/sale-banner-badge-your-business_1017-17476.jpg?t=st=1733120748~exp=1733124348~hmac=3266181d7b16db95a0892692767f76a818da9797d6972f8a04a1444b953ec2b1&w=826)` }}
                className={`w-[60%]  bg-cover bg-right overflow-hidden`}
              ></div>
              <div className="flex w-[60%] flex-col gap-1 bg-[#f9f9f9] pl-3 py-4">
                <div className="flex ">
                  <p className="font-bold text-[12px]  text-[#1A202E] ">
                    {offer.offerTitle}
                  </p>
                </div>
                <p className="font-bold  text-[#EB9527] text-[14px]">{offer.discountPercent}% OFF</p>
                <p className="font-normal  text-[9px] text-[#737373]">
                  {offer.offerDetail?.substring(0, 50)}
                  {offer.offerDetail?.length >50 ? " ...":""}
                </p>
                <div className="flex pt-2">
                  <Button
                    className={
                      "text-[13px] text-[#0A1C40]  px-4 rounded-md py-1 "
                    }
                    primary={true}
                  >
                    Avail Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )):<NoData className={"h-auto"}/>
      }
      </div>
    </>
  );
};
