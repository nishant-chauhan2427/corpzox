import React, { useEffect } from "react";
import { Heading } from "../../components/heading";
import { ServicesCard } from "../services/listing/components/servicesCard";
import { servicesListing } from "../../database";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import { getWishList, removeServiceWishlistData1 } from "../../redux/actions/wishlist-actions";
import { ServiceCardShimmer } from "../../components/loader/ServiceCardShimmer copy";
import { removeServiceWishlist} from "../../redux/actions/servicesListing-action";
import { NoData } from "../../components/errors/noData";
import { ImSpinner2 } from "react-icons/im";

//removeServiceWishlist
const Wishlist = () => {
  const dispatch = useDispatch();
  const { loading, wishList, totalCount,heartloading } = useSelector(
    (state) => state.wishlist
  );
  const { isAdding} = useSelector(
    (state) => state.user
  );
  console.log(isAdding,"totalCount12334");
  let onClickWishList = (service) => {
    console.log(service,"service123");
    //setIsSubmit(true);
   // if (service?.wishlistCount) {
      dispatch(removeServiceWishlistData1({ serviceId: service?.serviceId }));
   // } else {
     // dispatch(updateServiceWishlist({ serviceId: service?._id }));
     //{loading ? <ImSpinner2 className="animate-spin text-gray hover:text-white !text-xl" /> : <h2 className="font-bold text-4xl">{number}</h2>}


    }//}
 // console.log((wishList, "wishList"));
 useEffect(() => {
  dispatch(getWishList());
}, [dispatch]);
  return (
    <>
      <div>
        <Heading title={"Wish"} backButton={true}>
          {" "}
          Wishlist{" "}
        </Heading>
        {wishList && wishList.length === 0 ? (<NoData/>) : (<ServicesCard data={wishList} onClick={(service) => onClickWishList(service)} />)}
        {/* {wishList && wishList.length > 5 && (
          <div className="mt-10 flex justify-center">
            {wishList.length == totalCount ? (
              <></>
            ) : (
              <Button primary={true}>Load More </Button>
            )}
          </div>
        )} */}
        {/* <div className="flex items-center justify-center pt-20 ">
          <Button primary={true}>Load More</Button>
        </div> */}
        {/* checking service */}
      </div>
    </>
  );
};

export default Wishlist;
