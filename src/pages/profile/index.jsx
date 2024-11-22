import { useEffect } from "react";
import ProfileCard from "../profile/components/profileCard";
import { Business } from "../dashboard/components/business";
import { ServicesProgress } from "../dashboard/components/services/progress";
import { servicesProgress, businessListing } from "../../database";
import { getUser } from "../../redux/actions/dashboard-action";
import { useDispatch, useSelector } from 'react-redux'
const Profile = () => {

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    Object.keys(user).length === 0 && dispatch(getUser());
  }, [dispatch])
  return (
    <>
      <div className="flex flex-col gap-1">
        <ProfileCard userData={user} loading={loading} />
        <Business data={businessListing} />
        <ServicesProgress data={servicesProgress} />
      </div>
    </>
  );
};

export default Profile;
