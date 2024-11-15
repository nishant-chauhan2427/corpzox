export const SelectAllTabs = ({onChangeSelectAllHandler=()=>{},onClickAddWishlistHandler=()=>{}}) => {
  return (
    <div className="flex space-x-5  overflow-x-auto scrollbar-hide whitespace-nowrap pb-4 pt-4 ">
          <label>
            Select All
            <input type='checkbox' onChange={onChangeSelectAllHandler}/>
          </label>
          <button
            onClick={onClickAddWishlistHandler}
          >
            Add Wishlist
          </button>
      </div>
  )
}
