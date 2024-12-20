import { useEffect } from "react";
import ProfileCard from "../profile/components/profileCard";
import { Business } from "../dashboard/components/business";
import { ServicesProgress } from "../dashboard/components/services/progress";
import { servicesProgress, businessListing } from "../../database";
import { getUser, getUserBusiness, updateServiveProgress } from "../../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import BusinessListing from "../business/listing";
//import{BusinessDetail} from "../business/listing/index";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, business } = useSelector((state) => state.user);
  const { dataUpdate} = useSelector((state) => state.user);
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  console.log(business?.list?.length,"Profile Business");

  

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // useEffect(() => {
  //   business?.list?.length==0
  //   dispatch(getUser());
  // }, [dispatch]);
  // useEffect(() => {

  //     dispatch(getUserBusiness());
    
  useEffect(() => {
    if (business?.list?.length === 0) {
      dispatch(getUserBusiness({ query: searchValue ? searchValue : "" }));
    }
    // dispatch(getUserServices({ query: searchValue ? searchValue : "" }));
  }, [searchValue, business?.list?.length, dispatch]);
  
  useEffect(() => {
    if (dataUpdate?.data?.length == 0 || dataUpdate?.data?.length == undefined) {
      dispatch(updateServiveProgress({ page: 1 }));
    }
  }, []);


  return (
    <>
      <div className="flex flex-col gap-1">
        <ProfileCard userData={user} loading={loading} />
        <Business data={business?.list} total={business?.totalPage}  />
        <ServicesProgress data={servicesProgress} />
      </div>
    </>
  );
};

export default Profile;
