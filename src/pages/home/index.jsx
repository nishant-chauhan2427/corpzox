import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react";
const HomePage = () => {
  let navigate =useNavigate();
  useEffect(()=>{
    navigate('/sign-in')
  },[])
  return (
    <>
      {/* <div class="w-full h-screen flex flex-col items-center justify-center p-5">
        <h1 className="text-black text-[30px] mb-4">Welcome to Corpzo</h1>
      </div> */}
    </>
  );
};

export default HomePage;
