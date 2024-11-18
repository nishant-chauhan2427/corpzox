import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";

const ChangePassword = () => {
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
    <>
      <div className="mt-4 w-full">
        <p className="font-bold text-xl text-black">Change Password</p>
        <p className="text-sm text-[#4E4E4E]">
          Change your password to keep account secure.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mt-4 w-full md:w-1/3 flex flex-col gap-4">
            <Controller
              name={`password`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Old Password`}
                  placeholder={`Enter your old password`}
                  errorContent={errors.password?.message}
                  required={true}
                />
              )}
            />
            <Controller
              name={`password`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`New Password`}
                  placeholder={`Enter your new password`}
                  errorContent={errors.password?.message}
                  required={true}
                />
              )}
            />
            <Controller
              name={`password`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Re enter new Password`}
                  placeholder={`Re enter your new password`}
                  errorContent={errors.password?.message}
                  required={true}
                />
              )}
            />
            <div className="flex justify-start items-center gap-3">
            
              <Button
                type={"submit"}
                className={"px-4 py-1.5 rounded-lg"}
                primary={true}
                // isLoading={}
                // disabled={
                  
                // }
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;


