import React, {FC} from "react";
import ReactModal from "react-modal";

interface IProps {
  isOpen: boolean;
  closeModal?: () => void;
  children: React.ReactNode;
}

ReactModal.setAppElement("body");

const Modal: FC<IProps> = ({isOpen, children, closeModal}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className="modal-body"
      overlayClassName="modal-overlay"
      htmlOpenClassName="modal-page"
      onRequestClose={closeModal}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
