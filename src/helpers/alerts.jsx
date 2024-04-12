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

const showAddCart = () => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto añadido al carrito",
    showConfirmButton: false,
    timer: 1500
  });
}

export { showConfirmationAlert, showErrorAlert, showAddCart };
