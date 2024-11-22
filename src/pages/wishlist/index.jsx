import React from "react";
import { Heading } from "../../components/heading";
import { ServicesCard } from "../services/listing/components/servicesCard";
import { servicesListing } from "../../database";
import { Button } from "../../components/buttons";

const Wishlist = () => {
  return (
    <>
      <div>
        <Heading title={"Wishlist"} backButton={true}>
          {" "}
          Wishlist{" "}
        </Heading>
        <ServicesCard data={servicesListing} />
        <div className="flex items-center justify-center pt-20 ">
          <Button primary={true}>Load More</Button>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
