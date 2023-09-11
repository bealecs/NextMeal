import { MouseEvent, useEffect, useRef } from "react";
import ModalStyles from '../modular_css/SearchModal.module.css';

const isClickInsideRectangle = (
  e: MouseEvent,
  element: HTMLElement
): boolean => {
  const r = element.getBoundingClientRect();
  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

type Props = {
  title: string;
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const PreferencesModal = ({
  title,
  isOpened,
  onClose,
  children,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  
  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (ref.current && !isClickInsideRectangle(e, ref.current)) {
          onClose();
        }
        e.stopPropagation(); // Prevent the click event from propagating
      }}
    >
      <button onClick={onClose} className={ModalStyles.close}>❌</button>
      <h3 className={ModalStyles.title}>{title}</h3>
      <div className={ModalStyles.modalSearchResults}>
        {children}
      </div>
    </dialog>
  );
};

export default PreferencesModal;