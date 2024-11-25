import { Button } from "../../../../../components/buttons";

export const Advisor = ({ 
  label = "Not sure about the packages?", 
  description = "Talk to our advisors and kickstart your business today.", 
  buttonText = "Talk to our Advisors" 
}) => {
  return (
    <div className="py-4 flex flex-col justify-center items-center text-center gap-3">
      <div>
        <h4 className="font-bold text-lg">{label}</h4>
        <p className="text-[11px]">{description}</p>
      </div>
      <Button className="px-6 py-1.5 !font-medium !rounded" primary={true}>
        {buttonText}
      </Button>
    </div>
  );
};
