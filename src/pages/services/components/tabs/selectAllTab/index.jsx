import { Button } from "../../../../../components/buttons";
import { Checkbox } from "../../../../../components/inputs/checkbox";

export const SelectAllTabs = ({
  onChangeSelectAllHandler = () => {},
  onClickAddWishlistHandler = () => {},
  checked,
  hideBtn,
  checkListCount,
}) => {
  // console.log("checked,", checked);

  return (
    <div className="py-4 flex items-center gap-1 overflow-x-auto scrollbar-hide whitespace-nowrap">
      <div className="flex flex-col justify-center items-center">
        <div className="border py-1 px-2 rounded-2xl bg-[#F3F7FF] w-fit flex justify-between items-center gap-2">
          <label htmlFor="checklist" className="text-sm font-medium">
            Select All
          </label>
          <div className="">
            <Checkbox
              id="checklist"
              type="checkbox"
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
