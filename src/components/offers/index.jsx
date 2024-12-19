import { Link } from "react-router-dom";
// import { offers } from "../../database/index";
import { Button } from "../buttons/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "../../redux/actions/offer-action";
import { OfferShimmer } from "../loader/OfferShimmer";
import { NoData } from "../errors/noData";
import { LinkButton } from "../link";

export const Offers = () => {
  const dispatch = useDispatch();

  //get offers from store.offer
  const { offers, totalCount, isLoading, error } = useSelector(
    (state) => state.offers
  );

  // console.log("offers:::", offers, isLoading);

  //useEffect here.. to fetch/dispatch all offer in store
  useEffect(() => {
    // console.log("Offer page render");

    dispatch(getOffers({}));
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
                className="flex !rounded-lg px-2 py-2 bg-[#EEEFF3] hover:shadow-lg  "
              >
                <div
                  style={{
                    backgroundImage: `url(${offer?.imageUrl})`,
                  }}
                  className={`w-[40%] rounded-lg bg-cover bg-right overflow-hidden`}
                ></div>
                <div className="flex w-[40%] flex-col  justify-between gap-1 bg-[#EEEFF3] pl-3 ">
                  <div>
                    <div className="flex ">
                      <p className="font-bold text-[12.64px]  text-[#1A202E] ">
                        {offer.offerTitle}
                      </p>
                    </div>
                    <p className="font-extrabold  text-[#EB9527] text-[14.05px]">
                      {offer.discountPercent}% OFF
                    </p>
                    <p className="font-normal whitespace-nowrap pr-2 text-[12px] text-[#737373]">
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
