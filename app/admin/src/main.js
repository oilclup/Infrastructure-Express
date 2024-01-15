import { createApp } from 'vue';
import App from './App.vue';
import router from '@router';
import store from '@store';
/* import 'bootstrap'; */
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'


import { provideAxios } from './plugins/axios';

const app = createApp(App);
  
// Use other plugins
app.use(bootstrap);
app.use(router);
app.use(store);

provideAxios(); // Move this before app.mount

app.mount('#app');
