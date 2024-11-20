import { useNavigate } from "react-router-dom";

export const ModalWrapper = ({ title, children }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-20 backdrop-blur-sm w-full h-screen flex justify-center items-center z-[1001]">
      <div className="w-[90%] max-w-4xl relative bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl">
        <h3 className="mt-4 font-bold text-2xl text-center">{title}</h3>
        <button onClick={() => navigate(-1)} className="absolute top-4 right-4">
          ❌
        </button>
        {children}
      </div>
    </div>
  );
};
