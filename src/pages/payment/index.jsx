import { Outlet, useLocation } from "react-router-dom";
import { Heading } from "../../components/heading";
import { RouteProgressBar } from "../../components/progressBar/routeBased";

const Payments = () => {
  const { pathname } = useLocation();

  function getPageHeading(pathname) {
    switch (true) {
      case pathname == "/payment":
        return "Make a Payment";
      case pathname == "/payment/create":
        return "Select Business";
      case pathname == "/payment/preview":
        return "Preview Payment";
      default:
        return "";
    }
  }

  const servicesProgessSteps = [
    {
      step: 1,
      bottomLabel: "Make a payment",
      status: pathname == "/payment" && "completed",
    },
    {
      step: 2,
      bottomLabel: "Select Business",
      status: pathname == "/payment/create" && "completed",
    },
    {
      step: 3,
      bottomLabel: "Preview Business",
      status: pathname == "/payment/preview" && "completed",
    },
  ];

  return (
    <div>
      <Heading title={"Payment"} backButton={true}>
        {getPageHeading(pathname)}
      </Heading>
      <RouteProgressBar steps={servicesProgessSteps} />
      <Outlet />
    </div>
  );
};

export default Payments;
