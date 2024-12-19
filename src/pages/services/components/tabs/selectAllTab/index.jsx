import { Button } from "../../../../../components/buttons";

export const SelectAllTabs = ({
  onChangeSelectAllHandler = () => {},
  onClickAddWishlistHandler = () => {},
  checked,
  hideBtn,
  checkListCount,
}) => {
  // console.log("checked,", checked);

  return (
    <div className="flex items-start gap-1 overflow-x-auto scrollbar-hide whitespace-nowrap">
      <div className="flex flex-col justify-center items-center">
        <div className="border py-1 px-2 rounded-2xl bg-[#F3F7FF] w-fit flex justify-between items-center">
          <label htmlFor="checklist">Select All</label>
          <div className="">
            <input
              id="checklist"
              type="checkbox"
              className=" mx-1 w-4 h-4  bg-green-400"
              checked={checked}
              onChange={onChangeSelectAllHandler}
            />
          </div>
        </div>
      </div>
      <div>
        {!hideBtn && (
          <Button primary={true} onClick={onClickAddWishlistHandler}>
            Add Wishlist
          </Button>
        )}
      </div>
      <div>
        {checkListCount > 0 && (
          <span>
            <span className="font-bold">{checkListCount}</span> Selected
          </span>
        )}
      </div>
    </div>
  );
};
