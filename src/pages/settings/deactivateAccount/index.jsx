import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons/button";
import { TextArea } from "../../../components/inputs/textarea";

const DeactivateAccount = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data, "data before transformation");
  };
  return (
    <div className="mt-4 w-full">
      <p className="font-bold text-xl text-black">Deactivate Account</p>
      <p className="text-sm text-[#4E4E4E]">Deactivate your Account</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mt-4 w-full md:w-1/2 flex flex-col gap-4">
          <Controller
            name={`password`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Password`}
                placeholder={`Enter your password`}
                errorContent={errors.password?.message}
                required={true}
              />
            )}
          />

          {/*  */}
          <p className="text-2xl">
            Select your reason to deactivate your account
          </p>
          <CheckMarkLabel label={"I don't find CorpZo useful"} />
          <CheckMarkLabel label={"I have a privacy concern."} />
          <CheckMarkLabel label={"I don't understand how to use CorpZo"} />
          <CheckMarkLabel label={"Other"} />
          <TextArea className="min-h-20" placeholder="We are sorry to see you go! Before you go please lets us know  what happened, so we can avoid losing future users" />
          <div className="flex justify-start items-center gap-3">
            <Button
              type={"submit"}
              className={"px-4 py-1.5 rounded-lg"}
              primary={true}
              // isLoading={}
              // disabled={

              // }
            >
              Deactivate
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeactivateAccount;

const CheckMarkLabel = ({ label }) => {
  return (
    <div className="flex justify-between">
      <label htmlFor="checkmark">{label}</label>
      <input id="chekmark" type="radio" />
    </div>
  );
};
