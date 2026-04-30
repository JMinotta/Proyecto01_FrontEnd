import { toast } from 'react-toastify'

export function useToast() {
  return {
    addToast: (message, type = 'info') => {
      toast[type](message, {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    },
  }
}
