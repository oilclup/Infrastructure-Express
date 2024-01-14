<template>
  <div class="container">
    <header class="jumbotron">
      <h3>MyHome</h3>
   
    </header>
  </div>
</template>

<script>
import axios from '../../axios';
export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    // axios.get('/api/some-endpoint')
    //   .then((response) => {
    //     console.log(response)
    //   })
      
   /*  UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    ); */
  },
};
</script>
