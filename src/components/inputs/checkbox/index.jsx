// "./index.css";
export const Checkbox = ({ containerClassName,checked, ...props }) => {
  return (
    <>
      <label className={`${containerClassName} w-4 container`}>
        <input type="checkbox"  checked={checked} {...props} />
        <div className="checkmark checked:bg-[#F1359C]"></div>
      </label>
    </>
  );
};
