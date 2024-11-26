export const DualHeadingTwo = ({ heading, subHeading, containerClassName }) => {
  return (
    <div className={containerClassName}>
      <h1 className="font-bold text-[28px]">{heading}</h1>
      <p className="text-[#6C6C6C] text-[14px] font-normal pt-1">{subHeading}</p>
    </div>
  );
};
