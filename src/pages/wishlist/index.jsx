import React from "react";
import { Heading } from "../../components/heading";
import { ServicesCard } from "../services/listing/components/servicesCard";
import { servicesListing } from "../../database";

const Wishlist = () => {
  return (
    <>
      <div>
        <Heading title={"Wishlist"} backButton={true}>
          {" "}
          Wishlist{" "}
        </Heading>
        <ServicesCard  />
      </div>
    </>
  );
};

export default Wishlist;
