import Swal from 'sweetalert2';

const showConfirmationAlert = (title, text, icon, confirmButtonText) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'Confirmar',
    timer: 5000,
    timerProgressBar: true,
  });
};

const showErrorAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'OK',
  });
};

export { showConfirmationAlert, showErrorAlert };
