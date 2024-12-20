import { useEffect } from "react";
import ProfileCard from "../profile/components/profileCard";
import { Business } from "../dashboard/components/business";
import { ServicesProgress } from "../dashboard/components/services/progress";
import { servicesProgress, businessListing } from "../../database";
import { getUser } from "../../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import BusinessListing from "../business/listing";
//import{BusinessDetail} from "../business/listing/index";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, business } = useSelector((state) => state.user);

  

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
      <div className="flex flex-col gap-1">
        <ProfileCard userData={user} loading={loading} />
        <Business data={business?.list} total={business?.totalPage} />
        <ServicesProgress data={servicesProgress} />
      </div>
    </>
  );
};

export default Profile;
