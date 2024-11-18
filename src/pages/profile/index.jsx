import React from "react";
import ProfileCard from "../profile/components/profileCard";
import { Business } from "../dashboard/components/business";
import { ServicesProgress } from "../dashboard/components/services/progress";
import { servicesProgress, businessListing } from "../../database";
const Profile = () => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <ProfileCard />
        <Business data={businessListing} />
        <ServicesProgress data={servicesProgress} />
      </div>
    </>
  );
};

export default Profile;
