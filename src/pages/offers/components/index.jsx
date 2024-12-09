import React, { useEffect, useState } from "react";
import { Heading } from "../../../components/heading";
import { Offerss } from "../../../database";
import { Button } from "../../../components/buttons/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkButton } from "../../../components/link";
import { useDispatch, useSelector } from "react-redux";
import { OfferShimmer } from "../../../components/loader/OfferShimmer";
import { NoData } from "../../../components/errors/noData";
import { getOffers, loadMoreOffers } from "../../../redux/actions/offer-action";
import toast from "react-hot-toast";


function OffersDetails() {
  const dispatch = useDispatch();

  const { offers,page, totalCount, isLoading,loadingMore, error } = useSelector((state) => state.offers);
  
  const urlParams = new URLSearchParams( useLocation().search);
  const navigate = useNavigate();
  const url = new URL(window.location);
  // let page =urlParams.get("page") ||1 ;

  

  const [expandedIndex, setExpandedIndex] = useState(null); // To track which offer is expanded

  // console.log("expandedIndex", expandedIndex);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expanded state
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('en-US', options);
  }

  // const handleLoadMore = () =>{
  //   if(totalCount % offers?.length > 0){
  //     dispatch(loadMoreOffers({page:Number(page)+1}));
  //     // url.searchParams.set('page', (Number(page)+1));
  //     // window.history.pushState({}, '', url);
  //   }else{
  //     toast.error("No more data found")
  //   }
   
  // }

  // useEffect(()=>{
  //   page = urlParams.get("page") ||1 ;
  //   url.searchParams.set('page', 1);
  //   // window.history.pushState({}, '', url);
  // },[])


  if (isLoading) return <OfferShimmer className={"my-4"} count={7} />

  return (
    <>
      <Heading title={"Offers"} backButton={true}>
        Offers
      </Heading>
      <div>
        {offers ? offers?.map((offer, index) => (
          <div
            key={index}
            className="flex sm:flex-row flex-col gap-3 px-4 py-4 mb-6 bg-[#F3F7FF] border border-[#DFEAF2] rounded-lg    "
          >
            <div
              style={{ backgroundImage: `url(https://img.freepik.com/free-vector/sale-banner-badge-your-business_1017-17476.jpg?t=st=1733120748~exp=1733124348~hmac=3266181d7b16db95a0892692767f76a818da9797d6972f8a04a1444b953ec2b1&w=826)` }}
              className={`sm:w-[30%] rounded-lg bg-cover bg-no-repeat bg-center overflow-hidden`}
            ></div>
            <div className="flex sm:w-[70%] flex-col gap-2">
              <p className="font-bold text-[20px]  text-[#0A1C40]">
                {offer.offerTitle}
              </p>
              <div className="flex items-center gap-4 ">
                <p className="font-bold rounded-full text-[14px] text-white bg-[#4CAF50] px-2 py-1 ">
                  {`${offer.discountPercent}% OFF`}
                </p>
                <p className="font-normal  text-[12px] text-[#737373] ">
                  {`Valid till : ${formatDate(offer.validity)}`}
                </p>
              </div>
              <p className="font-medium text-[12px] text-[#0A1C40]">
                {expandedIndex == index ? offer.offerDetail : `${offer.offerDetail?.substring(0, 200)} ${offer.offerDetail?.length > 200 ? "..." : ""}`}
                <span
                  onClick={() => toggleReadMore(index)}
                  className="text-blue-500 cursor-pointer ml-2"
                >

                  {offer.offerDetail?.length > 200 && (expandedIndex == index ? "Read Less" : "Read More")}
                </span>
              </p>
              <div className="flex justify-end pt-5">
                <LinkButton to={"/services"} primary={true}> Avail Now</LinkButton>
              </div>
            </div>
          </div>
        )) : <NoData />
        }

        {totalCount % offers?.length > 0 ?
        <div className="w-full flex justify-center items-center mb-4">
          <Button onClick={()=> dispatch( loadMoreOffers({page: (page+1)}) )} disabled={loadingMore} className="flex items-center sm:gap-2 p-2 hover:text-lg hover:shadow-lg" primary={true}>
            {loadingMore?"loading...":"Load more.."}
          </Button>
        </div>:""
          }
      </div>
    </>
  );
}

export default OffersDetails;
