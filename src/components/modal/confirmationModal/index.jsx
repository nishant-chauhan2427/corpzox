import { RxCross2 } from "react-icons/rx";
import { Button } from "../../buttons";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, translateY: 500 }}
        animate={{ scale: 1, translateY: 0 }}
        exit={{ scale: 0, translateY: 500 }}
        className={`${
          containerClassName && containerClassName
        } fixed inset-0 bg-opacity-50 flex items-center justify-center z-[1005]`}
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
      </motion.div>
    </AnimatePresence>
  );
};
