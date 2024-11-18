import { GoArrowLeft } from "react-icons/go";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const tabs = [
    {
      label: "Change Password",
      icon: "/icons/settings/lock.svg",
      url: "/settings",
    },
    {
      label: "Deactivate Account",
      icon: "/icons/settings/lock.svg",
      url: "/settings/deactivate-account",
    },
    {
      label: "Subscription History",
      icon: "/icons/settings/lock.svg",
      url: "/settings/subscription-history",
    },
  ];
  return (
    <div>
      <div className="pt-2 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold text-xl text-[#0A1C40]">
          <button>
            <GoArrowLeft />
          </button>
          <p>Settings</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} />
      <Outlet />
    </div>
  );
};

export default Settings;

const Tabs = ({ tabs }) => {
  const { pathname } = useLocation();
  return (
    <div className="py-2 flex flex-wrap items-center gap-4">
      {tabs.map((data, index) => (
        <Link
          to={data.url}
          className={`flex items-center gap-1 pb-1 ${
            pathname == data.url && "border-b-2 border-[#F1359C] rounded"
          }`}
          key={index}
        >
          <img src={data.icon} alt="icon" />
          <p className={`${pathname == data.url && "font-bold"}`}>
            {data.label}
          </p>
        </Link>
      ))}
    </div>
  );
};
