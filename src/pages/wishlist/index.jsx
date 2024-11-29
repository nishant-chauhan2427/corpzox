import React, { useEffect } from "react";
import { Heading } from "../../components/heading";
import { ServicesCard } from "../services/listing/components/servicesCard";
import { servicesListing } from "../../database";
import { Button } from "../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import { getWishList } from "../../redux/actions/wishlist-actions";
import { ServiceCardShimmer } from "../../components/loader/ServiceCardShimmer copy";

const Wishlist = () => {
  const dispatch = useDispatch()
  const { loading, wishList } = useSelector((state) => state.wishlist)
  useEffect(() => {
    wishList?.length== 0 &&   dispatch(getWishList())
  }, [dispatch])
  return (
    <>
      <div>
        <Heading title={"Wish"} backButton={true}>
          {" "}
          Wishlist{" "}
        </Heading>
        {
          loading ?
            <ServiceCardShimmer /> : <ServicesCard data={wishList} />
        }


        <div className="flex items-center justify-center pt-20 ">
          <Button primary={true}>Load More</Button>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
