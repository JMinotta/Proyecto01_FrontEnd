import { forwardRef, useImperativeHandle, useRef } from "react";

const ConfirmModal = forwardRef(function ConfirmModal(
  {
    title = "Confirmar acción",
    message = "¿Estás seguro?",
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    onConfirm = () => {},
  },
  ref,
) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current.showModal(),
    close: () => dialogRef.current.close(),
  }));

  const handleConfirm = () => {
    onConfirm();
    dialogRef.current.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="rounded-xl p-6 w-[320px] text-center shadow-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed"
    >
      <h2 className="text-lg font-bold mb-3">{title}</h2>

      <p className="text-sm text-gray-600 mb-6">{message}</p>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => dialogRef.current.close()}
          className="px-4 py-2 rounded bg-gray-300"
        >
          {cancelLabel}
        </button>

        <button
          onClick={handleConfirm}
          className="px-4 py-2 rounded bg-red-500 text-white"
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
});

export default ConfirmModal;
