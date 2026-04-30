import { useToast } from '../context/ToastContext'

const icons = {
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
}

const styles = {
  success: 'bg-red-500 border-red-600 text-white',
  error: 'bg-red-600 border-red-700 text-white',
  info: 'bg-red-400 border-red-500 text-white',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 border rounded-xl px-4 py-3 shadow-lg transition-all duration-300 ${styles[toast.type] || styles.info}`}
        >
          <span className="mt-0.5">{icons[toast.type] || icons.info}</span>

          <p className="text-sm font-semibold flex-1">
            {toast.message}
          </p>

          <button
            onClick={() => removeToast(toast.id)}
            className="opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}