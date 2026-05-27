import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "default" | "lg" | "full";
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = "default",
}: ModalProps) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close modal on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizeClasses = {
    default: "max-w-md",
    lg: "max-w-4xl",
    full: "max-w-[95vw] h-[90vh]",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal dialog"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative w-full ${sizeClasses[size]} glass border border-primary/30 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <h3 className="text-xl font-bold text-foreground">
            {title || "Modal Title"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
};
