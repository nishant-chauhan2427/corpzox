export const DualHeadingTwo = ({ heading, subHeading, containerClassName }) => {
  return (
    <div className={containerClassName}>
      <h1 className="font-bold text-[#232323] text-[28px]">{heading}</h1>
      <p className="text-[#969696] text-[15px] font-normal pt-1">
        {subHeading}
      </p>
    </div>
  );
};
