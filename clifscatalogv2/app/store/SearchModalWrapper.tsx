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
      className={ModalStyles.container}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
    >
      <button onClick={onClose} className={ModalStyles.close}>Close</button>
      <h3>{title}</h3>
      <div className={ModalStyles.modalSearchResults}>
        {children}
      </div>
    </dialog>
  );
};

export default PreferencesModal;