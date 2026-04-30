import { forwardRef, useImperativeHandle, useState } from 'react'

const ConfirmModal = forwardRef(function ConfirmModal(
  {
    title = "Confirmar acción",
    message = "¿Estás seguro?",
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    onConfirm = () => {}
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false)

  // Permite abrir/cerrar desde el padre
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }))

  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-xl p-6 w-[320px] text-center shadow-xl">
        
        <h2 className="text-lg font-bold mb-3">
          {title}
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-center gap-3">
          
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
          >
            {cancelLabel}
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-semibold"
          >
            {confirmLabel}
          </button>

        </div>

      </div>
    </div>
  )
})

export default ConfirmModal