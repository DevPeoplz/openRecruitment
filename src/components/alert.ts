import Swal from 'sweetalert2'

type Props = {
  type: 'success' | 'error' | 'warning' | 'info' | 'question'
  message: string
}

/**
 * Displays an alert using SweetAlert2.
 *
 * @param {Object} props - The properties of the alert.
 * @param {string} props.type - The type of the alert ('success', 'error', 'warning', 'info', or 'question').
 * @param {string} props.message - The message of the alert.
 * @returns {Promise} - A promise that resolves when the alert is closed.
 */
const Alert = ({ type, message }: Props): Promise<unknown> => {
  return Swal.fire({
    position: 'top-end',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2500,
    toast: true,
  })
}

export default Alert
