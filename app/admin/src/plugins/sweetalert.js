import Swal from 'sweetalert2';

const SweetAlertPlugin = {
  install(app) {
    // Inject Swal into the app
    app.config.globalProperties.$swal = Swal;

    app.config.globalProperties.$swalError = (title, text) => {
      Swal.fire({
        icon: 'error',
        title: title || 'Error',
        text: text || 'An unexpected error occurred.',
      });
    };
  },
  
};

export default SweetAlertPlugin;