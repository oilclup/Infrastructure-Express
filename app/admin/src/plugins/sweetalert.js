import Swal from 'sweetalert2';

const SweetAlertPlugin = {
  install(app) {
    // Inject Swal into the app
    app.config.globalProperties.$swal = Swal;
    app.config.globalProperties.$swalSuccess = (title, text,settime) => {
      Swal.fire({
        icon: 'success',
        title: title || 'Success',
        text: text || 'Your work is successful.',
        showConfirmButton: false,
        timer: settime || 3000

      });
    };
    app.config.globalProperties.$swalError = (title, text) => {
      Swal.fire({
        icon: 'error',
        title: title || 'Error !',
        text: text || 'something went wrong please try again later',
      });
    };
  },
  
};

export default SweetAlertPlugin;