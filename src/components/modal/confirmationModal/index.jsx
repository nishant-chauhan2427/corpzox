import { RxCross2 } from "react-icons/rx";
import { Button } from "../../buttons";

export const ConfirmationModal = ({
  title,
  isOpen,
  onClose,
  loading,
  children,
  onConfirm,
  description,
  modalClassName,
  containerClassName,
}) => {
  if (!isOpen) return null;
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const handleModalConfirm = async () => {};

  //   const handleModalClose = () => {
  //     setIsModalOpen(false);
  //   };
  return (
    <div
      className={`${
        containerClassName && containerClassName
      } fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[1005]`}
    >
      <div
        className={`${
          modalClassName && modalClassName
        } max-w-md relative bg-white p-4 rounded-2xl shadow-lg`}
      >
        {children ? (
          children
        ) : (
          <>
            <h4>{title}</h4>
            <p className="mb-4">{description}</p>
            <div className="flex justify-end gap-4">
              <Button
                className={"w-fit px-8 py-2 rounded"}
                onClick={onConfirm}
                mainPrimary={true}
                isLoading={loading}
              >
                Yes
              </Button>
              <Button
                outLine={true}
                onClick={onClose}
                className={"w-fit px-8 py-2 rounded"}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
        <button className="absolute top-3 right-3" onClick={onClose}>
          <RxCross2 />
        </button>
      </div>
    </div>
  );
};
