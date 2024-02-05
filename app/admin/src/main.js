import { createApp } from 'vue';
import App from './App.vue';
import router from '@router';
import store from '@store';
/* import 'bootstrap'; */
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import SweetAlertPlugin from '@plugins/sweetalert'



const app = createApp(App);
  
app.use(bootstrap);
app.use(router);
app.use(store);
app.use(SweetAlertPlugin);


app.mount('#app');
