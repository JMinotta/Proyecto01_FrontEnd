import { ToastContainer as ReactToastifyContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MdCheckCircle, MdCancel, MdInfoOutline } from 'react-icons/md'

const customIcons = {
  success: <MdCheckCircle style={{ fontSize: '1.5rem' }} />,
  error: <MdCancel style={{ fontSize: '1.5rem' }} />,
  info: <MdInfoOutline style={{ fontSize: '1.5rem' }} />,
}

export default function ToastContainer() {
  return (
    <ReactToastifyContainer
      position="bottom-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      icon={({ type }) => customIcons[type] || customIcons.info}
      style={{ zIndex: 9999 }}
    />
  )
}