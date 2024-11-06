// "./index.css";
export const Checkbox = ({ containerClassName, ...props }) => {
  return (
    <>
      <label className={`${containerClassName} w-4 container`}>
        <input type="checkbox"  {...props} />
        <div className="checkmark checked:bg-[#F1359C]"></div>
      </label>
    </>
  );
};
