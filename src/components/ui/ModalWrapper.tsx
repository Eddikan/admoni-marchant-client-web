import { ReactNode, useEffect } from "react";
interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}
import Image from "next/image";
export default function ModalWrapper({
  isOpen,
  onClose,
  title,
  children,
}: ModalWrapperProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[559px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p>{title}</p>
          <button
            className=" text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <Image
              alt="close"
              src="/icons/close.svg"
              className=""
              width={24}
              height={24}
            />
          </button>
        </div>
        <hr  className="mt-3 mb-6"/>

        {children}
      </div>
    </div>
  );
}
