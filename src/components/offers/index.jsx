import { Link } from "react-router-dom";
// import { offers } from "../../database/index";
import { Button } from "../buttons/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "../../redux/actions/offer-action";
import { OfferShimmer } from "../loader/OfferShimmer";
import { NoData } from "../errors/noData";
import { LinkButton } from "../link";
import client from "../../redux/axios-baseurl";

export const Offers = () => {
  const dispatch = useDispatch();

  //get offers from store.offer
  const { totalCount, error } = useSelector(
    (state) => state.offers
  );

  const [offers, setOffers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  // console.log("offers:::", offers, isLoading);

  //useEffect here.. to fetch/dispatch all offer in store
  useEffect(() => {
    // console.log("Offer page render");

    // dispatch(getOffers({}));

    const fetchOffers = async()=>{
      try {
        setIsLoading(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        // console.log(token, "token")
  
        // if (!token) {
        //   return rejectWithValue("No token found");
        // }
  
        const response = await client.get("/admin/offer", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params:{page:1}
        });
        console.log("fetchOffer",response.data?.data?.offers);
        setOffers(response.data?.data?.offers);
      } catch (error) {
        console.log(error, "get offer list error");
        // return rejectWithValue(error.response?.data || "Something went wrong");
      }finally{
        // console.log("Finally block");
        setIsLoading(false);
      }
    }
    fetchOffers();


  }, []);

  if (isLoading) return <OfferShimmer count={2} />;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <p className="font-semibold text-[16px] text-[#004BBC]">Offers</p>
          <Link
            className="font-medium text-xs text-[#828282] "
            to={"/offersDetails"}
          >
            {offers ? "View All" : ""}
          </Link>
        </div>
        <div className="h-[1px] bg-gradient-to-r rounded-lg from-[#E0E1E2] via-[#E0E1E2] to-[#E0E1E2]"></div>

        {offers ? (
          offers?.slice(0, 2)?.map((offer, index) => (
            <div className="!rounded-lg overflow-hidden">
              <div
                key={index}
                className="flex rounded-lg px-2 py-2 bg-[#EEEFF3] hover:shadow-lg"
              >
                <div
                  style={{ backgroundImage: `url(${offer?.imageUrl?offer?.imageUrl:"https://img.freepik.com/free-vector/sale-banner-badge-your-business_1017-17476.jpg"})` }}
                  className={`min-w-[40%] rounded-lg bg-cover bg-center overflow-hidden`}
                ></div>
                <div className="flex flex-col  justify-between gap-1 bg-[#EEEFF3] pl-3 ">
                  <div>
                    <div className="flex ">
                      <p className="font-bold text-[12.64px]  text-[#1A202E] ">
                        {offer.offerTitle}
                      </p>
                    </div>
                    <p className="font-extrabold  text-[#EB9527] text-[14.05px]">
                      {offer.discountPercent}{offer?.discountType==="percentage"?"%":"₹"}
                    </p>
                    <p className="font-normal pr-2 text-[12px] text-[#737373]">
                      {offer.offerDetail?.substring(0, 30)}
                      {offer.offerDetail?.length > 50 ? " ..." : ""}
                    </p>
                  </div>
                  <div className="flex pt-2">
                    <LinkButton to={"/services"} primary={true}> Avail Now</LinkButton>
                  
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoData className={"h-auto"} />
        )}
      </div>
    </>
  );
};
