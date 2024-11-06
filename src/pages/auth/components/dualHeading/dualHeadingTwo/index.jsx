export const DualHeadingTwo = ({ heading, subHeading, containerClassName }) => {
  return (
    <div className={containerClassName}>
      <h1 className="font-bold text-3xl">{heading}</h1>
      <p className="text-[#969696] text-base font-normal pt-3">{subHeading}</p>
    </div>
  );
};
